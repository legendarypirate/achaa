// @ts-nocheck
import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";
import Modal from "../../../tools/Modal/Modal";


const MyPackModal = ({ id, visible, onCancel }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    Axios.get(`/packages/isFree/${id}`).then((res) => {
      if (res.data === true) {
        Axios.get(`/packages/free/getByID/${id}`).then((res) => {
          setData(res.data);
        });
      } else {
        Axios.get(`/packages/getByID/${id}`).then((res) => {
          setData(res.data);
        });
      }
    });
  }, [id]);

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <div className="myPackModal">
        {data.status_id > 1 && (
          <div className="myPackModal__row">
            <span className="myPackModal__row-cell">
              <b>Хариуцсан компани:</b>
              <p>
                {!data.cargo_name || data.cargo_name === "0"
                  ? "Хувь хүн"
                  : data.cargo_name}
              </p>
            </span>

            <span className="myPackModal__row-cell">
              <b>Төлөв:</b>
              <p>{data.status}</p>
            </span>
          </div>
        )}

        <div className="myPackModal__row">
          <span className="myPackModal__row-cell">
            <b>Ачааны нэр:</b>
            <p>{data.package_name}</p>
          </span>

          <span className="myPackModal__row-cell">
            <b>Ачааны ангилал:</b>
            <p>{data.package_category}</p>
          </span>
        </div>

        <div className="myPackModal__row">
          <span className="myPackModal__row-cell">
            <b>Баглаа боодлын төрөл:</b>
            <p>{data.bundle_sort}</p>
          </span>

          <span className="myPackModal__row-cell">
            <b>Хаанаас хаашаа:</b>
            <p>
              {data.come_from &&
                data.go_to &&
                data.come_from + "-" + data.go_to}
            </p>
          </span>
        </div>

        <div className="myPackModal__row">
          <span className="myPackModal__row-cell">
            <b>Ачааны хэмжээ:</b>
            <p>{data.weight_metr ? data.weight_metr + "м³" : ""}</p>
          </span>

          <span className="myPackModal__row-cell">
            <b>Тоо ширхэг:</b>
            <p>{data.total_piece}</p>
          </span>
        </div>

        <div className="myPackModal__row">
          <span className="myPackModal__row-cell">
            <b>Хадгалагдаж байгаа газар:</b>
            <p>{data.loaded_place}</p>
          </span>

          <span className="myPackModal__row-cell">
            <b>Нэмэлт мэдээлэл:</b>
            <p>{data.addition}</p>
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default MyPackModal;
