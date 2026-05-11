// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiUser3Fill, RiLock2Line } from "react-icons/ri";
import Axios from "../../Axios";
import Input from "../../tools/Input/Input";
import Modal from "../../tools/Modal/Modal";


const RecoverPassword = () => {
  const { token } = useParams();

  const [mailCode, setMailCode] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const [passwordValidation, setPasswordValidation] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [someError, setSomeError] = useState(false);

  useEffect(() => {
    if (!password || !repassword) {
      setPasswordValidation(false);
    } else if (password === repassword) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }
  }, [password, repassword]);

  const messageHandleOK = () => {
    if (someError || messageType === "error") {
      setMessageVisible(false);
    } else {
      window.location.replace("/");
    }
  };

  const sendOnClick = (e) => {
    e.preventDefault();

    if (passwordValidation) {
      setSomeError(false);

      setMessageType("error");
      setMessageText("Нууц үг тохирохгүй байна!");
      setMessageVisible(true);
    } else {
      Axios.post("/accounts/recoverPassword/", {
        token,
        mailCode,
        password,
      }).then((res) => {
        const { data } = res;
        if (data.message === "success") {
          setSomeError(false);

          setMessageType("success");
          setMessageText("Таны нууц үг амжилттай сэргээгдлээ");
          setMessageVisible(true);
        } else if (data.error === 409) {
          setSomeError(false);

          setMessageType("error");
          setMessageText(data.message);
          setMessageVisible(true);
        } else {
          setSomeError(true);

          setMessageType("error");
          setMessageText("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
          setMessageVisible(true);
        }
      });
    }
  };

  return (
    <div className="recPassword">
      <form className="recPassword__container" onSubmit={sendOnClick}>
        <Modal
          type={messageType}
          text={messageText}
          visible={messageVisible}
          onOk={messageHandleOK}
        />

        <div className="recPassword__input">
          <b className="recPassword__input-label">Цахим шууданд ирсэн код</b>
          <Input
            icon={<RiUser3Fill />}
            type="number"
            min={100000}
            max={999999}
            onChange={(e) => setMailCode(e.target.value)}
            required
          />
        </div>

        <div className="recPassword__input">
          <b className="recPassword__input-label">Нууц үг</b>
          <Input
            icon={<RiLock2Line />}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="recPassword__input">
          <b className="recPassword__input-label">Нууц үг давтах</b>
          <Input
            icon={<RiLock2Line />}
            type="password"
            onChange={(e) => setRepassword(e.target.value)}
            required
          />

          {passwordValidation && (
            <span style={{ color: "red" }}>Тохирохгүй байна!</span>
          )}
        </div>

        <button className="recPassword__container-recoverBtn" type="submit">
          Сэргээх
        </button>
      </form>
    </div>
  );
};

export default RecoverPassword;
