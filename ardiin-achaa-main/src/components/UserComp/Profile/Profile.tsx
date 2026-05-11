// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  RiUser3Fill,
  RiBankCardFill,
  RiPhoneFill,
  RiMailLine,
  RiSave2Fill,
} from "react-icons/ri";
import Axios from "../../../Axios";
import Modal from "../../../tools/Modal/Modal";
import FileUploader from "../../../admin/AdminTools/FileUploader/FileUploader";
import Input from "../../../tools/Input/Input";


const Profile = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [imageFile, setImageFile] = useState();

  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    Axios.get(`/accounts/getByID/${id}`).then((res) => {
      setData(res.data);
    });
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

  const showSaveMessage = () => {
    setMessageType("alert");
    setMessageText("Та мэдээллээ шинэчлэхдээ итгэлтэй байна уу?");
    setMessageVisible(true);
  };

  const messageHandleOK = () => {
    if (messageType === "success") {
      window.location.reload();
    } else if (messageType === "alert") {
      saveOnClick();
    }
  };

  const saveOnClick = () => {
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

    Axios.post("/accounts/update", formData).then((res) => {
      if (res.data.message === "success") {
        setMessageType("success");
        setMessageText("Амжилттай хадгалагдлаа.");
        setMessageVisible(true);
      } else {
        setMessageType("error");
        setMessageText("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу!");
        setMessageVisible(true);
      }
    });
  };

  return (
    <div className="profile">
      <Modal
        type={messageType}
        text={messageText}
        visible={messageVisible}
        onOk={messageHandleOK}
        onCancel={() => setMessageVisible(false)}
      />

      <h3 className="profile__heading">Хэрэглэгчийн мэдээлэл</h3>

      <FileUploader file={data.image} getFile={setImageFile} center avatar />

      <div className="profile__content">
        <p className="profile__text">
          Үлдсэн хоног:
          <b>{daysAgoTimer(data.expired_date)}</b>
        </p>

        <div className="profile__input">
          <b className="profile__input-label">Овог</b>
          <Input
            icon={<RiUser3Fill />}
            name="lastname"
            value={data.lastname}
            onChange={onChangeHandler}
          />
        </div>

        <div className="profile__input">
          <b className="profile__input-label">Нэр</b>
          <Input
            icon={<RiUser3Fill />}
            name="firstname"
            value={data.firstname}
            onChange={onChangeHandler}
          />
        </div>

        <div className="profile__input">
          <b className="profile__input-label">Регистрийн дугаар</b>
          <Input
            icon={<RiBankCardFill />}
            name="register_number"
            value={data.register_number}
            onChange={onChangeHandler}
          />
        </div>

        <div className="profile__input">
          <b className="profile__input-label">Утасны дугаар 1</b>
          <Input
            icon={<RiPhoneFill />}
            name="phone_number"
            value={data.phone_number}
            type="number"
            onChange={onChangeHandler}
          />
        </div>

        <div className="profile__input">
          <b className="profile__input-label">Утасны дугаар 2</b>
          <Input
            icon={<RiPhoneFill />}
            name="phone_number2"
            value={data.phone_number2}
            type="number"
            onChange={onChangeHandler}
          />
        </div>

        <div className="profile__input">
          <b className="profile__input-label">Цахим шуудан</b>
          <Input
            icon={<RiMailLine />}
            name="email"
            value={data.email}
            type="email"
            onChange={onChangeHandler}
          />
        </div>
      </div>

      <button className="profile__saveBtn" onClick={showSaveMessage}>
        <RiSave2Fill /> Хадгалах
      </button>
    </div>
  );
};

export default Profile;
