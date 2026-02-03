import { Work } from "./Work";
import { WORKS } from "../../constants/app";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Works() {
  const theme = useTheme();

  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots: React.ReactNode) => (
      <div style={{ bottom: "-35px" }}>
        <ul style={{ margin: "0px", padding: 0 }}>{dots}</ul>
        <style>{`
          .slick-dots li div {
            background: #bdbdbd !important;
            transition: background 0.3s;
          }
          .slick-dots li.slick-active div {
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
    customPaging: (_i: number) => (
      <div
        style={{
          width: "24px",
          height: "4px",
          borderRadius: "2px",
        }}
      />
    ),
  };

  return (
    <section
      style={{
        border: "1px solid #ccc",
        margin: "20px auto",
        padding: "12px",
        maxWidth: "1000px",
        borderRadius: "10px",
        backgroundColor: theme.palette.background.b1,
      }}
    >
      <h3>{t("works")}</h3>
      <div
        style={{
          padding: "20px",
        }}
      >
        <Slider {...settings}>
          {WORKS.map((work, idx) => (
            <div key={work.title + idx}>
              <Work work={work} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
