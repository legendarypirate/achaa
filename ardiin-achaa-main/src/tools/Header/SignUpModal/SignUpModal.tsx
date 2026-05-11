// @ts-nocheck
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  RiUser3Fill,
  RiPhoneFill,
  RiMailLine,
  RiLock2Line,
  RiArrowRightLine,
} from "react-icons/ri";
import Axios from "../../../Axios";
import Input from "../../Input/Input";
import Modal from "../../Modal/Modal";


const SignUpModal = ({ visible, onCancel, setMsgVisible }) => {
  const recaptchaRef = useRef();

  const [data, setData] = useState([]);
  const [repassword, setRepassword] = useState("");
  const [isCaptcha, setIsCaptcha] = useState(false);

  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const reCaptchaOnChange = (value) => {
    if (value) {
      setIsCaptcha(true);
    } else {
      setIsCaptcha(false);
    }
  };

  const checkRepassword = () => {
    if (!data.password || !repassword) {
      return true;
    } else if (data.password === repassword) {
      return true;
    } else {
      return false;
    }
  };

  const checkPhoneNumber = () => {
    if (data.phone_number > 10000000 && data.phone_number < 99999999) {
      return true;
    } else if (!data.phone_number) {
      return true;
    } else {
      return false;
    }
  };

  const signUpOnClick = (e) => {
    e.preventDefault();

    if (checkRepassword()) {
      Axios.post("/accounts/signup", data).then((res) => {
        if (res.data.message === "success") {
          onCancel();
          setMsgVisible(true);
        } else {
          setMessageType("error");
          setMessageText(res.data.message);
          setMessageVisible(true);
        }
      });
    } else {
      setMessageType("error");
      setMessageText("Нууц үг таарахгүй байна!");
      setMessageVisible(true);
    }
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <Modal
        type={messageType}
        text={messageText}
        visible={messageVisible}
        onOk={() => setMessageVisible(false)}
      />

      <form className="signUpModal" onSubmit={signUpOnClick}>
        <div className="signUpModal__header">
          <h1 className="signUpModal__header-title">Шинэ хэрэглэгч бүртгүүлэх</h1>
          <p className="signUpModal__header-subtitle">
            Доорх мэдээллээ үнэн зөв бөглөж, бүртгэлээ үүсгэнэ үү.
          </p>
        </div>

        <div className="signUpModal__grid">
          <div className="signUpModal__input">
            <b className="signUpModal__input-label">Овог</b>
            <Input
              icon={<RiUser3Fill />}
              name="lastname"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="signUpModal__input">
            <b className="signUpModal__input-label">Нэр</b>
            <Input
              icon={<RiUser3Fill />}
              name="firstname"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="signUpModal__input">
            <b className="signUpModal__input-label">Утасны дугаар</b>
            <Input
              icon={<RiPhoneFill />}
              name="phone_number"
              type="number"
              onChange={onChangeHandler}
              required
            />

            {checkPhoneNumber() || (
              <span className="signUpModal__input-alert">
                Дугаар алдаатай байна!
              </span>
            )}
          </div>
          <div className="signUpModal__input">
            <b className="signUpModal__input-label">Цахим шуудан</b>
            <Input
              icon={<RiMailLine />}
              name="email"
              type="email"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="signUpModal__input">
            <b className="signUpModal__input-label">Нууц үг</b>
            <Input
              icon={<RiLock2Line />}
              name="password"
              type="password"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="signUpModal__input">
            <b className="signUpModal__input-label">Нууц үг давтах</b>
            <Input
              icon={<RiLock2Line />}
              type="password"
              onChange={(e) => setRepassword(e.target.value)}
              required
            />

            {checkRepassword() || (
              <span className="signUpModal__input-alert">Тохирохгүй байна!</span>
            )}
          </div>
        </div>

        <div className="signUpModal__actions">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LcX0WcgAAAAAIg4RHzMQzQl4JXiJoeUU4AZXfHs"
            onChange={reCaptchaOnChange}
          />

          {isCaptcha && (
            <button className="signUpModal__signupBtn">
              Бүртгүүлэх
              <RiArrowRightLine />
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default SignUpModal;
