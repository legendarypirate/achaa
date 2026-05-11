// @ts-nocheck
import React from "react";
import { TRANSPARENT_PIXEL_GIF } from "../../constants/media";
import {
  RiFacebookCircleFill,
  RiTwitterFill,
  RiYoutubeFill,
  RiMapPinFill,
  RiPhoneFill,
  RiAtLine,
} from "react-icons/ri";
import Logo from "../../assets/logo.png";
import Map from "../../assets/map.png";

const FALLBACK_LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg";
const FALLBACK_MAP_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/World_map_blank_without_borders.svg/1280px-World_map_blank_without_borders.svg.png";


const Footer = () => {
  return (
    <footer className="footer">
      <img
        className="footer__map"
        src={Map}
        alt="no file"
        onError={(e) => {
          const el = e.currentTarget;
          if (el.dataset.imgErr === "1") {
            el.onerror = null;
            el.src = TRANSPARENT_PIXEL_GIF;
            return;
          }
          el.dataset.imgErr = "1";
          el.src = FALLBACK_MAP_URL;
        }}
      />

      <div className="footer__social">
        <div className="footer__social-heading">
          <img
            className="footer__social-heading-logo"
            src={Logo}
            alt="no file"
            onError={(e) => {
              const el = e.currentTarget;
              if (el.dataset.imgErr === "1") {
                el.onerror = null;
                el.src = TRANSPARENT_PIXEL_GIF;
                return;
              }
              el.dataset.imgErr = "1";
              el.src = FALLBACK_LOGO_URL;
            }}
          />
          <h3 className="footer__social-heading-text">"Ардын ачаа нэгдэл"</h3>
          <h3 className="footer__social-heading-text">Бид нэг хүч</h3>
        </div>

        <p className="footer__social-text">
          Бидний үйл ажиллагаанд нэгдэн хамтран ажиллахыг урьж байна.
        </p>

        <div className="footer__social-links">
          <a
            className="footer__social-links-item"
            href="https://www.facebook.com/ArdiinAchaa/?ref=pages_you_manage"
            target="_blank noreferrer"
          >
            <RiFacebookCircleFill size={28} />
          </a>
          <a
            className="footer__social-links-item"
            href="https://www.facebook.com/ArdiinAchaa/?ref=pages_you_manage"
            target="_blank noreferrer"
          >
            <RiTwitterFill size={28} />
          </a>
          <a
            className="footer__social-links-item"
            href="https://www.youtube.com/channel/UC7ZS-_d0K7NhCdSDKChbW1w"
            target="_blank noreferrer"
          >
            <RiYoutubeFill size={28} />
          </a>
        </div>
      </div>

      <div className="footer__contact">
        <h3 className="footer__contact-title">Холбоо барих</h3>

        <div className="footer__contact-text">
          <RiMapPinFill size={22} />
          <p>
            Улаанбаатар хот, Баянгол дүүрэг 3-р хороо Тээвэрчдийн гудамж, Ворлд
            Вайн төв 502тоот
          </p>
        </div>

        <div className="footer__contact-text">
          <RiPhoneFill size={22} />
          <p>(976)-75336060, (976)-93000022</p>
        </div>

        <div className="footer__contact-text">
          <RiAtLine size={22} />
          <p>info@e-achaa.com</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__bottom-text">
          Зохиогчийн эрх &copy;{1900 + new Date().getYear()}. Бүх эрхийг хуулиар
          хамгаалсан.
        </p>

        <p className="footer__bottom-text">
          Powered by
          <a href="http://bowsys.mn/" className="footer__bottom-text-link">
            BOW LLC
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
