// @ts-nocheck
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../../AdminTools/Table/Table";
import PackageModal from "./PackageModal/PackageModal";
import InvoiceModal from "../Invoice/InvoiceModal";

const ApprovedPackages = () => {
  const adminID = useParams().id;

  const [userCode, setUserCode] = useState(0);
  const [ID, setID] = useState(0);
  const [visiblePackage, setVisiblePackage] = useState(false);
  const [visibleInvoice, setVisibleInvoice] = useState(false);

  let URL = "";
  let column = [];

  if (adminID === "0") {
    URL = "/packages/approved";

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
      {
        Header: "Ачааны төлөв",
        accessor: "status",
      },
    ];
  } else {
    URL = `/packages/byCargoAdminID/${adminID}/approved`;

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

  const modalOnCancel = () => {
    setID("");
    setVisibleInvoice(false);
  };

  return (
    <>
      <Table
        mainAxios="/packages"
        axiosURL={URL}
        columns={column}
        setID={setID}
        setUserCode={setUserCode}
        showModalHandler={setVisiblePackage}
        showInvoiceHandler={setVisibleInvoice}
        disableAddBtn
        disablePhoto
        enableInvoice={adminID === "0" ? false : true}
      />

      <PackageModal
        id={ID}
        visible={visiblePackage}
        onCancel={() => {
          setID("");
          setVisiblePackage(false);
        }}
      />

      <InvoiceModal
        adminID={adminID}
        userCode={userCode}
        packageID={ID}
        visible={visibleInvoice}
        onCancel={modalOnCancel}
      />
    </>
  );
};

export default ApprovedPackages;
