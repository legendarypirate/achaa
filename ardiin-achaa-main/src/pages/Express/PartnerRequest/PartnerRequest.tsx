// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiArrowLeftLine, RiGlobalLine, RiPhoneLine } from "react-icons/ri";
import { staticAssetUrl } from "../../../utils/staticAssetUrl";

const webHref = (web) => {
  if (!web || typeof web !== "string") return "#";
  const t = web.trim();
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  if (t.includes("@") && !t.includes("/") && !t.includes(" ")) return `mailto:${t}`;
  return `https://${t.replace(/^\/\//, "")}`;
};

const linkLabel = (web) => {
  if (!web || typeof web !== "string") return "";
  const t = web.trim();
  if (t.startsWith("http://") || t.startsWith("https://")) {
    try {
      return new URL(t).hostname.replace(/^www\./, "");
    } catch {
      return "Веб руу орох";
    }
  }
  if (t.includes("@") && !t.includes("/")) return t;
  return t.length > 40 ? `${t.slice(0, 38)}…` : t;
};

import TeeverZuuch from "../../../assets/expressBack/teever-zuuch.png";
import ChingelegTteever from "../../../assets/expressBack/chingeleg-teever.png";
import TomorZam from "../../../assets/expressBack/tomor-zam.png";
import OnlineShop from "../../../assets/expressBack/online-shop.png";
import AgaariinTeever from "../../../assets/expressBack/agaariin-teever.png";
import UlsHoorond from "../../../assets/expressBack/uls-hoorond.png";

import Altai from "../../../assets/expressCompany/altai.png";
import Ashli from "../../../assets/expressCompany/ashli.jpg";
import BigMall from "../../../assets/expressCompany/big-mall.jpg";
import Cargolink from "../../../assets/expressCompany/cargolink.jpg";
import Eenoo from "../../../assets/expressCompany/eenoo.jpg";
import Formula from "../../../assets/expressCompany/formula.jpg";
import Goy from "../../../assets/expressCompany/goy.jpg";
import HiCargo from "../../../assets/expressCompany/hi-cargo.png";
import Hishig from "../../../assets/expressCompany/hishig.png";
import HurdCargo from "../../../assets/expressCompany/hurd-cargo.jpg";
import Jcargo from "../../../assets/expressCompany/jcargo.png";
import Landbridge from "../../../assets/expressCompany/landbridge.jpg";
import MongolianExpress from "../../../assets/expressCompany/mongolian-express.jpg";
import MonlogisticsGroup from "../../../assets/expressCompany/monlogistics-group.png";
import Mrt from "../../../assets/expressCompany/mrt.jpg";
import Osoh from "../../../assets/expressCompany/osoh.jpg";
import PlayHouse from "../../../assets/expressCompany/playHouse.jpg";
import Prolog from "../../../assets/expressCompany/prolog.jpg";
import Sbl from "../../../assets/expressCompany/sbl.jpg";
import Taimen from "../../../assets/expressCompany/taimen.png";
import TopLogestic from "../../../assets/expressCompany/top-logestic.jpg";
import Tuushin from "../../../assets/expressCompany/tuushin.png";
import UBTZ from "../../../assets/expressCompany/ubtz.jpg";
import Wiscko from "../../../assets/expressCompany/wiscko.jpg";


const zuuchLogos = [
  {
    logo: Tuushin,
    name: "Туушин ХХК",
    phone: "(+976) 1132-0064, (+976) 1131-2092",
    web: "http://tuushin.mn",
  },
  {
    logo: Landbridge,
    name: "Landbridge",
    phone: "(+976) 7505-5000, (+976) 7505-7000",
    web: "https://www.landbridge.mn",
  },
  {
    logo: MonlogisticsGroup,
    name: "Monlogistics Group",
    phone: "(+976) 7011-5454",
    web: "http://www.monlogistics.mn",
  },
  {
    logo: HiCargo,
    name: "HiCargo",
    phone: "(+976) 7602-4050",
    web: "https://hicargo.mn",
  },
  {
    logo: MongolianExpress,
    name: "Монгол Экспресс ХХК",
    phone: "(+976) 1131-9304",
    web: "http://www.monex.mn",
  },
  {
    logo: Jcargo,
    name: "Jcargo",
    phone: "(+976) 7600-0006",
    web: "https://jcargo.mn",
  },
  {
    logo: Sbl,
    name: "SB Logistics LLC",
    phone: "(+976) 7011-3802",
    web: "http://sbl.mn",
  },
  {
    logo: Prolog,
    name: "Пролог Солюшн ХХК",
    phone: "(+976) 7011-9008, (+976) 7011-9007, (+976) 7011-9006",
    web: "https://prolog.mn",
  },
];

const chingelegLogos = [
  {
    logo: HiCargo,
    name: "HiCargo",
    phone: "(+976) 7602-4050",
    web: "https://hicargo.mn",
  },
  {
    logo: Mrt,
    name: "Монретранс Групп",
    phone: "(+976) 7011-6334, (+976) 7013-6334",
    web: "http://mrt.mn",
  },
  {
    logo: Altai,
    name: "Алтай Ложистик ХХК",
    phone: "(+976) 7733-6677, (+976) 8810-2217",
    web: "https://www.altailogistic.mn",
  },
  {
    logo: Landbridge,
    name: "Landbridge",
    phone: "(+976) 7505-5000, (+976) 7505-7000",
    web: "https://www.landbridge.mn",
  },
  {
    logo: Formula,
    name: "Formula Express",
    phone: "(+976) 9809-5060",
    web: "https://www.facebook.com/formulacargo",
  },
  {
    logo: TopLogestic,
    name: "Top Logestic",
    phone: "(+976) 9989-0043, (+976) 8939-5885, (+976) 8809-3403",
    web: "https://www.facebook.com/Top-logestic-103741908975590",
  },
  {
    logo: Eenoo,
    name: "Taobao захиалга - Карго (ЭЭНОО Экспресс ХХК)",
    phone: "(+976) 8001-9002",
    web: "https://www.facebook.com/eenooexpress",
  },
  {
    logo: HurdCargo,
    name: "Хурд Карго",
    phone: "(+976) 9903-3629",
    web: "https://www.facebook.com/HurdCargo",
  },
];

const wagonLogos = [
  {
    logo: UBTZ,
    name: "УБТЗ",
    phone: "(+976) 1900-1949",
    web: "ubtz@ubtz.mn",
  },
  {
    logo: MonlogisticsGroup,
    name: "Monlogistics Group",
    phone: "(+976) 7011-5454",
    web: "http://www.monlogistics.mn",
  },
  {
    logo: Tuushin,
    name: "Туушин ХХК",
    phone: "(+976) 1132-0064, (+976) 1131-2092",
    web: "http://tuushin.mn",
  },
  {
    logo: Taimen,
    name: "Taimen Logistic Services",
    phone: "(+976) 7000-6886",
    web: "https://taimenlogistic.mn",
  },
  {
    logo: Landbridge,
    name: "Landbridge",
    phone: "(+976) 7505-5000, (+976) 7505-7000",
    web: "https://www.landbridge.mn",
  },
  {
    logo: Sbl,
    name: "SB Logistics LLC",
    phone: "(+976) 7011-3802",
    web: "http://sbl.mn",
  },
  {
    logo: Ashli,
    name: "АШЛИ ХХК",
    phone: "(+976) 9910-4008, (+976) 9910-8004",
    web: "http://www.ashleytrans.mn",
  },
];

const onlineLogos = [
  {
    logo: Formula,
    name: "Formula Express",
    phone: "(+976) 9809-5060",
    web: "https://www.facebook.com/formulacargo",
  },
  {
    logo: Hishig,
    name: "Хишиг карго",
    phone: "(+976) 7766-7706",
    web: "http://hishig-cargo.mn",
  },
  {
    logo: Eenoo,
    name: "Taobao захиалга - Карго (ЭЭНОО Экспресс ХХК)",
    phone: "(+976) 8001-9002",
    web: "https://www.facebook.com/eenooexpress",
  },
  {
    logo: BigMall,
    name: "BIG MALL - Үйлдвэрийн үнээр бүх төрлийн хэрэгцээт бараа",
    phone: "(+976) 9090-5448",
    web: "https://bigmall.mn",
  },
  {
    logo: PlayHouse,
    name: "PlayHouse - Үйлдвэрийн үнээр бүх төрлийн хэрэгцээт бараа",
    phone: "(+976) 7732-7733",
    web: "https://www.facebook.com/groups/PlayHpuseZahialgiinGroup",
  },
  {
    logo: Goy,
    name: "ГОЁ - Үйлдвэрийн үнээр бүх төрлийн хэрэгцээт бараа",
    phone: "(+976) 8977-0570, (+976) 8996-9515, (+976) 9552-4788",
    web: "https://www.facebook.com/groups/baraa.zahialah",
  },
  {
    logo: Osoh,
    name: "Өсөх - Үйлдвэрийн үнээр хэрэгцээт бараа захиалгын групп",
    phone: "(+976) 9484-8333",
    web: "https://www.facebook.com/groups/2754423334879764",
  },
  {
    logo: HiCargo,
    name: "HiCargo",
    phone: "(+976) 7602-4050",
    web: "https://hicargo.mn",
  },
];

const agaarLogos = [
  {
    logo: MonlogisticsGroup,
    name: "Monlogistics Group",
    phone: "(+976) 7011-5454",
    web: "http://www.monlogistics.mn",
  },
  {
    logo: Cargolink,
    name: "Агаарын Ачаа Карголинк ХХК",
    phone: "(+976) 7510-0300",
    web: "http://aircargo.cargolink.mn",
  },
  {
    logo: Wiscko,
    name: "Wiscko cargo (агаарын ачаа, газрын ачаа)",
    phone: "(+976) 7000-5643",
    web: "http://www.wiscko.edu.mn",
  },
  {
    logo: Tuushin,
    name: "Туушин ХХК",
    phone: "(+976) 1132-0064, (+976) 1131-2092",
    web: "http://tuushin.mn",
  },
];

const PartnerRequest = () => {
  const { id } = useParams();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    switch (id) {
      case "1":
        setImage(TeeverZuuch);
        setTitle("тээвэр зуучийн салбар");
        setLink("/express/1/register");
        setLogos(zuuchLogos);
        break;
      case "2":
        setImage(ChingelegTteever);
        setTitle("чингэлэг тээврийн салбар");
        setLink("/express/2/user-type");
        setLogos(chingelegLogos);
        break;
      case "3":
        setImage(TomorZam);
        setTitle("вагон тээврийн салбар");
        setLink("/express/3/user-type");
        setLogos(wagonLogos);
        break;
      case "4":
        setImage(OnlineShop);
        setTitle("онлайн дэлгүүрийн салбар");
        setLink("/express/4/register");
        setLogos(onlineLogos);
        break;
      case "5":
        setImage(AgaariinTeever);
        setTitle("агаарын тээврийн салбар");
        setLink("/express/5/register");
        setLogos(agaarLogos);
        break;
      case "6":
        setImage(UlsHoorond);
        setTitle("улс хот хоорондын салбар");
        setLink("/express/6/register");
        setLogos([]);
        break;
      default:
        setImage("");
        setTitle("");
        setLink("");
        setLogos([]);
    }
  }, [id]);

  const onImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
  };

  return (
    <div className="partnerRequest">
      <div className="partnerRequest__hero">
        <img
          className="partnerRequest__hero-bg"
          src={staticAssetUrl(image)}
          alt=""
          onError={onImgError}
        />
        <div className="partnerRequest__hero-overlay" aria-hidden />
        <div className="partnerRequest__hero-inner">
          <Link to="/" className="partnerRequest__back">
            <RiArrowLeftLine aria-hidden />
            Нүүр хуудас
          </Link>
          <p className="partnerRequest__eyebrow">Тээвэрлэлтийн бүртгэл</p>
          <h1 className="partnerRequest__hero-title">{title}</h1>
          <Link to={link} className="partnerRequest__hero-cta">
            Бүртгүүлэх
          </Link>
        </div>
      </div>

      {logos.length > 0 ? (
        <section className="partnerRequest__section" aria-label="Хамтрагч байгууллагууд">
          <header className="partnerRequest__section-head">
            <h2 className="partnerRequest__section-title">Хамтрагч байгууллагууд</h2>
            <p className="partnerRequest__section-desc">
              Доорх байгууллагуудтай холбогдож, үйлчилгээний нөхцөлөөс нь тодруулна уу.
            </p>
          </header>
          <div className="partnerRequest__grid">
            {logos.map((item, index) => (
              <article key={index} className="partnerRequest__card">
                <figure className="partnerRequest__card-fig">
                  <img
                    className="partnerRequest__card-logo"
                    src={staticAssetUrl(item.logo)}
                    alt=""
                    onError={onImgError}
                  />
                </figure>
                <div className="partnerRequest__card-body">
                  <h3 className="partnerRequest__card-name">{item.name}</h3>
                  <div className="partnerRequest__card-row">
                    <RiGlobalLine aria-hidden className="partnerRequest__card-icon" />
                    <span className="partnerRequest__card-row-label">Веб</span>
                    <a
                      className="partnerRequest__card-link"
                      href={webHref(item.web)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {linkLabel(item.web)}
                    </a>
                  </div>
                  <div className="partnerRequest__card-row">
                    <RiPhoneLine aria-hidden className="partnerRequest__card-icon" />
                    <span className="partnerRequest__card-row-label">Утас</span>
                    <span className="partnerRequest__card-phone">{item.phone}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <p className="partnerRequest__empty">
          Энэ төрлийн бүртгэлд харуулах хамтрагчдын жагсаалт одоогоор байхгүй байна. Бүртгэлээ үргэлжлүүлэхийн тулд дээрх товчийг дарна уу.
        </p>
      )}
    </div>
  );
};

export default PartnerRequest;
