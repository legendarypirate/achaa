// @ts-nocheck
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../../AdminTools/Table/Table";
import PackageModal from "./PackageModal/PackageModal";

const RequestedPackages = () => {
  const accountID = useParams().id;

  const [ID, setID] = useState(0);
  const [showModal, setShowModal] = useState(false);

  let URL = "";
  let column = [];

  if (accountID === "0") {
    URL = "/packages/byStatusID/2";

    column = [
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
  } else {
    URL = `/packages/byCargoAdminID/${accountID}/byStatusID/2`;

    column = [
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
    ];
  }

  return (
    <>
      <Table
        mainAxios="/packages"
        axiosURL={URL}
        columns={column}
        setID={setID}
        showModalHandler={setShowModal}
        newStatusID={accountID === "0" ? false : 3}
        disableAddBtn
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

export default RequestedPackages;
