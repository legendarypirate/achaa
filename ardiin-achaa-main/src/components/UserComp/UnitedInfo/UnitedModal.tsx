// @ts-nocheck
import React, { useEffect, useState } from "react";
import Helper from "../../../assets/helper.png";
import Axios from "../../../Axios";
import { staticAssetUrl } from "../../../utils/staticAssetUrl";
import Input from "../../../tools/Input/Input";
import Modal from "../../../tools/Modal/Modal";


const UnitedModal = ({ id, visible, onCancel }) => {
  const [data, setData] = useState([]);

  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    Axios.get(`/partnerRate/getByID/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const openSaveMessage = () => {
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
    formData.append("name", [data.name]);
    formData.append("signed_date", [data.signed_date]);
    formData.append("rate", [data.rate]);

    Axios.post("/partnerRate/update", formData).then((res) => {
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
    <Modal visible={visible} onCancel={onCancel}>
      <Modal
        type={messageType}
        text={messageText}
        visible={messageVisible}
        onOk={messageHandleOK}
        onCancel={() => setMessageVisible(false)}
      />
      <div className="united">
        <div className="united__body">
          <img src={staticAssetUrl(Helper)} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} className="united__body-logo" />

          <div className="united__body-info">
            <h3 className="united__body-info-text">Компанийн нэр</h3>
            <Input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              disabled
            />
            <h3 className="united__body-info-text">Үйл ажиллагааны төрөл</h3>
            <Input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              disabled
            />
            <h3 className="united__body-info-text">
              Хамтран ажиллаж эхэлсэн огноо
            </h3>
            <Input
              name="created_date"
              value={data.created_date}
              onChange={onChangeHandler}
              disabled
            />
          </div>
        </div>

        <div className="united__rate">
          <h2 className="united__rate-text">Үнэлгээ</h2>
          <div className="united__rate-warn">
            Та 1-5 хоорондох тоог бичин үнэлгээгээ өгнө үү{" "}
          </div>
          <input
            name="rate"
            value={data.rate}
            onChange={onChangeHandler}
            min={1}
            max={5}
            type="number"
            className="united__rate-input"
          />
          <button className="united__rate-button" onClick={openSaveMessage}>
            Үнэлэх
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UnitedModal;
