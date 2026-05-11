// @ts-nocheck
import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import Axios from "../../../Axios";
import Input from "../../../tools/Input/Input";
import Modal from "../../../tools/Modal/Modal";


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [someError, setSomeError] = useState(false);

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
      email: email,
      password: password,
    }).then((res) => {
      const { data } = res;

      if (data.token) {
        if (data.roleID !== 1) {
          localStorage.setItem("adminToken", data.token);
          window.location.replace(`/admin/${res.data.id}`);
        } else {
          setSomeError(false);

          setMessageType("error");
          setMessageText("Уг формоор зөвхөн админууд нэвтэрнэ!");
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

  return (
    <div className="adminLogin">
      <Modal
        type={messageType}
        text={messageText}
        visible={messageVisible}
        onOk={messageHandleOK}
        onCancel={setMessageVisible}
        disableCloseBtn={false}
      />

      <form className="adminLogin__container" onSubmit={loginOnClick}>
        <img src={Logo.src} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} className="adminLogin__container-logo" />

        <Input
          placeholder="И-мэйл"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Нууц үг"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="adminLogin__container-loginBtn" type="submit">
          Нэвтрэх
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
