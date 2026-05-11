// @ts-nocheck
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ROUTES } from "../../routes";
import Modal from "../../../tools/Modal/Modal";


const AdminHeader = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const [modalVisible, setModalVisible] = useState(false);

  const signouBtnOnClick = () => {
    setModalVisible(true);
  };

  const modalHandeleCancel = () => {
    setModalVisible(false);
  };

  const modalHandleOK = () => {
    window.localStorage.removeItem("adminToken");

    if (!localStorage.getItem("adminToken")) {
      window.location.replace("/admin");
    }
  };

  const headingOnChecker = () => {
    const pageName = String(pathname).split("/")[3];

    return ROUTES({ id }).map((item) => {
      if (!item) {
        return null;
      } else if (item.dropDown) {
        return item.dropDown.map((dropItem) => {
          if (!dropItem) {
            return null;
          } else {
            if (
              "/" + pageName === dropItem.uri &&
              String(pathname).search(dropItem.uri) > -1
            ) {
              return dropItem.heading;
            } else {
              return null;
            }
          }
        });
      } else {
        if (
          "/" + pageName === item.uri &&
          String(pathname).search(item.uri) > -1
        ) {
          return item.heading;
        } else {
          return null;
        }
      }
    });
  };

  return (
    <header className="adminHeader">
      <Modal
        visible={modalVisible}
        type="alert"
        text="Гарахдаа итгэлтэй байна уу?"
        onOk={modalHandleOK}
        onCancel={modalHandeleCancel}
      />

      <h3 className="adminHeader__heading">{headingOnChecker()}</h3>

      <button className="adminHeader__signoutBtn" onClick={signouBtnOnClick}>
        Гарах
      </button>
    </header>
  );
};

export default AdminHeader;
