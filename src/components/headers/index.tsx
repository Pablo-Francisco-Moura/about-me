import { motion } from "motion/react";
import { Profile } from "./Profile";
import { BANNERS } from "../../constants/app";
import { Controls } from "./controls";
import { AlertMessage } from "../Alert";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  hidden: boolean;
}

interface ArrowProps {
  direction: "left" | "right";
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

function BannerArrow({ style, className, direction, onClick }: ArrowProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      className={className}
      aria-label={direction === "left" ? "Previous banner" : "Next banner"}
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

export function Header({ hidden }: Props) {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  const resetAutoplay = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPause();
      sliderRef.current.slickPlay();
    }
  };

  const goToSlide = (index: number) => {
    sliderRef.current?.slickGoTo(index);
    setCurrentSlide(index + 1);
    resetAutoplay();
  };

  const settings = {
    dots: true,
    speed: 500,
    swipe: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    touchMove: true,
    draggable: true,
    prevArrow: <BannerArrow direction="left" />,
    nextArrow: <BannerArrow direction="right" />,
    slidesToShow: 1,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    onEdge: () => resetAutoplay(),
    onSwipe: () => resetAutoplay(),
    onLazyLoad: () => resetAutoplay(),
    afterChange: () => resetAutoplay(),
    beforeChange: (_current: number, next: number) => setCurrentSlide(next + 1),

    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          width: "100%",
          zIndex: 5,
          bottom: "16px",
          display: "flex",
          position: "absolute",
          justifyContent: "center",
        }}
      >
        <ul style={{ margin: "0px", padding: 0, display: "flex", gap: "10px" }}>
          {dots}
        </ul>

        <style>{`
          .slick-dots {
            width: 100%;
            margin: 0;
            display: flex !important;
            padding: 0;
            justify-content: center;
          }
          .slick-dots li {
            margin: 0 4px;
            display: inline-block;
          }
          .slick-dots li button {
            width: 12px !important;
            border: none !important;
            height: 12px !important;
            opacity: 1 !important;
            background: #bdbdbd !important;
            border-radius: 999px !important;
          }
          .slick-dots li.slick-active button {
            background: #646cff !important;
          }
        `}</style>
      </div>
    ),

    customPaging: () => (
      <div style={{ width: "12px", height: "12px", borderRadius: "999px" }} />
    ),
  };

  return (
    <motion.header
      className="header"
      animate={{
        y: hidden ? -240 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onWheel={(event) => {
        event.stopPropagation();
        event.currentTarget.closest("#main-layout")?.scrollBy({
          top: event.deltaY,
          behavior: "auto",
        });
      }}
    >
      <div className="header-background">
        <Slider ref={sliderRef} {...settings}>
          {BANNERS.map((src, index) => (
            <div key={index} className="header-slide">
              <img src={src} alt={`Banner ${index + 1}`} />
            </div>
          ))}
        </Slider>

        <div className="header-overlay" />
      </div>

      <div
        style={{
          left: "50%",
          bottom: "16px",
          zIndex: 5,
          gap: "8px",
          display: "flex",
          position: "absolute",
          transform: "translateX(-50%)",
        }}
      >
        {BANNERS.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to banner ${index + 1}`}
            onClick={() => goToSlide(index)}
            style={{
              width: "12px",
              height: "12px",
              padding: 0,
              border: "none",
              cursor: "pointer",
              borderRadius: "999px",
              background: currentSlide === index + 1 ? "#646cff" : "#bdbdbd",
            }}
          />
        ))}
      </div>

      <div
        className="header-content"
        style={{
          gap: "12px",
          width: "100%",
          display: "flex",
          position: "relative",
          marginTop: "12px",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            bottom: "12px",
            right: "12px",
            color: "#f5f5f5",
            zIndex: 3,
            padding: "6px 10px",
            position: "absolute",
            fontSize: "12px",
            background: "rgba(0, 0, 0, 0.35)",
            borderRadius: "999px",
            letterSpacing: "0.03em",
          }}
        >
          {currentSlide} / {BANNERS.length}
        </div>

        <Controls />

        <AlertMessage />

        <Profile />
      </div>
    </motion.header>
  );
}
