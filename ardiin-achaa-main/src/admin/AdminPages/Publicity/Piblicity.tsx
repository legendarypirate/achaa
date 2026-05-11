// @ts-nocheck
import React, { useState } from "react";
import Table from "../../AdminTools/Table/Table";
import PublicityModal from "./PublicityModal";

const Publicity = () => {
  const [id, setID] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const column = [
    {
      Header: "Зураг",
      accessor: "image",
      Cell: ({ value }) => {
        return <img style={{ width: 100 }} src={value} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} />;
      },
    },
    {
      Header: "Бичвэр",
      accessor: "text",
      Cell: ({ value }) => <p className="rcTable__contentTitle">{value}</p>,
    },
  ];

  const modalOnCancel = () => {
    setID("");
    setModalVisible(false);
  };

  return (
    <>
      <Table
        axiosURL="/publicity"
        columns={column}
        setID={setID}
        showModalHandler={setModalVisible}
        disablePhoto
      />

      <PublicityModal id={id} visible={modalVisible} onCancel={modalOnCancel} />
    </>
  );
};

export default Publicity;
