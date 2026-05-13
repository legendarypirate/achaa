// @ts-nocheck
import React, { useEffect, useState } from "react";
import moment from "moment";
import Axios from "../../../Axios";
import Modal from "../../../tools/Modal/Modal";
import FileUploader from "../../AdminTools/FileUploader/FileUploader";
import Input from "../../../tools/Input/Input";
import CKeditor from "../../AdminTools/CKeditor/CKeditor";
import { Button } from "@/components/ui/button";


const NewsModal = ({ id, visible, onCancel }) => {
  const [data, setData] = useState({});
  const [info, setInfo] = useState("");
  const [sorts, setSorts] = useState([]);

  const [imageFile, setImageFile] = useState();

  useEffect(() => {
    Axios.get("/news/sort/getAll/").then((res) => {
      setSorts(res.data);
    });

    if (id) {
      Axios.get(`/news/getByID/${id}`).then((res) => {
        setData(res.data);
        setInfo(res.data.information);
      });
    } else {
      setData({});
      setInfo("");
    }
  }, [id]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveOnClick = () => {
    const formData = new FormData();

    formData.append("id", data.id);
    formData.append("title", data.title);
    formData.append("sort_id", data.sort_id);
    formData.append("info", info);
    formData.append("image", data.image);
    formData.append("imageFile", imageFile);

    let routeEnd = "";
    if (id) {
      routeEnd = "update";
    } else {
      routeEnd = "insert";
    }

    Axios.post(`/news/${routeEnd}`, formData).then((res) => {
      if (res.data.message === "success") {
        alert("Амжилттай хадгалагдлаа.");
        window.location.reload();
      } else {
        alert("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
        window.location.reload();
      }
    });
  };

  const renderSortOptions = () => {
    let options = null;

    if (sorts) {
      const items = [{ id: "", sort: "Сонгох..." }, ...sorts];

      options = items.map((item, index) => {
        return (
          <option key={index} value={item.id}>
            {item.sort}
          </option>
        );
      });
    }

    return options;
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <div className="newsModal">
        <h2 className="newsModal__heading">{id ? "Засах" : "Нэмэх"} талбар</h2>

        {id && (
          <p className="newsModal__createdDate">
            <b>Нийтэлсэн огноо:</b>
            {moment(data.created_date).format("YYYY/MM/DD")}
          </p>
        )}

        <FileUploader file={data.image} getFile={setImageFile} />

        <div className="newsModal__content">
          <div className="newsModal__input">
            <b className="newsModal__input-label">Гарчиг</b>
            <Input name="title" value={data.title} onChange={onChangeHandler} />
          </div>

          <div className="newsModal__input">
            <b className="newsModal__input-label">Ангилал</b>
            <select
              className="newsModal__input-select"
              name="sort_id"
              value={data.sort_id}
              onChange={onChangeHandler}
            >
              {renderSortOptions()}
            </select>
          </div>
        </div>

        <div className="newsModal__ckEditor">
          <CKeditor setText={info} setCKEditorData={(val) => setInfo(val)} />
        </div>

        <Button type="button" onClick={saveOnClick}>
          Хадгалах
        </Button>
      </div>
    </Modal>
  );
};

export default NewsModal;
