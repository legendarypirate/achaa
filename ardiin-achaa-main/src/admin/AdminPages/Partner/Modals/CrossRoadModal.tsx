// @ts-nocheck
import React, { useEffect, useState } from "react";
import Axios from "../../../../Axios";
import Modal from "../../../../tools/Modal/Modal";
import FileUploader from "../../../AdminTools/FileUploader/FileUploader";


const CrossRoadModal = ({ id, visible, onCancel }) => {
  const [data, setData] = useState({});
  const [transImgFile, setTransImgFile] = useState();
  const [insurance, setInsurance] = useState([]);

  useEffect(() => {
    if (id) {
      Axios.get(`/partnerCrossRoad/getByID/${id}`).then((res) => {
        setData(res.data);
      });
    } else {
      setData({});
    }
  }, [id]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const insuranceCheckedOnChange = (e) => {
    setInsurance((val) => [...val, e.target.value]);
  };

  const saveOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("imageFile", transImgFile);

    if (insurance.length > 0) {
      formData.append("insurance", [JSON.stringify(insurance)]);
    }

    for (const [key, value] of Object.entries(data)) {
      if (key === "insurance") {
        formData.append("", "");
      } else {
        formData.append(`${key}`, [value ? value : 0]);
      }
    }

    Axios.post("/partnerCrossRoad/update", formData).then((res) => {
      if (res.data.message === "success") {
        alert("Амжилттай хадгалагдлаа.");
        window.location.reload();
      } else {
        alert("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
        window.location.reload();
      }
    });
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
        <div key={index} className="partnerModals__content-insurance-item">
          {item.val}
          <input
            name="insurance"
            type="checkbox"
            value={item.val}
            onChange={insuranceCheckedOnChange}
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
    <Modal visible={visible} onCancel={onCancel}>
      <form className="partnerModals" onSubmit={saveOnClick}>
        <h2 className="partnerModals__heading">Улс, хот хоорондын</h2>

        <div className="partnerModals__content">
          <b className="partnerModals__content-title">Ажилтны мэдээлэл</b>
          <div className="partnerModals__content-card">
            <div className="partnerModals__content-card-input">
              Овог
              <input
                name="lastname"
                defaultValue={data.lastname}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="partnerModals__content-card-input">
              Нэр
              <input
                name="firstname"
                defaultValue={data.firstname}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="partnerModals__content-card-input">
              Утас
              <input
                name="phone_number"
                type="number"
                defaultValue={data.phone_number}
                min={11111111}
                max={99999999}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="partnerModals__content-card-input">
              Цахим шуудан
              <input
                name="admin_email"
                type="email"
                defaultValue={data.admin_email}
                onChange={onChangeHandler}
                required
              />
            </div>
          </div>

          <b className="partnerModals__content-title">Тээврийн мэдээлэл</b>
          <div className="partnerModals__content-insurance">
            <b className="partnerModals__content-title" about="subtitle">
              Даатгал
            </b>

            {renderInsurances()}
          </div>

          <b className="partnerModals__content-title" about="subtitle">
            Улсын дугаар
          </b>
          <div className="partnerModals__content-card">
            <div className="partnerModals__content-card-input">
              Толгойн дугаар
              <input
                name="head_number"
                type="number"
                defaultValue={data.head_number}
                onChange={onChangeHandler}
              />
            </div>

            <div className="partnerModals__content-card-input">
              Чиргүүлийн дугаар
              <input
                name="ass_number"
                type="number"
                defaultValue={data.ass_number}
                onChange={onChangeHandler}
              />
            </div>

            <div className="partnerModals__content-card-input">
              Тээврийн марк
              <input
                name="trans_mark"
                defaultValue={data.trans_mark}
                onChange={onChangeHandler}
              />
            </div>

            <div className="partnerModals__content-card-input">
              Тээврийн хэрэгслийн төрөл
              <select
                name="trans_type"
                value={data.trans_type}
                onChange={onChangeHandler}
              >
                {renderTypeOptions()}
              </select>
            </div>

            <div className="partnerModals__content-card-input">
              Даац(тн)
              <select
                name="tonnage"
                value={data.tonnage}
                onChange={onChangeHandler}
              >
                {renderTonnageOptions()}
              </select>
            </div>

            <div className="partnerModals__content-card-input">
              Багтаамж
              <div>
                <input
                  name="storage"
                  about="sizes"
                  type="number"
                  defaultValue={data.storage}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div className="partnerModals__content-card-input">
              Чиргүүлийн урт
              <div>
                <input
                  name="ass_length"
                  about="sizes"
                  type="number"
                  defaultValue={data.ass_length}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div className="partnerModals__content-card-input">
              Чиргүүлийн өргөн
              <div>
                <input
                  name="ass_width"
                  about="sizes"
                  type="number"
                  defaultValue={data.ass_width}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>

          <b className="partnerModals__content-title">
            Тээврийн хэрэгслийн зураг
          </b>
          <FileUploader
            file={data.trans_image}
            getFile={setTransImgFile}
            imgWidth="20rem"
          />

          <b className="partnerModals__content-title">
            Тээврийн хэрэгслийн чиглэл
          </b>
          <div className="partnerModals__content-card">
            <div className="partnerModals__content-card-zoneInput">
              Эхлэх цэг
              <input
                name="start_zone"
                defaultValue={data.start_zone}
                onChange={onChangeHandler}
              />
            </div>
            <div className="partnerModals__content-card-zoneInput">
              Дамжих цэг
              <input
                name="passed_zone"
                defaultValue={data.passed_zone}
                onChange={onChangeHandler}
              />
            </div>
            <div className="partnerModals__content-card-zoneInput">
              Хүрэх цэг
              <input
                name="end_zone"
                defaultValue={data.end_zone}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div className="partnerModals__content-card-textarea">
            Нэмэлт мэдээлэл
            <textarea
              rows={4}
              name="addition"
              defaultValue={data.addition}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        <button className="partnerModals__saveBtn" type="submit">
          Хадгалах
        </button>
      </form>
    </Modal>
  );
};

export default CrossRoadModal;
