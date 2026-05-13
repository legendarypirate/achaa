// @ts-nocheck
import React, { useEffect, useState } from "react";
import Axios from "../../../../Axios";
import Modal from "../../../../tools/Modal/Modal";
import { Button } from "@/components/ui/button";


const OnlineShopModal = ({ id, visible, onCancel }) => {
  const [data, setData] = useState({});

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

    for (const [key, value] of Object.entries(data)) {
      formData.append(`${key}`, [value ? value : 0]);
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

          <b className="partnerModals__content-title">
            Онлайн дэлгүүрийн мэдээлэл
          </b>
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
              Page, Group, Web холбоос
              <input
                name="web"
                defaultValue={data.web}
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
              Агуулахын хэмжээ
              <div>
                <input
                  name="online_storage"
                  about="sizes"
                  type="number"
                  defaultValue={data.online_storage}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div className="partnerModals__content-card-input">
              Үйл ажиллагаа явуулсан хугацаа
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <input
                  name="online_activity"
                  about="sizes"
                  type="number"
                  defaultValue={data.online_activity}
                  onChange={onChangeHandler}
                />
                хоног
              </div>
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

        <Button type="submit">Хадгалах</Button>
      </form>
    </Modal>
  );
};

export default OnlineShopModal;
