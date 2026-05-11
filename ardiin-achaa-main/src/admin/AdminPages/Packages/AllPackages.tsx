// @ts-nocheck
import React, { useState } from "react";
import Table from "../../AdminTools/Table/Table";
import PackageModal from "./PackageModal/PackageModal";

const AllPackages = () => {
  const [ID, setID] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const column = [
    {
      Header: "Хэрэглэгчийн код",
      accessor: "user_code",
    },
    {
      Header: "Нэр",
      accessor: "package_name",
    },
    {
      Header: "Ангилал",
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
  ];

  return (
    <>
      <Table
        mainAxios="/packages"
        axiosURL="/packages/free"
        columns={column}
        setID={setID}
        showModalHandler={setShowModal}
        disableAddBtn
        disablePhoto
        enablEpriceOffer
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

export default AllPackages;
