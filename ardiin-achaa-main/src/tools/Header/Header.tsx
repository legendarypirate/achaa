// @ts-nocheck
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiSearch, BiMenu } from "react-icons/bi";

import Axios from "../../Axios";
import { TRANSPARENT_PIXEL_GIF } from "../../constants/media";
import Logo from "../../assets/logo.png";
import Modal from "../Modal/Modal";
import HeaderDrawerToggle from "./HeaderDrawerToggle/HeaderDrawerToggle";
import SignUpModal from "./SignUpModal/SignUpModal";
import LoginModal from "./LoginModal/LoginModal";
import BaggageModal from "../../components/UserComp/BaggageModal/BaggageModal";

const FALLBACK_LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg";


const Header = ({ userID, auth }) => {
  const [loading, setLoading] = useState(true);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [membership, setMembership] = useState(0);
  const [confirm, setConfirm] = useState(false);

  const [visibleAlert, setVisibleAlert] = useState(false);

  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleSignup, setVisibleSignup] = useState(false);
  const [visibleRigisterPack, setVisibleRigisterPack] = useState(false);
  const [visibleMessage, setVisibleMessage] = useState(false);
  const [visiblePackMsg, setVisiblePackMsg] = useState(false);

  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    if (auth) {
      Axios.get(`/accounts/getByID/${userID}`).then((res) => {
        const { data } = res;

        setFirstname(data.firstname);
        setLastname(data.lastname);
        setMembership(data.membership);
        setConfirm(data.confirm);

        const today = moment().format("YYYY-MM-DD");
        const expired = moment(data.expired_date);

        const minus = expired.diff(today, "days");
        if (minus < 0) {
          Axios.post("/accounts/finishExpired/", { userID }).then((res) => {
            if (res.data.message === "success") {
              setVisibleAlert(true);
            }
          });
        }
      });
    }

    const TIMER = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(TIMER);
  }, [userID, auth]);

  const membershipChecker = () => {
    let star = null;

    if (confirm) {
      switch (membership) {
        case 1:
          star = (
            <>
              <AiFillStar color="orange" size={18} />
              <AiOutlineStar color="gray" size={18} />
              <AiOutlineStar color="gray" size={18} />
            </>
          );
          break;
        case 2:
          star = (
            <>
              <AiFillStar color="orange" size={18} />
              <AiFillStar color="orange" size={18} />
              <AiOutlineStar color="gray" size={18} />
            </>
          );
          break;
        case 3:
          star = (
            <>
              <AiFillStar color="orange" size={18} />
              <AiFillStar color="orange" size={18} />
              <AiFillStar color="orange" size={18} />
            </>
          );
          break;
        default:
          star = (
            <>
              <AiOutlineStar color="gray" size={18} />
              <AiOutlineStar color="gray" size={18} />
              <AiOutlineStar color="gray" size={18} />
            </>
          );
      }
    } else {
      star = (
        <>
          <AiOutlineStar color="gray" size={18} />
          <AiOutlineStar color="gray" size={18} />
          <AiOutlineStar color="gray" size={18} />
        </>
      );
    }

    return (
      <div
        className="header__top-info"
        onClick={() => window.location.replace(`/user/${userID}`)}
      >
        <p className="header__top-info-name">
          {String(lastname).charAt(0) + ". " + firstname}
        </p>

        {star}
      </div>
    );
  };

  const registerPack = () => {
    if (auth) {
      setVisibleRigisterPack(true);
    } else {
      setVisiblePackMsg(true);
    }
  };

  const renderTopHeading = () => {
    if (!loading) {
      if (auth) {
        return membershipChecker();
      } else {
        return (
          <>
            <button
              onClick={() => {
                setVisibleLogin(true);
              }}
              className="header__top-button"
              to="/login"
            >
              Нэвтрэх
            </button>
            <p>/</p>
            <button
              onClick={() => setVisibleSignup(true)}
              className="header__top-button"
            >
              Бүртгүүлэх
            </button>
          </>
        );
      }
    }
  };

  return (
    <header className="header">
      <Modal
        type="error"
        text="Таны эрх дууссан байна."
        visible={visibleAlert}
        onOk={() => window.location.reload()}
      />

      <LoginModal
        visible={visibleLogin}
        onCancel={() => setVisibleLogin(false)}
        setSignupVisible={setVisibleSignup}
      />
      <SignUpModal
        visible={visibleSignup}
        onCancel={() => setVisibleSignup(false)}
        setMsgVisible={setVisibleMessage}
      />

      <Modal
        visible={visiblePackMsg}
        type="error"
        text="Та нэвтэрч орсны дараа ачаагаа бүртгүүлнэ үү!"
        onOk={() => setVisiblePackMsg(false)}
      />

      <Modal
        visible={visibleMessage}
        onCancel={() => setVisibleMessage(false)}
        disableCloseBtn
      >
        <div className="signupSuccess">
          <BsFillCheckCircleFill size={56} color="#16a34a" />
          <div className="signupSuccess-text">АМЖИЛТТАЙ БҮРТГҮҮЛЛЭЭ</div>

          <button
            className="signupSuccess-loginBtn"
            onClick={() => {
              setVisibleMessage(false);
              setVisibleLogin(true);
            }}
          >
            Нэвтрэх
          </button>
        </div>
      </Modal>

      <div className="header__topContainer">
        <div className="header__top">
          <div className="header__top-search">
            <BiSearch />
          </div>

          {renderTopHeading()}
        </div>
      </div>

      <div className="header__downContainer">
        <div className="header__down">
          <Link to="/" className="header__down-brand">
            <img
              src={Logo}
              className="header__down-logo"
              alt="E-Achaa"
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
          </Link>

          <nav className="header__down-links" aria-label="Үндсэн цэс">
            <NavLink
              end
              to="/"
              className={({ isActive }) =>
                `header__down-links-item${isActive ? " header__down-links-item--active" : ""}`
              }
            >
              Нүүр хуудас
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `header__down-links-item${isActive ? " header__down-links-item--active" : ""}`
              }
            >
              Бидний тухай
            </NavLink>
            <NavLink
              to="/e-course"
              className={({ isActive }) =>
                `header__down-links-item${isActive ? " header__down-links-item--active" : ""}`
              }
            >
              E-Achaa академи
            </NavLink>
            <NavLink
              to="/news/1"
              className={({ isActive }) =>
                `header__down-links-item${isActive ? " header__down-links-item--active" : ""}`
              }
            >
              Зар мэдээ мэдээлэл
            </NavLink>
            <NavLink
              to="/publicity"
              className={({ isActive }) =>
                `header__down-links-item${isActive ? " header__down-links-item--active" : ""}`
              }
            >
              Ил тод байдал
            </NavLink>

            <button
              className="header__down-links-button"
              onClick={registerPack}
            >
              Ачаа бүртгүүлэх
            </button>

            <BaggageModal
              account_id={userID}
              visible={visibleRigisterPack}
              onCancel={() => setVisibleRigisterPack(false)}
            />
          </nav>

          <div className="header__drawerToggle">
            <button
              className="header__drawerToggle-btn"
              onClick={() => setShowToggle(true)}
            >
              <BiMenu className="header__drawerToggle-icon" />
            </button>

            <HeaderDrawerToggle
              visible={showToggle}
              onCancel={() => setShowToggle(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    userID: state.auth.userID,
    auth: state.auth.authenticate,
    isLoading: state.auth.isLoading,
  };
};

export default connect(mapStateToProps)(Header);
