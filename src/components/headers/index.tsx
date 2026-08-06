import { motion } from "motion/react";
import { Profile } from "./Profile";
import { BANNERS } from "../../constants/app";
import { Controls } from "./Controls";
import { AlertMessage } from "../Alert";
import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  hidden: boolean;
}

export function Header({ hidden }: Props) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const sliderRef = useRef<Slider | null>(null);

  const resetAutoplay = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPause();
      sliderRef.current.slickPlay();
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    draggable: true,
    swipe: true,
    touchMove: true,
    pauseOnHover: false,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next + 1),
    afterChange: () => resetAutoplay(),
    onSwipe: () => resetAutoplay(),
    onEdge: () => resetAutoplay(),
    onLazyLoad: () => resetAutoplay(),
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <ul style={{ margin: "0px", padding: 0, display: "flex", gap: "10px" }}>
          {dots}
        </ul>
        <style>{`
          .slick-dots {
            display: flex !important;
            justify-content: center;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          .slick-dots li {
            display: inline-block;
            margin: 0 4px;
          }
          .slick-dots li button {
            width: 12px !important;
            height: 12px !important;
            border-radius: 999px !important;
            background: #bdbdbd !important;
            opacity: 1 !important;
            border: none !important;
          }
          .slick-dots li.slick-active button {
            background: #646cff !important;
          }
          .slick-prev:before {
            content: '';
            margin-left: -10px;
            display: inline-block;
            width: 34px;
            height: 34px;
            background: url('data:image/svg+xml;utf8,<svg fill="%23646cff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>') center/contain no-repeat;
          }
          .slick-next:before {
            content: '';
            display: inline-block;
            width: 34px;
            height: 34px;
            background: url('data:image/svg+xml;utf8,<svg fill="%23646cff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>') center/contain no-repeat;
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
            position: "absolute",
            top: "16px",
            right: "24px",
            background: "rgba(0, 0, 0, 0.35)",
            color: "#f5f5f5",
            padding: "6px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            letterSpacing: "0.03em",
            zIndex: 3,
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
