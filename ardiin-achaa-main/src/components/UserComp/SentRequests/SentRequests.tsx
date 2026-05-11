// @ts-nocheck
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../../../admin/AdminTools/Table/Table";
import BaggageModal from "../BaggageModal/BaggageModal";


const SentRequests = () => {
  const accountID = useParams().id;

  const [packageID, setPackageID] = useState("");
  const [myPackVisible, setMyPackVisible] = useState(false);

  const myPacksCol = [
    {
      Header: "Ачааны нэр",
      accessor: "package_name",
    },
    {
      Header: "Хариуцсан компани",
      accessor: "partner_name",
      Cell: ({ value }) => (!value || value === "0" ? "Хувь хүн" : value),
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
      Header: "Төлөв",
      accessor: "status",
    },
  ];

  return (
    <div className="sentRequests">
      <h3 className="sentRequests__heading">Илгээгдсэн ачаа барааны хүсэлт</h3>

      <div className="sentRequests__tableContainer">
        <Table
          mainAxios="/packages"
          axiosURL={`/packages/byAccID/${accountID}/requested`}
          columns={myPacksCol}
          rowSize={5}
          setID={setPackageID}
          showModalHandler={setMyPackVisible}
          disablePhoto
          disableAddBtn
        />
      </div>

      <BaggageModal
        id={packageID}
        account_id={accountID}
        visible={myPackVisible}
        onCancel={() => {
          setPackageID("");
          setMyPackVisible(false);
        }}
      />
    </div>
  );
};

export default SentRequests;
