// @ts-nocheck
import React from "react";
import FileUploader from "../../admin/AdminTools/FileUploader/FileUploader";
import Input from "../../tools/Input/Input";

const CrossRoad = ({
  setSubInputsCount,
  getData,
  getInsurance,
  getTransType,
  getTransImgFile,
}) => {
  setSubInputsCount(13);

  const onChangeHandler = (e) => {
    getData(e);
  };

  const renderInsurances = () => {
    let checkBoxes = null;

    const items = [
      { val: "Жолоочийн хариуцлагын даатгал" },
      { val: "Тээврийн хэрэгслийн даатгал" },
      { val: "Мэргэшсэн жолоочийн даатгал" },
      { val: "Чиргүүлийн даатгал" },
    ];

    checkBoxes = items.map((item, index) => {
      return (
        <div className="partnerRegister__content-insurance-item">
          {item.val}
          <input
            name="insurance"
            type="checkbox"
            value={item.val}
            onChange={(e) => {
              getInsurance((val) => [...val, e.target.value]);
              getData(e);
            }}
          />
        </div>
      );
    });

    return checkBoxes;
  };

  const renderTypeOptions = () => {
    let options = null;

    const items = [
      { type: "Сонгох..." },
      { type: "Тэвштэй" },
      { type: "Бүхээгтэй" },
      { type: "Хөргүүртэй" },
      { type: "Технологийн " },
      { type: "Крантай" },
      { type: "Мал амьтан тээвэрлэх" },
      { type: "Өөрөө буулгагч" },
      { type: "Тавцан нам даралттай" },
      { type: "Цистерн" },
      { type: "Түлш бензин тээвэрлэх" },
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

  const renderTonnageOptions = () => {
    let options = null;

    const items = [
      { type: "Сонгох..." },
      { type: "1тонн хүртэл" },
      { type: "2тн хүртэл" },
      { type: "3тн хүртэл" },
      { type: "4-5тн хүртэл" },
      { type: "10-20тн хүртэл " },
      { type: "21-30тн хүртэл" },
      { type: "31-40тн хүртэл" },
      { type: "41-50тн хүртэл" },
      { type: "51-70тн хүртэл" },
      { type: "71-90тн хүртэл" },
      { type: "91-100тн хүртэл" },
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
      <b className="partnerRegister__content-title">Тээврийн мэдээлэл</b>
      <div className="partnerRegister__content-insurance">
        <b className="partnerRegister__content-title" about="subtitle">
          Даатгал
        </b>

        {renderInsurances()}
      </div>

      <b className="partnerRegister__content-title" about="subtitle">
        Улсын дугаар
      </b>
      <div className="partnerRegister__content-card">
        <div className="partnerRegister__content-card-input">
          Толгойн дугаар
          <Input name="head_number" type="number" onChange={onChangeHandler} />
        </div>

        <div className="partnerRegister__content-card-input">
          Чиргүүлийн дугаар
          <Input name="ass_number" type="number" onChange={onChangeHandler} />
        </div>

        <div className="partnerRegister__content-card-input">
          Тээврийн марк
          <Input name="trans_mark" onChange={onChangeHandler} />
        </div>

        <div className="partnerRegister__content-card-input">
          Тээврийн хэрэгслийн төрөл
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

        <div className="partnerRegister__content-card-input">
          Даац(тн)
          <select name="tonnage" onChange={onChangeHandler}>
            {renderTonnageOptions()}
          </select>
        </div>

        <div className="partnerRegister__content-card-input">
          Багтаамж
          <Input
            name="storage"
            about="sizes"
            type="number"
            onChange={onChangeHandler}
          />
        </div>

        <div className="partnerRegister__content-card-input">
          Чиргүүлийн урт
          <Input
            name="ass_length"
            about="sizes"
            type="number"
            onChange={onChangeHandler}
          />
        </div>

        <div className="partnerRegister__content-card-input">
          Чиргүүлийн өргөн
          <Input
            name="ass_width"
            about="sizes"
            type="number"
            onChange={onChangeHandler}
          />
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

export default CrossRoad;
