// @ts-nocheck
import React, { useMemo } from "react";
import Slider from "react-slick";
import Frame1 from "../../../assets/frame-1.png";
import Frame2 from "../../../assets/frame-2.png";
import Frame3 from "../../../assets/frame-3.png";
import { staticAssetUrl } from "../../../utils/staticAssetUrl";

const BANNER_FRAMES = [Frame1, Frame2, Frame3];

const handleImageError = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
};

const Banner = ({ isNarrowScreen = false }) => {
  const settings = useMemo(
    () => ({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 3000,
      cssEase: "linear",
      pauseOnHover: true,
      pauseOnFocus: true,
      waitForAnimate: true,
    }),
    []
  );

  if (isNarrowScreen) {
    return (
      <div className="banner">
        <div className="banner__main">
          <div className="banner__main-slider banner__main-slider--static">
            <img
              src={staticAssetUrl(BANNER_FRAMES[0])}
              alt="no file"
              onError={handleImageError}
              className="banner__main-img"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="banner">
      <div className="banner__main">
        <Slider {...settings} className="banner__main-slider">
          {BANNER_FRAMES.map((frame) => (
            <img
              key={frame}
              src={staticAssetUrl(frame)}
              alt="no file"
              onError={handleImageError}
              className="banner__main-img"
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default React.memo(Banner);
