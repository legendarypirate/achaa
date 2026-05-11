// @ts-nocheck
import React, { useEffect, useState } from "react";
import moment from "moment";
import Axios from "../../../../Axios";
import Modal from "../../../../tools/Modal/Modal";
import FileUploader from "../../../AdminTools/FileUploader/FileUploader";


const TransPimpModal = ({ id, visible, onCancel }) => {
  const [data, setData] = useState({});
  const [cerFile, setCerFile] = useState();
  const [suggestService, setSuggestService] = useState([]);

  useEffect(() => {
    if (id) {
      Axios.get(`/partner/getByID/${id}`).then((res) => {
        setData(res.data);
      });
    } else {
      setData({});
    }
  }, [id]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const checkBoxCheckedOnChange = (e) => {
    setSuggestService((val) => [...val, e.target.value]);
  };

  const saveOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageFile", cerFile);

    if (suggestService.length > 0) {
      formData.append("suggest_service", [JSON.stringify(suggestService)]);
    }

    for (const [key, value] of Object.entries(data)) {
      if (key === "suggest_service") {
        formData.append("", "");
      } else {
        formData.append(`${key}`, [value ? value : 0]);
      }
    }

    Axios.post("/partner/update", formData).then((res) => {
      if (res.data.message === "success") {
        alert("Амжилттай хадгалагдлаа.");
        window.location.reload();
      } else {
        alert("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
        window.location.reload();
      }
    });
  };

  // const checkBoxCheckedHandler = (value) => {
  //   const arr = data.suggest_service?.map((item) => {
  //     if (item === value) {
  //       return "have";
  //     } else {
  //       return "haven't";
  //     }
  //   });

  //   if (arr && arr.find((i) => i === "have")) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

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
        <div key={index} className="partnerModals__content-checkBox-item">
          <input
            name="suggest_service"
            type="checkbox"
            value={item.val}
            // checked={checkBoxCheckedHandler(item.val)}
            onChange={checkBoxCheckedOnChange}
          />
          {item.val}
        </div>
      );
    });

    return checkBoxes;
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <form className="partnerModals" onSubmit={saveOnClick}>
        <h2 className="partnerModals__heading">{data.express_type}</h2>

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

            <div className="partnerModals__content-card-input">
              Албан тушаал
              <input
                name="admin_position"
                defaultValue={data.admin_position}
                onChange={onChangeHandler}
                required
              />
            </div>
          </div>

          <b className="partnerModals__content-title">Компанийн мэдээлэл</b>
          <div className="partnerModals__content-card">
            <div className="partnerModals__content-card-input">
              Нэр
              <input
                name="name"
                defaultValue={data.name}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="partnerModals__content-card-input">
              Байгууллагын регистер
              <input
                name="company_register"
                type="number"
                defaultValue={data.company_register}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="partnerModals__content-card-input">
              Утас
              <input
                name="phone"
                type="number"
                defaultValue={data.phone}
                min={11111111}
                max={99999999}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="partnerModals__content-card-input">
              Цахим шуудан
              <input
                name="email"
                type="email"
                defaultValue={data.email}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="partnerModals__content-card-input">
              Вэб сайт
              <input
                name="web"
                defaultValue={data.web}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="partnerModals__content-card-input">
              Хаяг
              <input
                name="address"
                defaultValue={data.address}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="partnerModals__content-card-input">
              Тусгай зөвшөөрөл авсан огноо
              <input
                name="certificate_date"
                type="date"
                value={moment(data.certificate_date).format("YYYY-MM-DD")}
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="partnerModals__content-card-input">
              Тусгай зөвшөөрлийн гэрчилгээ
              <FileUploader
                file={data.certificate_image}
                getFile={setCerFile}
                imgWidth="20rem"
              />
            </div>
          </div>

          <b className="partnerModals__content-title" about="service">
            Танайхаас санал болгох үйлчилгээг сонгоно уу?
          </b>
          <div className="partnerModals__content-checkBox">
            {renderCheckBoxes()}
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

export default TransPimpModal;
