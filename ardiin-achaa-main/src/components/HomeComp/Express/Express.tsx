// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import { TRANSPARENT_PIXEL_GIF } from "../../../constants/media";
import TeeverZuuch from "../../../assets/expressBack/teever-zuuch.png";
import ChingelegTeever from "../../../assets/expressBack/chingeleg-teever.png";
import TomorZam from "../../../assets/expressBack/tomor-zam.png";
import OnlineShop from "../../../assets/expressBack/online-shop.png";
import AgaariinTeever from "../../../assets/expressBack/agaariin-teever.png";
import UlsHoorond from "../../../assets/expressBack/uls-hoorond.png";

const EXPRESS_SERVICES = [
  {
    to: "/express/1",
    title: "Тээвэр зууч бүртгүүлэх",
    img: TeeverZuuch,
    fallback:
      "https://images.unsplash.com/photo-1586528116493-696d95f9241d?auto=format&fit=crop&w=800&q=80",
  },
  {
    to: "/express/2",
    title: "Чингэлэг тээвэр бүртгүүлэх",
    img: ChingelegTeever,
    fallback:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80",
  },
  {
    to: "/express/3",
    title: "Вагон тээвэр бүртгүүлэх",
    img: TomorZam,
    fallback:
      "https://images.unsplash.com/photo-1474487548417-781cb714f97f?auto=format&fit=crop&w=800&q=80",
  },
  {
    to: "/express/4",
    title: "Карго, онлайн дэлгүүр бүртгүүлэх",
    img: OnlineShop,
    fallback:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80",
  },
  {
    to: "/express/5",
    title: "Агаарын тээвэр бүртгүүлэх",
    img: AgaariinTeever,
    fallback:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
  },
  {
    to: "/express/6",
    title: "Улс, хот хоорондын авто тээвэр бүртгүүлэх",
    img: UlsHoorond,
    fallback:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80",
  },
];

const Express = () => {
  return (
    <section className="express" aria-label="Тээврийн үйлчилгээ бүртгэл">
      <div className="express__intro">
        <h2 className="express__intro-title">Тээвэрлэлтийн төрлөөр бүртгүүлэх</h2>
        <p className="express__intro-text">
          Өөрийн үйл ажиллагаанд тохирох тээврийн төрлийг сонгоод бүртгэлээ үргэлжлүүлнэ үү.
        </p>
      </div>

      <div className="express__grid">
        {EXPRESS_SERVICES.map((item) => (
          <Link key={item.to} to={item.to} className="express__card">
            <div className="express__card-media">
              <img
                src={item.img}
                alt=""
                loading="lazy"
                onError={(e) => {
                  const el = e.currentTarget;
                  // Primary failed → try remote fallback once. If that fails too (CSP,
                  // firewall, adblock), stop with an inert data URI so the tab does not
                  // hammer Unsplash on every error / remount.
                  if (el.dataset.imgErr === "1") {
                    el.onerror = null;
                    el.src = TRANSPARENT_PIXEL_GIF;
                    return;
                  }
                  el.dataset.imgErr = "1";
                  el.src = item.fallback;
                }}
              />
            </div>
            <div className="express__card-body">
              <span className="express__card-accent" aria-hidden />
              <span className="express__card-title">{item.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Express;
