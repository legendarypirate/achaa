// @ts-nocheck
import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";
import Modal from "../../../tools/Modal/Modal";
import FileUploader from "../../AdminTools/FileUploader/FileUploader";
import Input from "../../../tools/Input/Input";


const PublicityModal = ({ id, visible, onCancel }) => {
  const [data, setData] = useState({});
  const [imageFile, setImageFile] = useState();

  useEffect(() => {
    if (id) {
      Axios.get(`/publicity/getByID/${id}`).then((res) => {
        setData(res.data);
      });
    } else {
      setData({});
    }
  }, [id]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveOnClick = () => {
    const formData = new FormData();

    formData.append("id", data.id);
    formData.append("text", data.text);
    formData.append("image", data.image);
    formData.append("imageFile", imageFile);

    let routeEnd = "";
    if (id) {
      routeEnd = "update";
    } else {
      routeEnd = "insert";
    }

    Axios.post(`/publicity/${routeEnd}`, formData).then((res) => {
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
      <div className="publicityModal">
        <h2 className="publicityModal__heading">
          {id ? "Засах" : "Нэмэх"} талбар
        </h2>

        <FileUploader file={data.image} getFile={setImageFile} image />

        <div className="publicityModal__input">
          <b className="publicityModal__input-label">Бичвэр</b>
          <Input name="text" value={data.text} onChange={onChangeHandler} />
        </div>

        <button className="publicityModal__saveBtn" onClick={saveOnClick}>
          Хадгалах
        </button>
      </div>
    </Modal>
  );
};

export default PublicityModal;
