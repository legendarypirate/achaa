// @ts-nocheck
import React, { useState } from "react";
import Input from "../../tools/Input/Input";

const AirTrans = ({
  setSubInputsCount,
  getData,
  getSubPhoneValidation,
  getSubMailValidation,
  getAirTransCompany,
  getTransType,
  getAirPackType,
}) => {
  setSubInputsCount(13);

  const [phoneValidation, setPhoneValidation] = useState(false);
  const [mailValidation, setMailValidation] = useState(false);

  const onChangeHandler = (e) => {
    getData(e);

    if (e.target.name === "phone") {
      phoneNumberChecker(e.target.value);
    }

    if (e.target.name === "email") {
      emailChecker(e.target.value);
    }
  };

  const phoneNumberChecker = (phone_number) => {
    if (phone_number >= 10000000 && phone_number <= 99999999) {
      setPhoneValidation(false);
      getSubPhoneValidation(false);
    } else if (!phone_number) {
      setPhoneValidation(false);
      getSubPhoneValidation(false);
    } else {
      setPhoneValidation(true);
      getSubPhoneValidation(true);
    }
  };

  const emailChecker = (email) => {
    if (email) {
      if (String(email).search("@") > -1) {
        setMailValidation(false);
        getSubMailValidation(false);

        return true;
      } else {
        setMailValidation(true);
        getSubMailValidation(true);

        return false;
      }
    } else {
      return false;
    }
  };

  const renderTransCompanies = () => {
    let checkBoxes = null;

    const items = [
      { val: "MIAT" },
      { val: "KOREAN AIR" },
      { val: "TURKISH AIRLINES" },
      { val: "AEROFLOT" },
      { val: "AIR CHINA" },
    ];

    checkBoxes = items.map((item, index) => {
      return (
        <div key={index} className="partnerRegister__content-checkBox-item">
          <input
            name="air_trans_company"
            type="checkbox"
            value={item.val}
            onChange={(e) => {
              getAirTransCompany((val) => [...val, e.target.value]);
              getData(e);
            }}
          />
          {item.val}
        </div>
      );
    });

    return checkBoxes;
  };

  const renderTransTypes = () => {
    let checkBoxes = null;

    const items = [
      { val: "Хоосон" },
      { val: "Байнгын бус" },
      { val: "Түрээсийн" },
      { val: "Нэмэлт" },
      { val: "Тусгай" },
    ];

    checkBoxes = items.map((item, index) => {
      return (
        <div key={index} className="partnerRegister__content-checkBox-item">
          <input
            name="trans_type"
            type="checkbox"
            value={item.val}
            onChange={(e) => {
              getTransType((val) => [...val, e.target.value]);
              getData(e);
            }}
          />
          {item.val}
        </div>
      );
    });

    return checkBoxes;
  };

  const renderPackTypes = () => {
    let checkBoxes = null;

    const items = [
      { val: "Авто машин сэлбэг" },
      { val: "Ахуйн бараа" },
      { val: "Барилгын материал" },
      { val: "Бичиг баримт бүрдүүлэх бараа" },
      { val: "Жижиг ачаа" },
      { val: "Техник, тоног төхөөрөмж" },
      { val: "Тусгай баглаа боодолт бараа" },
      { val: "Түргэн муудах бараа" },
      { val: "Үнэт ачаа" },
      { val: "Химийн ачаа, хорт бодис" },
      { val: "Хүнс, ХАА бараа" },
      { val: "Цахилгаан бараа" },
      { val: "Эм, эмнэлэгийн хэрэгсэл" },
      { val: "Эмзэг бараа" },
    ];

    checkBoxes = items.map((item, index) => {
      return (
        <div key={index} className="partnerRegister__content-checkBox-item">
          <input
            name="air_pack_type"
            type="checkbox"
            value={item.val}
            onChange={(e) => {
              getAirPackType((val) => [...val, e.target.value]);
              getData(e);
            }}
          />
          {item.val}
        </div>
      );
    });

    return checkBoxes;
  };

  return (
    <>
      <b className="partnerRegister__content-title">Компанийн мэдээлэл</b>
      <div className="partnerRegister__content-card">
        <div className="partnerRegister__content-card-input">
          Нэр
          <Input name="name" onChange={onChangeHandler} />
        </div>

        <div className="partnerRegister__content-card-input">
          Байгууллагын регистер
          <Input
            name="company_register"
            type="number"
            onChange={onChangeHandler}
          />
        </div>

        <div className="partnerRegister__content-card-input">
          Утас
          <Input
            name="phone"
            type="number"
            onChange={onChangeHandler}
            validation={phoneValidation}
          />
        </div>

        <div className="partnerRegister__content-card-input">
          Цахим шуудан
          <Input
            name="email"
            onChange={onChangeHandler}
            validation={mailValidation}
          />
        </div>

        <div className="partnerRegister__content-card-input">
          Вэб сайт
          <Input name="web" onChange={onChangeHandler} />
        </div>

        <div className="partnerRegister__content-card-input">
          Хаяг
          <Input name="address" onChange={onChangeHandler} />
        </div>

        <div className="partnerRegister__content-card-input">
          Нислэгийн дугаар
          <Input name="trans_number" type="number" onChange={onChangeHandler} />
        </div>
      </div>

      <b className="partnerRegister__content-title">Тээвэр хийх компани</b>
      <div className="partnerRegister__content-checkBox">
        {renderTransCompanies()}
      </div>

      <b className="partnerRegister__content-title">
        Тээврийн хэрэгслийн чиглэл
      </b>
      <div className="partnerRegister__content-card">
        <div className="partnerRegister__content-card-zoneInput">
          Эхлэх цэг
          <Input name="start_zone" onChange={onChangeHandler} />
        </div>
        <div className="partnerRegister__content-card-zoneInput">
          Дамжих цэг
          <Input name="passed_zone" onChange={onChangeHandler} />
        </div>
        <div className="partnerRegister__content-card-zoneInput">
          Хүрэх цэг
          <Input name="end_zone" onChange={onChangeHandler} />
        </div>
      </div>

      <b className="partnerRegister__content-title">Тээвэрлэлтийн төрөл</b>
      <div className="partnerRegister__content-checkBox">
        {renderTransTypes()}
      </div>

      <b className="partnerRegister__content-title">Ачих ачааны төрөл</b>
      <div className="partnerRegister__content-packType">
        {renderPackTypes()}
      </div>
    </>
  );
};

export default AirTrans;
