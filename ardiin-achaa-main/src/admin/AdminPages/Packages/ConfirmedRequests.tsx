// @ts-nocheck
import React, { useState } from "react";
import Table from "../../AdminTools/Table/Table";
import PackageModal from "./PackageModal/PackageModal";

const ConfirmedRequests = () => {
  const [ID, setID] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const column = [
    {
      Header: "Хэрэглэгчийн код",
      accessor: "user_code",
    },
    {
      Header: "Ачааны нэр",
      accessor: "package_name",
    },
    {
      Header: "Ачааны ангилал",
      accessor: "package_category",
    },
    {
      Header: "Баглаа боодлын төрөл",
      accessor: "bundle_sort",
    },
    {
      Header: "Хаанаас хаашаа",
      accessor: (data) => data.come_from + "-" + data.go_to,
    },
    {
      Header: "Ачааны хэмжээ (м³)",
      accessor: "weight_metr",
    },
    {
      Header: "Тоо ширхэг",
      accessor: "total_piece",
    },
    {
      Header: "Хариуцсан компани",
      accessor: "cargo_name",
      Cell: ({ value }) => (!value || value === "0" ? "Хувь хүн" : value),
    },
  ];

  return (
    <>
      <Table
        mainAxios="/packages"
        axiosURL="/packages/byStatusID/3"
        columns={column}
        setID={setID}
        showModalHandler={setShowModal}
        disableAddBtn
        newStatusID={4}
        disablePhoto
      />

      <PackageModal
        id={ID}
        visible={showModal}
        onCancel={() => {
          setID("");
          setShowModal(false);
        }}
      />
    </>
  );
};

export default ConfirmedRequests;
