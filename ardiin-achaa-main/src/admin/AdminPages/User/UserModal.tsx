// @ts-nocheck
import React, { useEffect, useState } from "react";
import moment from "moment";
import Axios from "../../../Axios";
import Modal from "../../../tools/Modal/Modal";
import FileUploader from "../../AdminTools/FileUploader/FileUploader";
import Input from "../../../tools/Input/Input";


const UserModal = ({ id, visible, onCancel }) => {
  const [data, setData] = useState({});
  const [imageFile, setImageFile] = useState();

  useEffect(() => {
    if (id) {
      Axios.get(`/accounts/getByID/${id}`).then((res) => {
        setData(res.data);
      });
    } else {
      setData({});
    }
  }, [id]);

  const daysAgoTimer = (expiredDate) => {
    const today = moment().format("YYYY-MM-DD HH:mm:ss");
    const expired = moment(expiredDate);

    let minus = 0;
    if (expiredDate) {
      minus = expired.diff(today, "days");
    }

    return minus;
  };

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", [data.id]);
    formData.append(
      "membership",
      parseInt(data.membership) > 0 ? [data.membership] : ["0"]
    );
    formData.append("firstname", [data.firstname]);
    formData.append("lastname", [data.lastname]);
    formData.append("register_number", [data.register_number]);
    formData.append("phone_number", [data.phone_number]);
    formData.append("phone_number2", [data.phone_number2]);
    formData.append("email", [data.email]);
    formData.append("image", [data.image]);
    formData.append("imageFile", imageFile);

    let routeEnd = "";
    if (id) {
      routeEnd = "update";
    } else {
      routeEnd = "signup";
    }

    Axios.post(`/accounts/${routeEnd}`, formData).then((res) => {
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
      <form className="userModal" onSubmit={saveOnClick}>
        <h2 className="userModal__heading">{id ? "Засах" : "Нэмэх"} талбар</h2>

        <FileUploader file={data.image} getFile={setImageFile} avatar center />

        <div className="userModal__content">
          {id && (
            <>
              <p className="userModal__text">
                <b>Хэрэглэгчийн код:</b>
                {data.user_code}
              </p>

              <p className="userModal__text">
                <b>Үлдсэн хоног:</b>
                {daysAgoTimer(data.expired_date)}
              </p>
            </>
          )}

          <div className="userModal__input">
            <b className="userModal__input-label">Гишүүний эрх</b>
            <select
              name="membership"
              value={data.membership ? data.membership : ""}
              onChange={onChangeHandler}
            >
              <option value="0">Эрхгүй</option>
              <option value="1">Энгийн хэрэглэгч</option>
              <option value="2">Байгуулгын эрх</option>
              <option value="3">Тусгай гишүүний эрх</option>
            </select>
          </div>

          <div className="userModal__input">
            <b className="userModal__input-label">Овог</b>
            <Input
              name="lastname"
              value={data.lastname}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="userModal__input">
            <b className="userModal__input-label">Нэр</b>
            <Input
              name="firstname"
              value={data.firstname}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="userModal__input">
            <b className="userModal__input-label">Регистрийн дугаар</b>
            <Input
              name="register_number"
              value={data.register_number}
              onChange={onChangeHandler}
            />
          </div>

          <div className="userModal__input">
            <b className="userModal__input-label">Утасны дугаар{id && " 1"}</b>
            <Input
              name="phone_number"
              type="number"
              min={11111111}
              max={99999999}
              value={data.phone_number}
              onChange={onChangeHandler}
              required
            />
          </div>

          {id && (
            <div className="userModal__input">
              <b className="userModal__input-label">Утасны дугаар 2</b>
              <Input
                name="phone_number2"
                type="number"
                min={11111111}
                max={99999999}
                value={data.phone_number2}
                onChange={onChangeHandler}
              />
            </div>
          )}

          <div className="userModal__input">
            <b className="userModal__input-label">Цахим шуудан</b>
            <Input
              name="email"
              type="email"
              value={data.email}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        <button className="userModal__saveBtn" type="submit">
          Хадгалах
        </button>
      </form>
    </Modal>
  );
};

export default UserModal;
