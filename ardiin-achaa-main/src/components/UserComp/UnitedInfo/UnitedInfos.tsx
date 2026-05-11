// @ts-nocheck
import React, { useState } from "react";
import Table from "../../../admin/AdminTools/Table/Table";
import UnitedModal from "./UnitedModal";


const UnitedInfos = () => {
  const [id, setID] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const column = [
    {
      Header: "Компанийн нэр",
      accessor: "name",
    },
    {
      Header: "Утас",
      accessor: "phone",
    },
    {
      Header: "Цахим шуудан",
      accessor: "email",
    },
    {
      Header: "Үнэлгээ",
      accessor: "rate",
    },
  ];

  return (
    <div className="unitedInfo">
      <h3 className="unitedInfo__heading">Мэдээллийн нэгдсэн сан</h3>

      <div className="unitedInfo__tableContainer">
        <Table
          axiosURL="/partnerRate"
          columns={column}
          setID={setID}
          showModalHandler={setModalVisible}
          disableAddBtn
          disableDeleteIcon
          disablePhoto
        />
      </div>

      <UnitedModal
        id={id}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  );
};

export default UnitedInfos;
