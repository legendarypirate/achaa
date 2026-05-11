// @ts-nocheck
import React from "react";
import Slider from "react-slick";
import Frame1 from "../../../assets/frame-1.png";
import Frame2 from "../../../assets/frame-2.png";
import Frame3 from "../../../assets/frame-3.png";



const Banner = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div className="banner">
      <div className="banner__main">
        <Slider {...settings} className="banner__main-slider">
          <img src={Frame1} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} className="banner__main-img" />
          <img src={Frame2} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} className="banner__main-img" />
          <img src={Frame3} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} className="banner__main-img" />
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
