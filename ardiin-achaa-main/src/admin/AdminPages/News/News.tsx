// @ts-nocheck
import React, { useState } from "react";
import moment from "moment";
import Table from "../../AdminTools/Table/Table";
import NewsModal from "./NewsModal";


const News = () => {
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
    {
      Header: "Нийтэлсэн огноо",
      accessor: "created_date",
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
        axiosURL="/news"
        columns={column}
        setID={setID}
        showModalHandler={setModalVisible}
      />

      <NewsModal id={id} visible={modalVisible} onCancel={modalOnCancel} />
    </>
  );
};

export default News;
