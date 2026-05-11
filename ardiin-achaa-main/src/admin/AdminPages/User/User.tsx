// @ts-nocheck
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import moment from "moment";
import NoImage from "../../../assets/no-image.jpg";
import NoFile from "../../../assets/no-file.jpg";
import Table from "../../AdminTools/Table/Table";
import UserModal from "./UserModal";

const User = () => {
  const [id, setID] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const membershipChecker = (membership) => {
    let star = null;
    switch (membership) {
      case 1:
        star = (
          <>
            <AiFillStar color="orange" size={24} />
            <AiOutlineStar color="gray" size={24} />
            <AiOutlineStar color="gray" size={24} />
          </>
        );
        break;
      case 2:
        star = (
          <>
            <AiFillStar color="orange" size={24} />
            <AiFillStar color="orange" size={24} />
            <AiOutlineStar color="gray" size={24} />
          </>
        );
        break;
      case 3:
        star = (
          <>
            <AiFillStar color="orange" size={24} />
            <AiFillStar color="orange" size={24} />
            <AiFillStar color="orange" size={24} />
          </>
        );
        break;
      default:
        star = (
          <>
            <AiOutlineStar color="gray" size={24} />
            <AiOutlineStar color="gray" size={24} />
            <AiOutlineStar color="gray" size={24} />
          </>
        );
    }

    return star;
  };

  const daysAgoTimer = (expiredDate) => {
    const today = moment().format("YYYY-MM-DD HH:mm:ss");
    const expired = moment(expiredDate);

    let minus = 0;
    if (expiredDate) {
      minus = expired.diff(today, "days");
    }

    return minus;
  };

  const column = [
    {
      Header: "Зураг",
      accessor: "image",
      Cell: ({ value }) => {
        return (
          <img
            style={{
              width: 68,
              height: 68,
              borderRadius: 60,
              objectFit: "cover",
            }}
            src={value ? value : NoImage}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = NoFile;
            }}
          />
        );
      },
    },
    {
      Header: "Овог нэр",
      accessor: (data) =>
        String(data.lastname).charAt(0) + ". " + data.firstname,
    },
    {
      Header: "Цахим шуудан",
      accessor: "email",
    },
    {
      Header: "Гишүүний эрх",
      accessor: (data) => membershipChecker(data.membership),
    },
    {
      Header: "Үлдсэн хоног",
      accessor: (data) => daysAgoTimer(data.expired_date),
    },
  ];

  const modalOnCancel = () => {
    setID("");
    setModalVisible(false);
  };

  return (
    <>
      <Table
        mainAxios="/accounts"
        axiosURL="/accounts/1"
        columns={column}
        setID={setID}
        showModalHandler={setModalVisible}
        disablePhoto
        enableMemberConfirm
      />

      <UserModal id={id} visible={modalVisible} onCancel={modalOnCancel} />
    </>
  );
};

export default User;
