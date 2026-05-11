// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Partner1Logo from "../../../assets/withCompany/partner1-logo.png";
import Partner2Logo from "../../../assets/withCompany/partner2-logo.png";
import Partner3Logo from "../../../assets/withCompany/partner3-logo.png";
import Partner4Logo from "../../../assets/withCompany/partner4-logo.png";
import Partner5Logo from "../../../assets/withCompany/partner5-logo.png";
import Partner6Logo from "../../../assets/withCompany/partner6-logo.png";
import Partner7Logo from "../../../assets/withCompany/partner7-logo.png";
import Partner8Logo from "../../../assets/withCompany/partner8-logo.png";
import Partner9Logo from "../../../assets/withCompany/partner9-logo.png";
import Partner10Logo from "../../../assets/withCompany/partner10-logo.png";
import Partner11Logo from "../../../assets/withCompany/partner11-logo.png";



const Organization = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="organizaton">
      <h3 className="organizaton__title">
        "AРДЫН АЧАА НЭГДЭЛ" ХК-ийн Хамтрагч байгууллагууд
      </h3>

      <p className="organizaton__para">
        МАНАЙ СИСТЕМИЙН ҮНДСЭН ҮҮРЭГ БОЛ БҮГДИЙГ НЭГ ДОР ЦУГЦУУЛЖ, НЭГДСЭН
        МЭДЭЭЛЛЭЭР ХАНГАХ
        <p className="organizaton__para-text">
          Энэхүү нээлттэй платформын амин сүнс нь тээврийн салбарын бүхий л
          шатны мэргэжлийн байгууллага хүвь хүмүүс билээ.
        </p>
      </p>

      <Slider {...settings} className="organizaton__slick">
        <img
          className="organizaton__slick-img"
          src={Partner1Logo}
          alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
        />
        <img
          className="organizaton__slick-img"
          src={Partner2Logo}
          alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
        />
        <img
          className="organizaton__slick-img"
          src={Partner3Logo}
          alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
        />
        <img
          className="organizaton__slick-img"
          src={Partner4Logo}
          alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
        />
        <img
          className="organizaton__slick-img"
          src={Partner5Logo}
          alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
        />
        <img
          className="organizaton__slick-img"
          src={Partner6Logo}
          alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
        />
        <img
          className="organizaton__slick-img"
          src={Partner7Logo}
          alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
        />
        <img
          className="organizaton__slick-img"
          src={Partner8Logo}
          alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
        />
        <img
          className="organizaton__slick-img"
          src={Partner9Logo}
          alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
        />
        <img
          className="organizaton__slick-img"
          src={Partner10Logo}
          alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
        />
        <img
          className="organizaton__slick-img"
          src={Partner11Logo}
          alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
        />
      </Slider>

      <Link className="organizaton__link" to="/all-organizations">
        Бүгдийг харах
      </Link>
    </div>
  );
};

export default Organization;
