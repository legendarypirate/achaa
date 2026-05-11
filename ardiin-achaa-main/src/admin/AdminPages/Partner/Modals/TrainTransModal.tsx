// @ts-nocheck
import React, { useEffect, useState } from "react";
import Axios from "../../../../Axios";
import Modal from "../../../../tools/Modal/Modal";
import FileUploader from "../../../AdminTools/FileUploader/FileUploader";


const TrainTransModal = ({ id, visible, onCancel }) => {
  const [data, setData] = useState({});
  const [transImgFile, setTransImgFile] = useState();

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

  const userTypeChecker = () => {
    if (
      (!data.name && !data.company_register && !data.phone && !data.email) ||
      (data.name === "0" &&
        data.company_register === 0 &&
        data.phone === 0 &&
        data.email === "0")
    ) {
      return "user";
    } else {
      return "company";
    }
  };

  const saveOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageFile", transImgFile);

    if (data.trans_type) {
      formData.append("trans_type", [JSON.stringify(data.trans_type)]);
    }

    for (const [key, value] of Object.entries(data)) {
      if (key === "trans_type") {
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

          {userTypeChecker() === "company" && (
            <>
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
              </div>
            </>
          )}

          <b className="partnerModals__content-title">Тээврийн мэдээлэл</b>
          <div className="partnerModals__content-card">
            <div className="partnerModals__content-card-input">
              Чингэлгийн дугаар
              <input
                name="trans_number"
                type="number"
                defaultValue={data.trans_number}
                onChange={onChangeHandler}
              />
            </div>

            <div className="partnerModals__content-card-input">
              Чингэлэг тээвэрлэлтийн төрөл
              <select
                name="trans_type"
                value={data.trans_type}
                onChange={onChangeHandler}
              >
                {renderTypeOptions()}
              </select>
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

export default TrainTransModal;
