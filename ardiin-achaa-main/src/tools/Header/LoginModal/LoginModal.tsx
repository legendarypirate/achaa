// @ts-nocheck
import React, { useEffect, useState } from "react";
import { RiUser3Fill, RiLock2Line } from "react-icons/ri";
import Axios from "../../../Axios";
import Input from "../../Input/Input";
import Modal from "../../Modal/Modal";


const LoginModal = ({ visible, onCancel, setSignupVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSaveMe, setIsSaveMe] = useState(false);

  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [someError, setSomeError] = useState(false);

  useEffect(() => {
    const savedMe = JSON.parse(localStorage.getItem("user_save_me"));

    if (savedMe) {
      setIsSaveMe(true);
      setEmail(savedMe.email);
      setPassword(savedMe.password);
    }
  }, []);

  const messageHandleOK = () => {
    if (someError) {
      window.location.reload();
    } else {
      setMessageVisible(false);
    }
  };

  const loginOnClick = (e) => {
    e.preventDefault();

    Axios.post("/accounts/login", {
      email,
      password,
    }).then((res) => {
      const { data } = res;

      if (data.token) {
        if (data.roleID === 1) {
          if (isSaveMe) {
            localStorage.setItem(
              "user_save_me",
              JSON.stringify({ email, password })
            );
          }

          localStorage.setItem("token", data.token);
          window.location.replace(`/user/${data.id}`);
        } else {
          setSomeError(false);

          setMessageType("error");
          setMessageText("Энгийн хэрэглэгч биш байна!");
          setMessageVisible(true);
        }
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
  };

  const signUpOnClick = (e) => {
    e.preventDefault();

    onCancel();
    setSignupVisible(true);
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <Modal
        type={messageType}
        text={messageText}
        visible={messageVisible}
        onOk={messageHandleOK}
      />

      <form className="login" onSubmit={loginOnClick}>
        <div className="login__header">
          <h2 className="login__header-title">Тавтай морил</h2>
          <p className="login__header-subtitle">
            Хэрэглэгчийн бүртгэлээрээ нэвтэрч үйлчилгээгээ үргэлжлүүлнэ үү.
          </p>
        </div>

        <div className="login__body">
          <div className="login__input">
            <b className="login__input-label">Цахим шуудан</b>
            <Input
              icon={<RiUser3Fill />}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login__input">
            <b className="login__input-label">Нууц үг</b>
            <Input
              icon={<RiLock2Line />}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login__notice">
            <div className="login__notice-admonitory">
              <input
                type="checkbox"
                checked={isSaveMe}
                onChange={(e) => setIsSaveMe(e.target.checked)}
              />
              <label>Намайг сана</label>
            </div>

            <a className="login__notice-forget" href="/forgot-password">
              Нууц үгээ мартсан уу?
            </a>
          </div>
        </div>

        <div className="login__buttons">
          <button className="login__buttons-login" type="submit">
            Нэвтрэх
          </button>
          <button className="login__buttons-signup" onClick={signUpOnClick}>
            Шинэ хэрэглэгч бүртгүүлэх
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
