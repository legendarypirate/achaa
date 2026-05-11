// @ts-nocheck
import React, { useState } from "react";
import Input from "../../tools/Input/Input";

const OnlineShop = ({
  setSubInputsCount,
  getData,
  getSubPhoneValidation,
  getSubMailValidation,
}) => {
  setSubInputsCount(7);

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

  return (
    <>
      <b className="partnerRegister__content-title">
        Онлайн дэлгүүрийн мэдээлэл
      </b>
      <div className="partnerRegister__content-card">
        <div className="partnerRegister__content-card-input">
          Нэр
          <Input name="name" onChange={onChangeHandler} />
        </div>

        <div className="partnerRegister__content-card-input">
          Page, Group, Web холбоос
          <Input name="web" onChange={onChangeHandler} />
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
          Агуулахын хэмжээ
          <Input
            name="online_storage"
            about="sizes"
            type="number"
            onChange={onChangeHandler}
          />
        </div>

        <div className="partnerRegister__content-card-input">
          Үйл ажиллагаа явуулсан хугацаа
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <Input
              name="online_activity"
              about="sizes"
              type="number"
              onChange={onChangeHandler}
            />
            хоног
          </span>
        </div>
      </div>

      <div className="partnerRegister__content-card-textarea">
        Нэмэлт мэдээлэл
        <textarea rows={4} name="addition" onChange={onChangeHandler} />
      </div>
    </>
  );
};

export default OnlineShop;
