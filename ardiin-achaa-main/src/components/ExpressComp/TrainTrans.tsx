// @ts-nocheck
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FileUploader from "../../admin/AdminTools/FileUploader/FileUploader";
import Input from "../../tools/Input/Input";

const TrainTrans = ({
  setSubInputsCount,
  getData,
  getSubPhoneValidation,
  getSubMailValidation,
  getTransImgFile,
}) => {
  const { type } = useParams();

  if (type === "company") {
    setSubInputsCount(9);
  } else if (type === "person") {
    setSubInputsCount(5);
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
      { type: "Тавцан буюу чингэлэг" },
      { type: "Хагас задгай (166тн, 138м³)" },
      { type: "Криппио буюу битүү (164тн, 120м³)" },
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
          Вагоны дугаар
          <Input name="trans_number" type="number" onChange={onChangeHandler} />
        </div>

        <div className="partnerRegister__content-card-input">
          Вагоны тээвэрлэлтийн төрөл
          <select name="trans_type" onChange={onChangeHandler}>
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

export default TrainTrans;
