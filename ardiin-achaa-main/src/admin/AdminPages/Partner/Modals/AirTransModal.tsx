// @ts-nocheck
import React, { useEffect, useState } from "react";
import Axios from "../../../../Axios";
import Modal from "../../../../tools/Modal/Modal";


const AirTransModal = ({ id, visible, onCancel }) => {
  const [data, setData] = useState({});

  const [airTransCompany, setAirTransCompany] = useState([]);
  const [transType, setTransType] = useState([]);
  const [airPackType, setAirPackType] = useState([]);

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

  const saveOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (transType.length > 0) {
      formData.append("trans_type", [JSON.stringify(transType)]);
    }

    if (airTransCompany.length > 0) {
      formData.append("air_trans_company", [JSON.stringify(airTransCompany)]);
    }

    if (airPackType.length > 0) {
      formData.append("air_pack_type", [JSON.stringify(airPackType)]);
    }

    for (const [key, value] of Object.entries(data)) {
      if (
        key === "trans_type" ||
        key === "air_trans_company" ||
        key === "air_pack_type"
      ) {
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
        <div key={index} className="partnerModals__content-checkBox-item">
          <input
            name="air_trans_company"
            type="checkbox"
            value={item.val}
            onChange={(e) =>
              setAirTransCompany((val) => [...val, e.target.value])
            }
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
        <div key={index} className="partnerModals__content-checkBox-item">
          <input
            name="trans_type"
            type="checkbox"
            value={item.val}
            onChange={(e) => setTransType((val) => [...val, e.target.value])}
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
        <div key={index} className="partnerModals__content-checkBox-item">
          <input
            name="air_pack_type"
            type="checkbox"
            value={item.val}
            onChange={(e) => setAirPackType((val) => [...val, e.target.value])}
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
              />
            </div>

            <div className="partnerModals__content-card-input">
              Байгууллагын регистер
              <input
                name="company_register"
                type="number"
                defaultValue={data.company_register}
                onChange={onChangeHandler}
              />
            </div>

            <div className="partnerModals__content-card-input">
              Утас
              <input
                name="phone"
                type="number"
                defaultValue={data.phone}
                onChange={onChangeHandler}
              />
            </div>

            <div className="partnerModals__content-card-input">
              Цахим шуудан
              <input
                name="email"
                defaultValue={data.email}
                onChange={onChangeHandler}
              />
            </div>

            <div className="partnerModals__content-card-input">
              Вэб сайт
              <input
                name="web"
                defaultValue={data.web}
                onChange={onChangeHandler}
              />
            </div>

            <div className="partnerModals__content-card-input">
              Хаяг
              <input
                name="address"
                defaultValue={data.address}
                onChange={onChangeHandler}
              />
            </div>

            <div className="partnerModals__content-card-input">
              Нислэгийн дугаар
              <input
                name="trans_number"
                type="number"
                defaultValue={data.trans_number}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <b className="partnerModals__content-title">Тээвэр хийх компани</b>
          <div className="partnerModals__content-checkBox">
            {renderTransCompanies()}
          </div>

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

          <b className="partnerModals__content-title">Тээвэрлэлтийн төрөл</b>
          <div className="partnerModals__content-checkBox">
            {renderTransTypes()}
          </div>

          <b className="partnerModals__content-title">Ачих ачааны төрөл</b>
          <div className="partnerModals__content-packType">
            {renderPackTypes()}
          </div>
        </div>

        <button className="partnerModals__saveBtn" type="submit">
          Хадгалах
        </button>
      </form>
    </Modal>
  );
};

export default AirTransModal;
