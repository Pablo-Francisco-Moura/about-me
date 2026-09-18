import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import profileImage from "../../assets/profile.jpg";

export function Profile() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imagePosition, setImagePosition] = useState({
    top: 0,
    left: 0,
    width: 150,
    height: 150,
  });

  const showPreview = () => {
    const bounds = imageRef.current?.getBoundingClientRect();
    if (!bounds) return;

    setImagePosition({
      top: bounds.top,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height,
    });
    setIsHovered(true);
  };

  return (
    <section
      style={{
        display: "flex",
        minWidth: "150px",
        maxWidth: "150px",
        position: "relative",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        ref={imageRef}
        src={profileImage}
        alt="Avatar"
        onMouseEnter={showPreview}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: 150,
          height: 150,
          margin: "0 auto",
          cursor: "zoom-in",
          zIndex: 1,
          display: "block",
          opacity: isHovered ? 0 : 1,
          position: "relative",
          transition: "opacity 120ms ease",
          borderRadius: "50%",
        }}
      />

      {isHovered &&
        createPortal(
          <div
            aria-hidden="true"
            style={{
              inset: 0,
              zIndex: 1200,
              position: "fixed",
              animation: "profileOverlayIn 220ms ease-out both",
              pointerEvents: "none",
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(0, 0, 0, 0.48)",
            }}
          >
            <style>{`
              @keyframes profileOverlayIn {
                from { opacity: 0; backdrop-filter: blur(0); }
                to { opacity: 1; backdrop-filter: blur(4px); }
              }
              @keyframes profileImageIn {
                from { transform: scale(1); opacity: 0; }
                to { transform: scale(2.3); opacity: 1; }
              }
            `}</style>

            <img
              src={profileImage}
              alt=""
              style={{
                top: imagePosition.top,
                left: imagePosition.left,
                width: imagePosition.width,
                height: imagePosition.height,
                position: "fixed",
                objectFit: "cover",
                transform: "scale(2.3)",
                boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.2)",
                animation:
                  "profileImageIn 260ms cubic-bezier(0.22, 1, 0.36, 1) both",
                borderRadius: "50%",
              }}
            />
          </div>,

          document.body,
        )}
    </section>
  );
}
