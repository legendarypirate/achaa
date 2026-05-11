// @ts-nocheck
import React from "react";
import Slider from "react-slick";
import Picture1 from "../../assets/bidnii-tuhai1.png";
import Picture2 from "../../assets/bidnii-tuhai2.png";
import Picture3 from "../../assets/bidnii-tuhai3.png";
import Picture4 from "../../assets/bidnii-tuhai4.png";
import AboutUsText from "./AboutUsText";


const AboutUs = () => {
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
    <div className="aboutUs">
      <div className="aboutUs__slick">
        <Slider {...settings} className="aboutUs__slick-slider">
          <img src={Picture1} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} className="aboutUs__slick-img" />
          <img src={Picture2} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} className="aboutUs__slick-img" />
          <img src={Picture3} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} className="aboutUs__slick-img" />
          <img src={Picture4} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} className="aboutUs__slick-img" />
          <AboutUsText />
        </Slider>
      </div>

      <div className="aboutUs__content">
        <div className="aboutUs__llc">
          <h3 className="aboutUs__content-title">"АРДЫН АЧАА" ХХК НЬ</h3>

          <div className="aboutUs__llc-count">
            <div className="aboutUs__llc-count-box">
              <b className="aboutUs__llc-count-box-number">15</b>
              Үндсэн ажилтан
            </div>

            <div className="aboutUs__llc-count-box">
              <b className="aboutUs__llc-count-box-number">300</b>
              Хамтрагч байгууллага
            </div>

            <div className="aboutUs__llc-count-box">
              <b className="aboutUs__llc-count-box-number">47К</b>
              Дэмжигчид
            </div>

            <div className="aboutUs__llc-count-box">
              <b className="aboutUs__llc-count-box-number">490</b>
              Үндсэн гишүүн
            </div>
          </div>
        </div>

        <div className="aboutUs__text">
          <h3 className="aboutUs__content-title">Бидний эрхэм зорилго</h3>
          Мэдлэгээ тасралтгүй шинэчилж бизнесийн ашгаа нэмэгдүүлэх үнэнч
          хамтрагч нь байх болно.
        </div>

        <div className="aboutUs__text">
          <h3 className="aboutUs__content-title">Бидний Уриа</h3>
          E-Academy таныг өнөөгийн боловсролоос шинэ үеийн боловсролд хүргэнэ.
          E-academy will take you from today's education to a new generation of
          education.
        </div>

        <div className="aboutUs__text">
          <h3 className="aboutUs__content-title">Бидний үнэт зүйл</h3>
          Эргэх тасралтгүй хол боо, хандлага, ур чадвар, шинийг санаачлагч,
          хувирах чадвар өндөртэй боловсон хүчинг бэлтгэх.
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
