// @ts-nocheck
import React from "react";
import Partner1Logo from "../../assets/withCompany/partner1-logo.png";
import Partner2Logo from "../../assets/withCompany/partner2-logo.png";
import Partner3Logo from "../../assets/withCompany/partner3-logo.png";
import Partner4Logo from "../../assets/withCompany/partner4-logo.png";
import Partner5Logo from "../../assets/withCompany/partner5-logo.png";
import Partner6Logo from "../../assets/withCompany/partner6-logo.png";
import Partner7Logo from "../../assets/withCompany/partner7-logo.png";
import Partner8Logo from "../../assets/withCompany/partner8-logo.png";
import Partner9Logo from "../../assets/withCompany/partner9-logo.png";
import Partner10Logo from "../../assets/withCompany/partner10-logo.png";
import Partner11Logo from "../../assets/withCompany/partner11-logo.png";
import { staticAssetUrl } from "../../utils/staticAssetUrl";


const AllOrganizations = () => {
  return (
    <div className="allOrganizations">
      <div className="allOrganizations__container">
        <h3 className="allOrganizations__container-title">
          "АРДЫН АЧАА НЭГДЭЛ" ХК-ийн Хамтрагч байгууллагдууд
        </h3>

        <p className="allOrganizations__container-para">
          МАНАЙ СИСТЕМИЙН ҮНДСЭН ҮҮРЭГ БОЛ БҮГДИЙГ НЭГ ДОР ЦУГЦУУЛЖ, НЭГДСЭН
          МЭДЭЭЛЛЭЭР ХАНГАХ
          <span className="allOrganizations__container-para-text">
            Энэхүү нээлттэй платформын амин сүнс нь тээврийн салбарын бүхий л
            шатны мэргэжлийн байгууллага хүвь хүмүүс билээ.
          </span>
        </p>

        <div className="allOrganizations__container-banners">
          <img
            className="allOrganizations__container-banners-img"
            src={staticAssetUrl(Partner1Logo)}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          <img
            className="allOrganizations__container-banners-img"
            src={staticAssetUrl(Partner2Logo)}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          <img
            className="allOrganizations__container-banners-img"
            src={staticAssetUrl(Partner3Logo)}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          <img
            className="allOrganizations__container-banners-img"
            src={staticAssetUrl(Partner4Logo)}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          <img
            className="allOrganizations__container-banners-img"
            src={staticAssetUrl(Partner5Logo)}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          <img
            className="allOrganizations__container-banners-img"
            src={staticAssetUrl(Partner6Logo)}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          <img
            className="allOrganizations__container-banners-img"
            src={staticAssetUrl(Partner7Logo)}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          <img
            className="allOrganizations__container-banners-img"
            src={staticAssetUrl(Partner8Logo)}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          <img
            className="allOrganizations__container-banners-img"
            src={staticAssetUrl(Partner9Logo)}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          <img
            className="allOrganizations__container-banners-img"
            src={staticAssetUrl(Partner10Logo)}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          <img
            className="allOrganizations__container-banners-img"
            src={staticAssetUrl(Partner11Logo)}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
        </div>
      </div>
    </div>
  );
};

export default AllOrganizations;
