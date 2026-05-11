// @ts-nocheck
import React, { useState } from "react";
import FileUploader from "../../admin/AdminTools/FileUploader/FileUploader";
import Input from "../../tools/Input/Input";

const TransPimp = ({
  setSubInputsCount,
  getData,
  getSubPhoneValidation,
  getSubMailValidation,
  getCerFile,
  getSuggestService,
}) => {
  setSubInputsCount(9);

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
      } else {
        setMailValidation(true);
        getSubMailValidation(true);
      }
    } else {
      setMailValidation(true);
      getSubMailValidation(true);
    }
  };

  const renderCheckBoxes = () => {
    let checkBoxes = null;

    const items = [
      { val: "Гаалийн мэдүүлэг" },
      { val: "Экспорт импортын бичиг баримт" },
      { val: "Баглаа боодол" },
      { val: "Агуулах" },
      { val: "Хаяг дээр нь очиж авах, хүргэх" },
      { val: "Даатгал" },
    ];

    checkBoxes = items.map((item, index) => {
      return (
        <div key={index} className="partnerRegister__content-checkBox-item">
          <input
            name="suggest_service"
            type="checkbox"
            value={item.val}
            onChange={(e) => {
              getSuggestService((val) => [...val, e.target.value]);
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
          Тусгай зөвшөөрөл авсан огноо
          <Input
            name="certificate_date"
            type="date"
            onChange={onChangeHandler}
          />
        </div>

        <div className="partnerRegister__content-card-input">
          Тусгай зөвшөөрлийн гэрчилгээ
          <FileUploader getFile={getCerFile} />
        </div>
      </div>

      <b className="partnerRegister__content-title" about="service">
        Танайхаас санал болгох үйлчилгээг сонгоно уу?
      </b>
      <div className="partnerRegister__content-checkBox">
        {renderCheckBoxes()}
      </div>

      <div className="partnerRegister__content-card-textarea">
        Нэмэлт мэдээлэл
        <textarea rows={4} name="addition" onChange={onChangeHandler} />
      </div>
    </>
  );
};

export default TransPimp;
