// @ts-nocheck
import React, { useState } from "react";
import Axios from "../../../Axios";
import Modal from "../../../tools/Modal/Modal";
import Input from "../../../tools/Input/Input";
import { Button } from "@/components/ui/button";


const EpriceOfferModal = ({ visible, onCancel }) => {
  const [data, setData] = useState({});

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sendOnClick = () => {
    Axios.post("/invoice/insert", data).then((res) => {
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
      <div className="epriceOfferModal">
        <h2 className="epriceOfferModal__heading">Үнийн санал илгээх</h2>

        <div className="epriceOfferModal__input">
          <b className="epriceOfferModal__input-label">Үнэ</b>
          <Input name="price" value={data.price} onChange={onChangeHandler} />
        </div>

        <div className="epriceOfferModal__input">
          <b className="epriceOfferModal__input-label">
            Тээвэрлэх хугацаа /хоногоор/
          </b>
          <Input
            name="date_from"
            value={data.date_from}
            onChange={onChangeHandler}
          />
          -
          <Input
            name="date_to"
            value={data.date_to}
            onChange={onChangeHandler}
          />
          хоног
        </div>

        <Button type="button" onClick={sendOnClick}>
          Илгээх
        </Button>
      </div>
    </Modal>
  );
};

export default EpriceOfferModal;
