// @ts-nocheck
import React, { useState } from "react";
import moment from "moment";
import Table from "../../AdminTools/Table/Table";
import CrossRoadModal from "./Modals/CrossRoadModal";

const CrossRoadTable = () => {
  const [id, setID] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const column = [
    {
      Header: "Толгойн дугаар",
      accessor: "head_number",
    },
    {
      Header: "Чиргүүлийн дугаар",
      accessor: "ass_number",
    },
    {
      Header: "Тээврийн марк",
      accessor: "trans_mark",
    },
    {
      Header: "Бүртгэгдсэн огноо",
      accessor: "signed_date",
      Cell: ({ value }) => moment(value).format("YYYY/MM/DD"),
    },
  ];

  const modalOnCancel = () => {
    setID("");
    setModalVisible(false);
  };

  return (
    <>
      <Table
        mainAxios="/partnerCrossRoad"
        axiosURL="/partnerCrossRoad/requested"
        columns={column}
        setID={setID}
        showModalHandler={setModalVisible}
        disablePhoto
        disableAddBtn
        // enablePartnerConfirm
      />

      <CrossRoadModal id={id} visible={modalVisible} onCancel={modalOnCancel} />
    </>
  );
};

export default CrossRoadTable;
