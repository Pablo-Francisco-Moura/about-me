import { useEffect, useRef, useState, type PointerEvent } from "react";
import { usePreferencesStore } from "../../store/storePreferences";
import { getResponsiveTerminalSize } from "../../utils/terminal";
import {
  MINIMIZE_ANIMATION,
  MINIMIZED_POSITION,
  TERMINAL_TIMINGS,
} from "../../constants/terminal";
import type { TypeMinimizedTransitionOrigin } from "../../types/terminal";

type Direction = "se" | "sw" | "ne" | "nw";
type Position = { x: number; y: number };
export function useTerminalWindow(isOpen: boolean) {
  const { isMobile } = usePreferencesStore();
  const [size, setSize] = useState(() => getResponsiveTerminalSize(isMobile));
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDetached, setIsDetached] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [minimizeAnimation, setMinimizeAnimation] =
    useState(MINIMIZE_ANIMATION);
  const [minimizedPosition, setMinimizedPosition] =
    useState(MINIMIZED_POSITION);
  const [minimizedTransitionOrigin, setMinimizedTransitionOrigin] =
    useState<TypeMinimizedTransitionOrigin>(null);
  const dragRef = useRef<{ offsetX: number; offsetY: number } | null>(null);
  const minimizedDragRef = useRef<{ offsetX: number; offsetY: number } | null>(
    null,
  );
  const minimizedMovedRef = useRef(false);
  const resizeRef = useRef<{
    direction: Direction;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startLeft: number;
    startTop: number;
  } | null>(null);
  useEffect(() => {
    if (!isOpen) {
      setIsDetached(false);
      setIsMinimized(false);
      return;
    }
    const nextSize = getResponsiveTerminalSize(isMobile);
    setSize(nextSize);
    setPosition({
      x: Math.max(24, Math.round((window.innerWidth - nextSize.width) / 2)),
      y: Math.max(24, Math.round((window.innerHeight - nextSize.height) / 2)),
    });
  }, [isOpen, isMobile]);
  useEffect(() => {
    if (!isOpen) return;
    const move = (event: globalThis.PointerEvent) => {
      if (minimizedDragRef.current) {
        minimizedMovedRef.current = true;
        setMinimizedPosition(
          clamp(
            event.clientX - minimizedDragRef.current.offsetX,
            event.clientY - minimizedDragRef.current.offsetY,
            56,
            56,
          ),
        );
      }
      if (dragRef.current)
        setPosition(
          clamp(
            event.clientX - dragRef.current.offsetX,
            event.clientY - dragRef.current.offsetY,
            size.width,
            size.height,
          ),
        );
      const resize = resizeRef.current;
      if (!resize) return;
      const minWidth = isMobile ? 220 : 320;
      const minHeight = isMobile ? 180 : 220;
      const maxWidth = isMobile ? window.innerWidth - 48 : 900;
      const maxHeight = isMobile ? window.innerHeight - 48 : 700;
      const width = Math.min(
        maxWidth,
        Math.max(minWidth, resize.startWidth + event.clientX - resize.startX),
      );
      const height = Math.min(
        maxHeight,
        Math.max(minHeight, resize.startHeight + event.clientY - resize.startY),
      );
      if (resize.direction.includes("e") || resize.direction.includes("w"))
        setSize((current) => ({ ...current, width }));
      if (resize.direction.includes("s") || resize.direction.includes("n"))
        setSize((current) => ({ ...current, height }));
      if (resize.direction.includes("w"))
        setPosition((current) => ({
          ...current,
          x: resize.startLeft + resize.startWidth - width,
        }));
      if (resize.direction.includes("n"))
        setPosition((current) => ({
          ...current,
          y: resize.startTop + resize.startHeight - height,
        }));
    };
    const end = () => {
      dragRef.current = null;
      minimizedDragRef.current = null;
      resizeRef.current = null;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [isOpen, isMobile, size.width, size.height]);
  const handleDragStart = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDetached(true);
    dragRef.current = {
      offsetX: event.clientX - position.x,
      offsetY: event.clientY - position.y,
    };
  };
  const handleResizeStart = (
    event: PointerEvent<HTMLDivElement>,
    direction: Direction,
  ) => {
    if (isMobile) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDetached(true);
    resizeRef.current = {
      direction,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startLeft: position.x,
      startTop: position.y,
    };
  };
  const handleToggleDetached = () => {
    setIsDetached((current) => !current);
    setIsMinimized(false);
    setIsMinimizing(false);
    dragRef.current = null;
    resizeRef.current = null;
  };
  const handleMinimize = () => {
    const x = position.x + size.width / 2;
    const y = position.y + size.height / 2;
    setMinimizedTransitionOrigin({ x, y });
    setMinimizedPosition({ x, y });
    setMinimizeAnimation({
      x,
      y,
      width: size.width,
      height: size.height,
      borderRadius: 24,
      opacity: 1,
    });
    setIsMinimized(true);
    setIsMinimizing(true);
    dragRef.current = null;
    resizeRef.current = null;
    window.setTimeout(() => {
      setMinimizeAnimation({
        x: 24,
        y: window.innerHeight / 2,
        width: 56,
        height: 56,
        borderRadius: 999,
        opacity: 1,
      });
      setMinimizedPosition({ x: 24, y: window.innerHeight / 2 });
      setMinimizedTransitionOrigin(null);
    }, 16);
    window.setTimeout(
      () => setIsMinimizing(false),
      TERMINAL_TIMINGS.minimizeAnimationDuration,
    );
  };
  const handleRestore = () => {
    if (minimizedMovedRef.current) {
      minimizedMovedRef.current = false;
      return;
    }
    setIsMinimized(false);
    setIsMinimizing(false);
    setMinimizeAnimation({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      borderRadius: 12,
      opacity: 1,
    });
    minimizedDragRef.current = null;
  };
  const handleMinimizedDragStart = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    minimizedMovedRef.current = false;
    minimizedDragRef.current = {
      offsetX: event.clientX - minimizedPosition.x,
      offsetY: event.clientY - minimizedPosition.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handleMinimizedDragMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!minimizedDragRef.current) return;
    minimizedMovedRef.current = true;
    setMinimizedPosition(
      clamp(
        event.clientX - minimizedDragRef.current.offsetX,
        event.clientY - minimizedDragRef.current.offsetY,
        56,
        56,
      ),
    );
  };
  const handleMinimizedDragEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!minimizedMovedRef.current) handleRestore();
    minimizedMovedRef.current = false;
    minimizedDragRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return {
    isMobile,
    size,
    position,
    isDetached,
    isMinimized,
    isMinimizing,
    minimizeAnimation,
    minimizedPosition,
    minimizedTransitionOrigin,
    handleDragStart,
    handleResizeStart,
    handleToggleDetached,
    handleMinimize,
    handleRestore,
    handleMinimizedDragStart,
    handleMinimizedDragMove,
    handleMinimizedDragEnd,
  };
}
function clamp(x: number, y: number, width: number, height: number): Position {
  const margin = 24;
  return {
    x: Math.min(
      Math.max(0, window.innerWidth - width - margin),
      Math.max(margin, x),
    ),
    y: Math.min(
      Math.max(0, window.innerHeight - height - margin),
      Math.max(margin, y),
    ),
  };
}
