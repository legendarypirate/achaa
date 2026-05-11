// @ts-nocheck
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import moment from "moment";
import { RiUserFill } from "react-icons/ri";
import Logo from "../../../assets/logo.png";
import NoImage from "../../../assets/no-image.jpg";
import Axios from ".././../../Axios";
import { ROUTES } from "../../routes";
import DropDown from "./DropDown/DropDown";
import CompanyProfileModal from "./CompanyProfileModal/CompanyProfileModal";


const AdminMenu = ({ setProfileVisible }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [banner, setBanner] = useState({});

  const [privateModalVisible, setPrivateModalVisible] = useState(false);

  useEffect(() => {
    Axios.get(`/partner/getByCargoAdminID/${id}`).then((res) => {
      setData(res.data);
    });

    Axios.get("/introBanner/getByType/banner").then((res) => {
      if (res.data.file_url) {
        setBanner(res.data.file_url);
      } else {
        setBanner(NoImage);
      }
    });
  }, [id]);

  const activityViewer = () => {
    if (data.insurance) {
      return "Улс, хот хоорондын";
    } else if (data.express_type) {
      return data.express_type;
    } else {
      return null;
    }
  };

  const renderHeading = () => {
    return (
      <div className="adminMenu__heading">
        <figure className="adminMenu__heading-fig">
          {id > 0 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <RiUserFill
                style={{
                  fontSize: 48,
                  backgroundColor: "gainsboro",
                  border: "1px solid gray",
                  borderRadius: 48,
                  padding: 4,
                }}
              />
            </div>
          ) : (
            <>
              <img
                className="adminMenu__heading-fig-logo"
                src={Logo}
                alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
              />
              <figcaption className="adminMenu__heading-fig-cap">
                Ардын ачаа
              </figcaption>
            </>
          )}
        </figure>

        {id > 0 && (
          <div className="adminMenu__heading-info">
            <p className="adminMenu__heading-info-name">
              <label>Нэр:</label>
              {!data.name || data.name === "0" ? "Хувь хүн" : data.name}
            </p>

            <p className="adminMenu__heading-info-operation">
              <label>Үйл ажиллагаа:</label>
              {activityViewer()}
            </p>

            <p className="adminMenu__heading-info-signedDate">
              <label>Бүртгүүлсэн өдөр:</label>
              {moment(data.signed_date).format("YYYY/MM/DD")}
            </p>

            <button
              className="adminMenu__heading-info-privateInfo"
              onClick={() => setPrivateModalVisible(true)}
            >
              Компанийн танилцуулга оруулах
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderItem = () => {
    return ROUTES({ id }).map((item, index) => {
      if (!item) {
        return null;
      } else if (item.dropDown) {
        return (
          <DropDown
            key={index}
            id={id}
            title={item.name}
            content={item.dropDown.map((dropItem) => {
              return dropItem;
            })}
          />
        );
      } else {
        return (
          <li key={index} className="adminMenu__item">
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "adminMenu__item-link adminMenu__item-link--active"
                  : "adminMenu__item-link"
              }
              to={`/admin/${id}${item.uri}`}
            >
              {item.name}
            </NavLink>
          </li>
        );
      }
    });
  };

  return (
    <aside className="adminMenu" onClick={() => setProfileVisible(false)}>
      <CompanyProfileModal
        accountID={id}
        visible={privateModalVisible}
        onCancel={() => setPrivateModalVisible(false)}
      />

      {renderHeading()}

      <ul className="adminMenu__container">{renderItem()}</ul>

      {id > 0 && (
        <img className="adminMenu__banner" src={banner} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} />
      )}
    </aside>
  );
};

export default AdminMenu;
