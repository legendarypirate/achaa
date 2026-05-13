// @ts-nocheck
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { staticAssetUrl } from "../../../utils/staticAssetUrl";
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

const PARTNER_LOGOS = [
  Partner1Logo,
  Partner2Logo,
  Partner3Logo,
  Partner4Logo,
  Partner5Logo,
  Partner6Logo,
  Partner7Logo,
  Partner8Logo,
  Partner9Logo,
  Partner10Logo,
  Partner11Logo,
];

const handleImageError = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
};

const Organization = ({ isNarrowScreen = false }) => {
  const settings = useMemo(
    () => ({
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 4,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 3000,
      cssEase: "linear",
      pauseOnHover: true,
      pauseOnFocus: true,
      waitForAnimate: true,
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
    }),
    []
  );

  const logoItems = PARTNER_LOGOS.map((logo, index) => (
    <img
      key={logo}
      className="organizaton__slick-img"
      src={staticAssetUrl(logo)}
      alt={`partner-${index + 1}`}
      onError={handleImageError}
    />
  ));

  return (
    <div className="organizaton">
      <h3 className="organizaton__title">
        "AРДЫН АЧАА НЭГДЭЛ" ХК-ийн Хамтрагч байгууллагууд
      </h3>

      <p className="organizaton__para">
        МАНАЙ СИСТЕМИЙН ҮНДСЭН ҮҮРЭГ БОЛ БҮГДИЙГ НЭГ ДОР ЦУГЦУУЛЖ, НЭГДСЭН
        МЭДЭЭЛЛЭЭР ХАНГАХ
        <span className="organizaton__para-text">
          Энэхүү нээлттэй платформын амин сүнс нь тээврийн салбарын бүхий л
          шатны мэргэжлийн байгууллага хүвь хүмүүс билээ.
        </span>
      </p>

      {isNarrowScreen ? (
        <div className="organizaton__slick organizaton__slick--static">{logoItems}</div>
      ) : (
        <Slider {...settings} className="organizaton__slick">
          {logoItems}
        </Slider>
      )}

      <Link className="organizaton__link" to="/all-organizations">
        Бүгдийг харах
      </Link>
    </div>
  );
};

export default React.memo(Organization);
