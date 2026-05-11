// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Axios from "../../../Axios";
import Table from "../../AdminTools/Table/Table";
import TransportModal from "./TransportModal";

const Transportation = () => {
  const accountID = useParams().id;

  const [id, setID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isCrossRoad, setIsCrossRoad] = useState(false);

  useEffect(() => {
    Axios.get(`/partnerCrossRoad/getByAdminID/${accountID}`).then((res) => {
      if (res.data) {
        setIsCrossRoad(true);
      } else {
        setIsCrossRoad(false);
      }
    });
  }, [accountID]);

  const column = [
    {
      Header: "Тээврийн код",
      accessor: "container_code",
    },
    {
      Header: "Тээврийн төрөл",
      accessor: "transport_type",
    },
    {
      Header: "Хаанаас хаашаа",
      accessor: (data) => data.location_from + "-" + data.location_to,
    },
    {
      Header: "Үнэ (тонн)",
      accessor: "price_tn",
    },
    {
      Header: "Үнэ (м³)",
      accessor: "price_metr",
    },
    {
      Header: "Боломжит багтаамж (тонн)",
      accessor: "capacity_tn",
    },
    {
      Header: "Боломжит багтаамж (м³)",
      accessor: "capacity_metr",
    },
    {
      Header: "Тээвэрлэх хугацаа (хоног)",
      accessor: (data) => data.date_from + "-" + data.date_to,
    },
    {
      Header: "Бүртгэгдсэн огноо",
      accessor: "expired_date",
      Cell: ({ value }) => moment(value).format("YYYY/MM/DD"),
    },
    {
      Header: "Төлөв",
      accessor: "status",
    },
  ];

  const modalOnCancel = () => {
    setID("");
    setShowModal(false);
  };

  let tableURL = "";
  if (isCrossRoad) {
    tableURL = `/transport/CR/${accountID}`;
  } else {
    tableURL = accountID === "0" ? "/transport" : `/transport/${accountID}`;
  }

  return (
    <>
      <Table
        mainAxios="/transport"
        axiosURL={tableURL}
        columns={column}
        setID={setID}
        showModalHandler={setShowModal}
        disableAddBtn={accountID === "0" ? true : false}
        disableDeleteIcon={accountID === "0" ? true : false}
        disablePhoto
      />

      <TransportModal
        accountID={accountID}
        id={id}
        visible={showModal}
        onCancel={modalOnCancel}
      />
    </>
  );
};

export default Transportation;
