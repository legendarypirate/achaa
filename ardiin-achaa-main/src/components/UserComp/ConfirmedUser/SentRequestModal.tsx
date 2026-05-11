// @ts-nocheck
import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";
import Table from "../../../admin/AdminTools/Table/Table";
import Modal from "../../../tools/Modal/Modal";


const SentRequestModal = ({ accountID, id, myPacksCol, visible, onCancel }) => {
  const [cargoName, setCargoName] = useState("");
  const [choseData, setChoseData] = useState([]);

  useEffect(() => {
    Axios.get(`/transport/getByID/${id}`).then((res) => {
      setCargoName(res.data.cargo_name);
    });
  }, [id]);

  const sendRequestOnClick = () => {
    const packageID = choseData.id;

    Axios.post("/packages/sendRequest", {
      packageID,
      transportID: id,
    }).then((res) => {
      if (res.data.message === "success") {
        alert("Амжилттай илгээгдлээ.");
        window.location.reload();
      } else {
        alert("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
        window.location.reload();
      }
    });
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <div className="requestModal">
        <h3 className="requestModal__title">
          Та "{cargoName}" каргонд ачаа бараагаа өгөх гэж байна. Таны сонгосон
          тээврийн хэрэгсэлд 32м³ хоосон зай байна.
        </h3>

        <p className="requestModal__subTitle">
          Таны бүртгүүлсэн ачаа бараанууд
        </p>

        <Table
          axiosURL={`/packages/byAccID/${accountID}/free`}
          columns={myPacksCol}
          getChoseData={setChoseData}
          disableAddBtn
          disableSearch
          disableDeleteIcon
          disableEditIcon
          enableCheckBox
        />

        <div className="requestModal__footing">
          <div className="requestModal__memento">
            <b className="requestModal__memento-title">Санамж:</b>

            <p className="requestModal__memento-text">
              Та ачаа барааныхаа ард байрлах хоосон дөрвөлжин дээр дарж
              идэвхжүүлж хүсэлт илгээх дарснаар таны идэвхжүүлсэн ачаа бараа
              сонгосон тээврийн хэрэгсэлд ачигдах хүсэлт амжилттай илгээгдэнэ.
            </p>
          </div>

          <button
            className="requestModal__sendBtn"
            onClick={sendRequestOnClick}
          >
            Хүсэлт илгээх
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SentRequestModal;
