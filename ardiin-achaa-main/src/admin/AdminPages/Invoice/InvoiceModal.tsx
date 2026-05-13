// @ts-nocheck
import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";
import Modal from "../../../tools/Modal/Modal";
import FileUploader from "../../AdminTools/FileUploader/FileUploader";
import { Button } from "@/components/ui/button";


const InvoiceModal = ({ adminID, userCode, packageID, visible, onCancel }) => {
  const [data, setData] = useState({});
  const [imageFile, setImageFile] = useState();

  useEffect(() => {
    if (packageID) {
      Axios.get(`/invoice/getByPackageID/${packageID}`).then((res) => {
        setData(res.data);
      });
    } else {
      setData({});
    }
  }, [packageID]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sendOnClick = () => {
    const formData = new FormData();

    formData.append("cargo_admin_id", [adminID]);
    formData.append("user_code", [userCode]);
    formData.append("package_id", [packageID]);

    formData.append("id", [data.id]);
    formData.append("text", [data.text]);
    formData.append("image", [data.image]);
    formData.append("imageFile", imageFile);

    if (data.id) {
      Axios.post("/invoice/update", formData).then((res) => {
        if (res.data.message === "success") {
          alert("Амжилттай хадгалагдлаа.");
          window.location.reload();
        } else {
          alert("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
          window.location.reload();
        }
      });
    } else {
      Axios.post("/invoice/insert", formData).then((res) => {
        if (res.data.message === "success") {
          alert("Амжилттай илгэгдлээ.");
          window.location.reload();
        } else {
          alert("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
          window.location.reload();
        }
      });
    }
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <div className="invoiceModal">
        <h2 className="invoiceModal__heading">
          {data.id ? "Нэхэмжлэл засах" : "Нэхэмжлэл үүсгэх"} талбар
        </h2>

        <div className="invoiceModal__content">
          <FileUploader file={data.image} getFile={setImageFile} />

          <div className="invoiceModal__content-input">
            <p>Тайлбар</p>
            <textarea
              rows={4}
              name="text"
              value={data.text}
              onChange={onChangeHandler}
            />
          </div>

          <Button type="button" onClick={sendOnClick}>
            {data.id ? "Хадгалах" : "Илгээх"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceModal;
