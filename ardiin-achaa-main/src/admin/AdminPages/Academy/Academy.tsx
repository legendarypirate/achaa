// @ts-nocheck
import React, { useState } from "react";
import Table from "../../AdminTools/Table/Table";
import AcademyModal from "./AcademyModal";

const Academy = () => {
  const [id, setID] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const column = [
    {
      Header: "Гарчиг",
      accessor: "title",
      Cell: ({ value }) => <p className="rcTable__contentTitle">{value}</p>,
    },
    {
      Header: "Ангилал",
      accessor: "sort",
    },
  ];

  const modalOnCancel = () => {
    setID("");
    setModalVisible(false);
  };

  return (
    <>
      <Table
        axiosURL="/academy"
        columns={column}
        setID={setID}
        showModalHandler={setModalVisible}
      />

      <AcademyModal id={id} visible={modalVisible} onCancel={modalOnCancel} />
    </>
  );
};

export default Academy;
