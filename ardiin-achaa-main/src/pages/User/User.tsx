// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Navigate, NavLink, Route, Routes, useParams } from "react-router-dom";

import {
  RiMenuUnfoldFill,
  RiUserFollowLine,
  RiExchangeDollarFill,
  RiUserFill,
  RiInboxArchiveFill,
  RiSlideshow4Fill,
  RiCalculatorFill,
  RiMailSendFill,
  RiFridgeFill,
  RiFileTextFill,
  RiCurrencyFill,
} from "react-icons/ri";

import NoFile from "../../assets/no-file.jpg";
import NoImage from "../../assets/no-image.jpg";
import Axios from "../../Axios";

import EnableMembership from "../../components/UserComp/EnableMembership/EnableMembership";
import ConfirmedUser from "../../components/UserComp/ConfirmedUser/ConfirmedUser";
import Profile from "../../components/UserComp/Profile/Profile";
import SentRequests from "../../components/UserComp/SentRequests/SentRequests";
import UnitedInfos from "../../components/UserComp/UnitedInfo/UnitedInfos";
import InvoicesList from "../../components/UserComp/InvoicesList/InvoicesList";
import PriceOffers from "../../components/UserComp/PriceOffer/PriceOffers";

import UserToggle from "./UserToggle/UserToggle";
import Modal from "../../tools/Modal/Modal";
import BaggageModal from "../../components/UserComp/BaggageModal/BaggageModal";
import CubicmeterModal from "../../components/UserComp/CubicmeterModal/CubicmeterModal";


const User = () => {
  const { id } = useParams();
  const startPath = "/user/" + id;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [user_code, setUserCode] = useState("");
  const [membership, setMembership] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [image, setImage] = useState("");

  const [banner, setBanner] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showCubic, setShowCubic] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const [isToggleTop, setIsToggleTop] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkIsToggleTop);

    Axios.get(`/accounts/getByID/${id}`).then((res) => {
      const { data } = res;

      setFirstname(data.firstname);
      setLastname(data.lastname);
      setUserCode(data.user_code);
      setMembership(data.membership);
      setConfirm(data.confirm);
      setImage(data.image);
    });

    Axios.get("/introBanner/getByType/banner").then((res) => {
      if (res.data.file_url) {
        setBanner(res.data.file_url);
      } else {
        setBanner(NoImage);
      }
    });
  }, [id]);

  const checkIsToggleTop = () => {
    if (window.scrollY > 10) {
      setIsToggleTop(true);
    } else {
      setIsToggleTop(false);
    }
  };

  const signoutOnClick = () => {
    setAlertVisible(true);
  };

  const modalHandeleCancel = () => {
    setAlertVisible(false);
  };

  const modalHandleOK = () => {
    window.localStorage.removeItem("token");

    if (!localStorage.getItem("token")) {
      window.location.replace("/");
    }
  };

  const getMemberType = () => {
    let member = "---";

    if (confirm) {
      if (membership === 1) {
        member = "Энгийн";
      } else if (membership === 2) {
        member = "Байгууллага";
      } else if (membership === 3) {
        member = "Тусгай гишүүн";
      }
    }

    return member;
  };

  const renderMenu = (isToggle) => {
    return (
      <div className={`user__menu-nav ${isToggle && "user__menu-nav--toggle"}`}>
        <NavLink
          className={(navData) =>
            `user__menu-nav-item ${
              navData.isActive && "user__menu-nav-item--active"
            } ${
              navData.isActive &&
              isToggle &&
              "user__menu-nav-item--active--toggle"
            }`
          }
          onClick={() => setShowToggle(false)}
          to={`${startPath}/pack`}
        >
          <div>{confirm ? <RiUserFollowLine /> : <RiExchangeDollarFill />}</div>
          <b>
            {confirm ? "Хэрэглэгчийн булан" : "Үйлчилгээний эрх идэвхжүүлэх"}
          </b>
        </NavLink>

        <NavLink
          className={(navData) =>
            `user__menu-nav-item ${
              navData.isActive && "user__menu-nav-item--active"
            } ${
              navData.isActive &&
              isToggle &&
              "user__menu-nav-item--active--toggle"
            }`
          }
          onClick={() => setShowToggle(false)}
          to={`${startPath}/profile`}
        >
          <RiUserFill />
          <b>Хэрэглэгчийн мэдээлэл</b>
        </NavLink>

        <button
          className="user__menu-nav-item"
          onClick={() => setShowModal(true)}
        >
          <RiInboxArchiveFill />
          <b>Шинээр ачаа бүртгүүлэх</b>
        </button>
        <BaggageModal
          account_id={id}
          visible={showModal}
          onCancel={() => setShowModal(false)}
        />

        <NavLink
          className={(navData) =>
            `user__menu-nav-item ${
              navData.isActive && "user__menu-nav-item--active"
            } ${
              navData.isActive &&
              isToggle &&
              "user__menu-nav-item--active--toggle"
            }`
          }
          onClick={() => setShowToggle(false)}
          to="/e-course"
        >
          <RiSlideshow4Fill />
          <b>E-Achaa сургалт</b>
        </NavLink>

        <button
          className="user__menu-nav-item"
          onClick={() => {
            setShowCubic(true);
          }}
        >
          <RiCalculatorFill />
          <b>Тээврийн тооцоолол</b>
        </button>
        <CubicmeterModal
          visible={showCubic}
          onCancel={() => setShowCubic(false)}
        />

        <NavLink
          className={(navData) =>
            `user__menu-nav-item ${
              navData.isActive && "user__menu-nav-item--active"
            } 
            ${
              navData.isActive &&
              isToggle &&
              "user__menu-nav-item--active--toggle"
            }
            ${confirm || "user__menu-nav-item--disable"}`
          }
          onClick={() => setShowToggle(false)}
          to={confirm ? `${startPath}/sent-requests` : "#"}
        >
          <RiMailSendFill />
          <b>Илгээгдсэн ачаа барааны хүсэлт</b>
        </NavLink>

        <NavLink
          className={(navData) =>
            `user__menu-nav-item ${
              navData.isActive && "user__menu-nav-item--active"
            } 
            ${
              navData.isActive &&
              isToggle &&
              "user__menu-nav-item--active--toggle"
            }
            ${confirm || "user__menu-nav-item--disable"}`
          }
          onClick={() => setShowToggle(false)}
          to={confirm ? `${startPath}/united-info` : "#"}
        >
          <RiFridgeFill />
          <b>Мэдээллийн нэгдсэн сан</b>
        </NavLink>

        <NavLink
          className={(navData) =>
            `user__menu-nav-item ${
              navData.isActive && "user__menu-nav-item--active"
            } 
            ${
              navData.isActive &&
              isToggle &&
              "user__menu-nav-item--active--toggle"
            }
            ${confirm || "user__menu-nav-item--disable"}`
          }
          onClick={() => setShowToggle(false)}
          to={confirm ? `${startPath}/invoices-list` : "#"}
        >
          <RiFileTextFill />
          <b>Ирсэн нэхэмжлэлийн жагсаалт</b>
        </NavLink>

        <NavLink
          className={(navData) =>
            `user__menu-nav-item ${
              navData.isActive && "user__menu-nav-item--active"
            } 
            ${
              navData.isActive &&
              isToggle &&
              "user__menu-nav-item--active--toggle"
            }
            ${confirm || "user__menu-nav-item--disable"}`
          }
          onClick={() => setShowToggle(false)}
          to={confirm ? `${startPath}/price-offers` : "#"}
        >
          <RiCurrencyFill />
          <b>Ирсэн үнийн саналууд</b>
        </NavLink>

        <button className="user__menu-nav-signoutBtn" onClick={signoutOnClick}>
          <b>Системээс гарах</b>
        </button>

        <Modal
          visible={alertVisible}
          type="alert"
          text="Та гарахдаа итгэлтэй байна уу?"
          onOk={modalHandleOK}
          onCancel={modalHandeleCancel}
        />
      </div>
    );
  };

  return (
    <div className="user">
      <div
        className={`user--drawerToggle ${
          isToggleTop ? "user--drawerToggle--top" : ""
        }`}
      >
        <button
          className="user--drawerToggle-btn"
          onClick={() => setShowToggle(true)}
        >
          <RiMenuUnfoldFill />
        </button>

        <UserToggle
          visible={showToggle}
          renderMenu={renderMenu}
          onCancel={() => setShowToggle(false)}
        />
      </div>

      <div className="user__menu">
        <div className="user__menu-heading">
          <img
            className="user__menu-heading-avatar"
            src={image ? image : NoImage}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = NoFile;
            }}
          />

          <div className="user__menu-heading-tag">
            <label className="user__menu-heading-tag-label">
              Хэрэглэгчийн нэр:
            </label>
            <p className="user__menu-heading-tag-text">
              {String(lastname).charAt(0) + ". " + firstname}
            </p>

            <label className="user__menu-heading-tag-label">
              Хэрэглэгчийн код:
            </label>
            <p className="user__menu-heading-tag-text">{user_code}</p>

            <label className="user__menu-heading-tag-label">
              Эрхийн төрөл:
            </label>
            <p className="user__menu-heading-tag-text">{getMemberType()}</p>
          </div>
        </div>

        {renderMenu()}
      </div>

      <img className="user__banner" src={banner} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} />

      <div className="user__content">
        <Routes>
          <Route path="/" element={<Navigate to={`${startPath}/pack`} />} />

          <Route
            path="/pack"
            element={
              confirm ? (
                <ConfirmedUser />
              ) : (
                <EnableMembership id={id} membership={membership} />
              )
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sent-requests" element={<SentRequests />} />
          <Route path="/united-info" element={<UnitedInfos />} />
          <Route path="/invoices-list" element={<InvoicesList />} />
          <Route path="/price-offers" element={<PriceOffers />} />
        </Routes>
      </div>
    </div>
  );
};

export default User;
