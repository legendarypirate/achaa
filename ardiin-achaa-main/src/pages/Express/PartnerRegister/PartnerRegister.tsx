// @ts-nocheck
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Helper from "../../../assets/helper.png";
import Axios from "../../../Axios";
import { staticAssetUrl } from "../../../utils/staticAssetUrl";
import Modal from "../../../tools/Modal/Modal";
import Input from "../../../tools/Input/Input";

import TransPimp from "../../../components/ExpressComp/TransPimp";
import ContainerTrans from "../../../components/ExpressComp/ContainerTrans";
import TrainTrans from "../../../components/ExpressComp/TrainTrans";
import OnlineShop from "../../../components/ExpressComp/OnlineShop";
import AirTrans from "../../../components/ExpressComp/AirTrans";
import CrossRoad from "../../../components/ExpressComp/CrossRoad";


const PartnerRegister = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({});
  const [data, setData] = useState({});

  /*-----SUB INFO----------------------------------------------------------*/
  const [cerFile, setCerFile] = useState();
  const [transImgFile, setTransImgFile] = useState();
  const [transType, setTransType] = useState([]);

  const [subInputsCount, setSubInputsCount] = useState(0);
  const [subPhoneValidation, setSubPhoneValidation] = useState(false);
  const [subMailValidation, setSubMailValidation] = useState(false);

  const [suggestService, setSuggestService] = useState([]); //TransPimp

  const [airTransCompany, setAirTransCompany] = useState([]); //AirTrans//AirTrans
  const [airPackType, setAirPackType] = useState([]); //AirTrans

  const [insurance, setInsurance] = useState([]); //CrossRoad
  /*-----------------------------------------------------------------------*/

  const [phoneValidation, setPhoneValidation] = useState(false);
  const [mailValidation, setMailValidation] = useState(false);

  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [someError, setSomeError] = useState(false);

  let title = "";
  let comp = null;
  switch (id) {
    case "1":
      title = "Тээвэр зууч бүртгүүлэх";
      comp = (
        <TransPimp
          setSubInputsCount={setSubInputsCount}
          getData={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          getSubPhoneValidation={setSubPhoneValidation}
          getSubMailValidation={setSubMailValidation}
          getCerFile={setCerFile}
          getSuggestService={setSuggestService}
        />
      );
      break;
    case "2":
      title = "Чингэлэг тээвэр бүртгүүлэх";
      comp = (
        <ContainerTrans
          setSubInputsCount={setSubInputsCount}
          getData={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          getSubPhoneValidation={setSubPhoneValidation}
          getSubMailValidation={setSubMailValidation}
          getTransType={setTransType}
          getTransImgFile={setTransImgFile}
        />
      );
      break;
    case "3":
      title = "Вагон тээвэр бүртгүүлэх";
      comp = (
        <TrainTrans
          setSubInputsCount={setSubInputsCount}
          getData={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          getSubPhoneValidation={setSubPhoneValidation}
          getSubMailValidation={setSubMailValidation}
          getTransImgFile={setTransImgFile}
        />
      );
      break;
    case "4":
      title = "Онлайн дэлгүүр бүртгүүлэх";
      comp = (
        <OnlineShop
          setSubInputsCount={setSubInputsCount}
          getData={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          getSubPhoneValidation={setSubPhoneValidation}
          getSubMailValidation={setSubMailValidation}
        />
      );
      break;
    case "5":
      title = "Агаарын тээвэр бүртгүүлэх";
      comp = (
        <AirTrans
          setSubInputsCount={setSubInputsCount}
          getData={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          getSubPhoneValidation={setSubPhoneValidation}
          getSubMailValidation={setSubMailValidation}
          getAirTransCompany={setAirTransCompany}
          getTransType={setTransType}
          getAirPackType={setAirPackType}
        />
      );
      break;
    case "6":
      title = "Улс хоорондын тээвэрлэлт бүртгүүлэх";
      comp = (
        <CrossRoad
          setSubInputsCount={setSubInputsCount}
          getData={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          getInsurance={setInsurance}
          getTransType={setTransType}
          getTransImgFile={setTransImgFile}
        />
      );
      break;
    default:
      title = "";
  }

  const onChangeHandler = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });

    if (e.target.name === "aPhone_number") {
      phoneNumberChecker(e.target.value);
    }

    if (e.target.name === "aEmail") {
      emailChecker(e.target.value);
    }
  };

  const phoneNumberChecker = (phone_number) => {
    if (phone_number >= 10000000 && phone_number <= 99999999) {
      setPhoneValidation(false);
    } else if (!phone_number) {
      setPhoneValidation(false);
    } else {
      setPhoneValidation(true);
    }
  };

  const emailChecker = (email) => {
    if (email) {
      if (String(email).search("@") > -1) {
        setMailValidation(false);
      } else {
        setMailValidation(true);
      }
    } else {
      setMailValidation(true);
    }
  };

  const fullInputtedChecker = (obj, length) => {
    if (Object.keys(obj).length === length) {
      return true;
    } else {
      return false;
    }
  };

  const modalHandleOK = () => {
    if (someError === true) {
      window.location.reload();
    } else {
      if (messageType === "success") {
        window.location.replace("/");
      } else if (messageType === "error") {
        setMessageVisible(false);
      }
    }
  };

  const sendOnClick = () => {
    if (
      fullInputtedChecker(adminData, id === "6" ? 4 : 5) &&
      !mailValidation &&
      !phoneValidation &&
      fullInputtedChecker(data, subInputsCount) &&
      !subMailValidation &&
      !subPhoneValidation
    ) {
      const formData = new FormData();

      formData.append("express_type_id", [id]);
      formData.append("aLastname", [adminData.aLastname]);
      formData.append("aFirstname", [adminData.aFirstname]);
      formData.append("aPhone_number", [adminData.aPhone_number]);
      formData.append("aEmail", [adminData.aEmail]);
      formData.append("admin_position", [adminData.admin_position]);

      if (cerFile) {
        formData.append("imageFile", cerFile);
      }

      if (transImgFile) {
        formData.append("imageFile", transImgFile);
      }

      if (transType.length > 0) {
        formData.append("trans_type", [JSON.stringify(transType)]);
      }

      if (suggestService.length > 0) {
        formData.append("suggest_service", [JSON.stringify(suggestService)]);
      }

      if (airTransCompany.length > 0) {
        formData.append("air_trans_company", [JSON.stringify(airTransCompany)]);
      }

      if (airPackType.length > 0) {
        formData.append("air_pack_type", [JSON.stringify(airPackType)]);
      }

      if (insurance.length > 0) {
        formData.append("insurance", [JSON.stringify(insurance)]);
      }

      for (const [key, value] of Object.entries(data)) {
        if (
          key === "trans_type" ||
          key === "suggest_service" ||
          key === "air_trans_company" ||
          key === "air_pack_type" ||
          key === "insurance"
        ) {
          formData.append("", "");
        } else {
          formData.append(`${key}`, [value]);
        }
      }

      let URL = "";
      if (id === "6") {
        URL = "/partnerCrossRoad/insert";
      } else {
        URL = "/partner/insert";
      }

      Axios.post(URL, formData).then((res) => {
        if (res.data.message === "success") {
          setSomeError(false);

          setMessageType("success");
          setMessageText("Амжилттай хадгалагдлаа");
          setMessageVisible(true);
        } else {
          setSomeError(true);

          setMessageType("error");
          setMessageText("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
          setMessageVisible(true);
        }
      });
    } else {
      setSomeError(false);

      setMessageType("error");
      setMessageText("Та талбараа бүрэн зөв бөглөнө үү!");
      setMessageVisible(true);
    }
  };

  return (
    <div className="partnerRegister">
      <Modal
        type={messageType}
        text={messageText}
        visible={messageVisible}
        onOk={modalHandleOK}
      />

      <h3 className="partnerRegister__title">{title}</h3>

      <div className="partnerRegister__container">
        <div className="partnerRegister__content">
          <b className="partnerRegister__content-title">Ажилтны мэдээлэл</b>
          <div className="partnerRegister__content-card">
            <div className="partnerRegister__content-card-input">
              Овог
              <Input name="aLastname" onChange={onChangeHandler} />
            </div>

            <div className="partnerRegister__content-card-input">
              Нэр
              <Input name="aFirstname" onChange={onChangeHandler} />
            </div>

            <div className="partnerRegister__content-card-input">
              Утас
              <Input
                name="aPhone_number"
                type="number"
                onChange={onChangeHandler}
                validation={phoneValidation}
              />
            </div>

            <div className="partnerRegister__content-card-input">
              Цахим шуудан
              <Input
                name="aEmail"
                onChange={onChangeHandler}
                validation={mailValidation}
              />
            </div>

            {id === "6" || (
              <div className="partnerRegister__content-card-input">
                Албан тушаал
                <Input name="admin_position" onChange={onChangeHandler} />
              </div>
            )}
          </div>

          {comp}
        </div>

        <div className="partnerRegister__right">
          <div className="partnerRegister__right-help">
            <b className="partnerRegister__right-help-title">Тусламж хэсэг</b>

            <img
              src={staticAssetUrl(Helper)}
              alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
              className="partnerRegister__right-help-img"
            />

            <label className="partnerRegister__right-help-number">
              Утасны дугаар:
            </label>
            <label className="partnerRegister__right-help-number">
              +(976) 7533-6060
            </label>
            <label className="partnerRegister__right-help-number">
              +(976) 9300-0022
            </label>
          </div>

          <div className="partnerRegister__right-btnContainer">
            <button onClick={() => navigate(-1)}>Буцах</button>
            <button onClick={sendOnClick}>Илгээх</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegister;
