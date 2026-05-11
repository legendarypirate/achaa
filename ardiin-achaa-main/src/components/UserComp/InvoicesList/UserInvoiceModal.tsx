// @ts-nocheck
import React, { useEffect, useState } from "react";
import moment from "moment";
import { saveAs } from "file-saver";
import Axios from "../../../Axios";
import Modal from "../../../tools/Modal/Modal";


const UserInvoiceModal = ({ invoiceID, visible, onCancel }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (invoiceID) {
      Axios.get(`/invoice/getByID/${invoiceID}`).then((res) => {
        setData(res.data);
      });
    } else {
      setData({});
    }
  }, [invoiceID]);

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <div className="userInvoice">
        <h2 className="userInvoice__heading">
          Нэхэмжлэл
          <label>({moment(data.sent_date).format("YYYY-MM-DD")})</label>
        </h2>

        <div className="userInvoice__content">
          <img
            className="userInvoice__content-img"
            src={data.image}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          <button
            className="userInvoice__content-downloadBtn"
            onClick={() =>
              saveAs(data.image, `${data.package_name} - Нэхэмжлэл`)
            }
          >
            Зураг татах
          </button>

          <b>Тайлбар:</b>
          {data.text}
        </div>
      </div>
    </Modal>
  );
};

export default UserInvoiceModal;
