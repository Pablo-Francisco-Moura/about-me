import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  side: "left" | "right";
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export function Banner({ style, className, side, onClick }: Props) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      className={className}
      aria-label={side === "left" ? "Previous banner" : "Next banner"}
      style={{
        ...style,
        width: "42px",
        color: "#fff",
        height: "42px",
        margin: 0,
        border: "1px solid rgba(255, 255, 255, 0.45)",
        padding: 0,
        display: "flex",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.35)",
        borderRadius: "50%",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClick}
    >
      <Icon size={26} strokeWidth={2} />
    </button>
  );
}
