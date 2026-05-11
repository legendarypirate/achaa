// @ts-nocheck
import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";
import CKeditor from "../../AdminTools/CKeditor/CKeditor";
import Modal from "../../../tools/Modal/Modal";
import FileUploader from "../../AdminTools/FileUploader/FileUploader";
import moment from "moment";
import Input from "../../../tools/Input/Input";


const AcademyModal = ({ id, visible, onCancel }) => {
  const [data, setData] = useState({});
  const [imageFile, setImageFile] = useState();
  const [information, setInformation] = useState();

  useEffect(() => {
    if (id) {
      Axios.get(`/academy/getByID/${id}`).then((res) => {
        setData(res.data);
        setInformation(res.data.information);
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

    formData.append("id", [data.id]);
    formData.append("title", [data.title]);
    formData.append("sort", [data.sort]);
    formData.append("information", [information]);
    formData.append("image", [data.image]);
    formData.append("imageFile", imageFile);

    let routeEnd = "";
    if (id) {
      routeEnd = "update";
    } else {
      routeEnd = "insert";
    }

    Axios.post(`/academy/${routeEnd}`, formData).then((res) => {
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
      <div className="academyModal">
        <h2 className="academyModal__heading">
          {id ? "Засах" : "Нэмэх"} талбар
        </h2>

        {id && (
          <p className="academyModal__createdDate">
            <b>Нийтэлсэн огноо:</b>
            {moment(data.created_date).format("YYYY/MM/DD")}
          </p>
        )}

        <div className="academyModal__content">
          <FileUploader file={data.image} getFile={setImageFile} image />

          <div className="academyModal__input">
            <b className="academyModal__input-label">Гарчиг</b>
            <Input name="title" value={data.title} onChange={onChangeHandler} />
          </div>

          <div className="academyModal__input">
            <b className="academyModal__input-label">Ангилал</b>
            <select
              className="academyModal__input-select"
              name="sort"
              value={data.sort}
              onChange={onChangeHandler}
            >
              <option value="Нийгэм">Нийгэм</option>
              <option value="Улс төр">Улс төр</option>
              <option value="Цаг агаар">Цаг агаар</option>
              <option value="Таньд зориулав">Таньд зориулав</option>
              <option value="Спорт">Спорт</option>
              <option value="Бусад">Бусад</option>
            </select>
          </div>
        </div>

        <div className="academyModal__ckEditor">
          <CKeditor
            setText={information}
            setCKEditorData={(val) => setInformation(val)}
          />
        </div>

        <button className="academyModal__saveBtn" onClick={saveOnClick}>
          Хадгалах
        </button>
      </div>
    </Modal>
  );
};

export default AcademyModal;
