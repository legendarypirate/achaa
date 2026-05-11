// @ts-nocheck
import React, { useEffect, useState } from "react";
import Table from "../../../admin/AdminTools/Table/Table";
import moment from "moment";
import { useParams } from "react-router-dom";
import Axios from "../../../Axios";
import UserInvoiceModal from "./UserInvoiceModal";


const InvoicesList = () => {
  const userID = useParams().id;

  const [userCode, setUserCode] = useState("");
  const [invoiceID, setInvoiceID] = useState("");

  const [visibleInvoice, setVisibleInvoice] = useState(false);

  useEffect(() => {
    Axios.get(`/accounts/getByID/${userID}`).then((res) => {
      setUserCode(res.data.user_code);
    });
  }, [userID]);

  const column = [
    {
      Header: "Ачааны нэр",
      accessor: "package_name",
    },
    {
      Header: "Илгээсэн компани",
      accessor: "partner_name",
      Cell: ({ value }) => (!value || value === "0" ? "Хувь хүн" : value),
    },
    {
      Header: "Ирсэн огноо",
      accessor: "sent_date",
      Cell: ({ value }) => moment(value).format("YYYY/MM/DD"),
    },
  ];

  return (
    <div className="invoicesList">
      <h3 className="invoicesList__heading">Ирсэн нэхэмжлэлийн жагсаалт</h3>

      <div className="invoicesList__tableContainer">
        <Table
          axiosURL={`/invoice/byUserCode/${userCode}`}
          columns={column}
          setID={setInvoiceID}
          showModalHandler={setVisibleInvoice}
          disablePhoto
          disableAddBtn
          disableDeleteIcon
        />
      </div>

      <UserInvoiceModal
        invoiceID={invoiceID}
        visible={visibleInvoice}
        onCancel={() => setVisibleInvoice(false)}
      />
    </div>
  );
};

export default InvoicesList;
