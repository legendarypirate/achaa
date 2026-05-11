// @ts-nocheck
import React, { useState } from "react";
import { RiUser3Fill } from "react-icons/ri";
import Axios from "../../Axios";
import ButtonSpinner from "../../tools/ButtonSpinner/ButtonSpinner";
import Input from "../../tools/Input/Input";
import Modal from "../../tools/Modal/Modal";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [someError, setSomeError] = useState(false);

  const messageHandleOK = () => {
    if (someError || messageType === "error") {
      setMessageVisible(false);
    } else {
      setIsLoading(false);
      window.location.replace("/");
    }
  };

  const sendOnClick = (e) => {
    e.preventDefault();

    setIsLoading(true);

    Axios.post("/accounts/forgotPassword", { email }).then((res) => {
      const { data } = res;

      if (data.message === "success") {
        setIsLoading(false);

        setSomeError(false);
        setMessageType("success");
        setMessageText(
          <div style={{ textAlign: "center" }}>
            <b style={{ display: "block", fontSize: 18 }}>
              Таны цахим шуудан луу нууц үг сэргээх код илгээлээ.
            </b>

            <p style={{ marginTop: 10, fontWeight: "lighter" }}>
              Танд цахим шуудан ирэхгүй удвал Spam хавтасаа шалгана уу.
            </p>
          </div>
        );
        setMessageVisible(true);
      } else if (data.error === 409) {
        setIsLoading(false);

        setSomeError(false);
        setMessageType("error");
        setMessageText(data.message);
        setMessageVisible(true);
      } else {
        setIsLoading(false);

        setSomeError(true);
        setMessageType("error");
        setMessageText("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
        setMessageVisible(true);
      }
    });
  };

  return (
    <div className="forgotPasssword">
      <form className="forgotPasssword__container" onSubmit={sendOnClick}>
        <Modal
          type={messageType}
          text={messageText}
          visible={messageVisible}
          onOk={messageHandleOK}
        />

        <b className="forgotPasssword__container-label">
          Та цахим шуудангаа оруулна уу?
        </b>
        <Input
          icon={<RiUser3Fill />}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="forgotPasssword__container-sendBtn" type="submit">
          {isLoading ? <ButtonSpinner /> : "Илгээх"}
        </button>
        {isLoading && (
          <p className="forgotPasssword__container-loadingText">
            Түр хүлээнэ үү...
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
