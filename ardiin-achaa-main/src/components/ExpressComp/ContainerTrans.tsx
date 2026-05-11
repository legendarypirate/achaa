// @ts-nocheck
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FileUploader from "../../admin/AdminTools/FileUploader/FileUploader";
import Input from "../../tools/Input/Input";

const ContainerTrans = ({
  setSubInputsCount,
  getData,
  getSubPhoneValidation,
  getSubMailValidation,
  getTransType,
  getTransImgFile,
}) => {
  const { type } = useParams();

  if (type === "company") {
    setSubInputsCount(10);
  } else if (type === "person") {
    setSubInputsCount(6);
  }

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

  const renderTypeOptions = () => {
    let options = null;

    const items = [
      { type: "Сонгох..." },
      { type: "Стандарт чингэлэг 40, 20тн" },
      { type: "Стандарт чингэлэг" },
      { type: "Өндөр их эзэлхүүнт чингэлэг 40тн, 45тн" },
      { type: "Эвхэгддэг ханатай хавтгай чингэлэг 40, 20тн" },
      { type: "Нэмэлт дээвэр нээлттэй тагтай чингэлэг 40, 20тн" },
      { type: "Хөргүүрт чингэлэг 40, 20тн" },
      { type: "Суурь чингэлэг 40, 20тн" },
      { type: "Танк ба савны чингэлэг 20тн" },
      { type: "Тагт чингэлэг 20тн" },
      { type: "Ventilated буюу агааржуулах чингэлэг 20тн" },
      { type: "Доторлогоот чингэлэг 20тн" },
    ];

    options = items.map((item, index) => {
      return (
        <option key={index} value={item.val === "Сонгох..." ? "" : item.val}>
          {item.type}
        </option>
      );
    });

    return options;
  };

  return (
    <>
      {type === "company" && (
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
          </div>
        </>
      )}

      <b className="partnerRegister__content-title">Тээврийн мэдээлэл</b>
      <div className="partnerRegister__content-card">
        <div className="partnerRegister__content-card-input">
          Чингэлгийн дугаар
          <Input name="trans_number" type="number" onChange={onChangeHandler} />
        </div>

        <div className="partnerRegister__content-card-input">
          Чингэлэг тээвэрлэлтийн төрөл
          <select
            name="trans_type"
            onChange={(e) => {
              getTransType((val) => [...val, e.target.value]);
              getData(e);
            }}
          >
            {renderTypeOptions()}
          </select>
        </div>
      </div>

      <b className="partnerRegister__content-title">
        Тээврийн хэрэгслийн зураг
      </b>
      <FileUploader getFile={getTransImgFile} />

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

      <div className="partnerRegister__content-card-textarea">
        Нэмэлт мэдээлэл
        <textarea rows={4} name="addition" onChange={onChangeHandler} />
      </div>
    </>
  );
};

export default ContainerTrans;
