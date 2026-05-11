// @ts-nocheck
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import Table from "../../../admin/AdminTools/Table/Table";
import BaggageModal from "../BaggageModal/BaggageModal";
import SentRequestModal from "./SentRequestModal";


const ConfirmedUser = () => {
  const accountID = useParams().id;

  const [packageID, setPackageID] = useState("");
  const [transportID, setTransportID] = useState("");
  const [myPackVisible, setMyPackVisible] = useState(false);
  const [requestVisible, setRequestVisible] = useState(false);

  const myPacksCol = [
    {
      Header: "Ачааны нэр",
      accessor: "package_name",
    },
    {
      Header: "Ачааны ангилал",
      accessor: "package_category",
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
      Header: "Хадгалагдаж байгаа газар",
      accessor: "loaded_place",
    },
  ];

  const activatedCol = [
    {
      Header: "Байгуулагын нэр",
      accessor: "name",
      Cell: ({ value }) => (!value || value === "0" ? "Хувь хүн" : value),
    },
    {
      Header: "Танилцуулга",
      accessor: "profile_file",
      Cell: ({ value }) => {
        return value ? (
          <button
            onClick={() => saveAs(value, "Байгуулагын танилцуулга")}
            style={{
              border: "1px solid gray",
              background: "dodgerblue",
              color: "white",
              borderRadius: 10,
              padding: "0.4rem 1rem",
            }}
          >
            татах
          </button>
        ) : (
          "---"
        );
      },
    },
    {
      Header: "Хаанаас хаашаа",
      accessor: (data) => data.location_from + "-" + data.location_to,
    },
    {
      Header: "Үнэ",
      accessor: "price_tn",
    },
    {
      Header: "Тээвэрлэх хугацаа (хоног)",
      accessor: (data) => data.date_from + "-" + data.date_to,
    },
    {
      Header: "Багтаамж (м³)",
      accessor: "capacity_metr",
    },
    {
      Header: "Төлөв",
      accessor: "status",
    },
  ];

  return (
    <div className="confirmedUser">
      <div className="confirmedUser__box">
        {/* <h3 className="confirmedUser__box-title">Барааны төрөл</h3>

        <div className="confirmedUser__box-chartbox">
          <PieChart className="confirmedUser__container-tag-chart" />
        </div> */}

        <div className="confirmedUser__box-content">
          <div className="confirmedUser__box-content-item">
            <label className="confirmedUser__box-content-item-number">5</label>
            <div className="confirmedUser__box-content-item-text">
              Ирсэн тээврийн саналууд
            </div>
          </div>

          <div className="confirmedUser__box-content-item">
            <label className="confirmedUser__box-content-item-number">3</label>
            <div className="confirmedUser__box-content-item-text">
              Нийт ачилт хийлгэсэн тоо
            </div>
          </div>

          <div className="confirmedUser__box-content-item">
            <label className="confirmedUser__box-content-item-number">
              218
            </label>
            <div className="confirmedUser__box-content-item-text">
              Нийт хүлээн авсан барааны м3
            </div>
          </div>

          <div className="confirmedUser__box-content-item">
            <label className="confirmedUser__box-content-item-number">2</label>
            <div className="confirmedUser__box-content-item-text">
              Ирсэн нэхэмжлэл
            </div>
          </div>

          <div className="confirmedUser__box-content-item">
            <label className="confirmedUser__box-content-item-number">
              327
            </label>
            <div className="confirmedUser__box-content-item-text">
              Нийт бүртгэлтэй барааны м³
            </div>
          </div>

          <div className="confirmedUser__box-content-item">
            <label className="confirmedUser__box-content-item-number">58</label>
            <div className="confirmedUser__box-content-item-text">
              Хамтран ажиллаж байгаа компани
            </div>
          </div>
        </div>
      </div>

      <div className="confirmedUser__box">
        <h3 className="confirmedUser__box-title">Миний барааны жагсаалт</h3>

        <div className="confirmedUser__box-tableContainer">
          <Table
            mainAxios="/packages"
            axiosURL={`/packages/byAccID/${accountID}/free`}
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

      <div className="confirmedUser__box">
        <h3 className="confirmedUser__box-title">
          Идэвхтэй байгаа тээвэрлэлтийн саналууд
        </h3>

        <div className="confirmedUser__box-tableContainer">
          <Table
            axiosURL="/transport"
            columns={activatedCol}
            rowSize={5}
            setID={setTransportID}
            showModalHandler={setRequestVisible}
            disableAddBtn
            disableSearch
            disablePhoto
            disableDeleteIcon
            disableEditIcon
            enableRequest
          />
        </div>

        <SentRequestModal
          accountID={accountID}
          id={transportID}
          myPacks={
            <Table
              mainAxios="/packages"
              axiosURL={`/packages/byAccID/${accountID}`}
              columns={myPacksCol}
            />
          }
          myPacksCol={myPacksCol}
          visible={requestVisible}
          onCancel={() => setRequestVisible(false)}
        />
      </div>
    </div>
  );
};

export default ConfirmedUser;
