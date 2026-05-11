// @ts-nocheck
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BsChevronRight, BsDot } from "react-icons/bs";


const DropDown = ({ icon, title, content }) => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    content.map((item) => {
      if (item.uri && String(pathname).search(item.uri) > -1) {
        return setVisible(true);
      } else {
        return null;
      }
    });
  }, [content, pathname]);

  const isOpenedOnCheck = () => {
    let isOpened = false;

    content.map((item) => {
      if (item.uri && String(pathname).search(item.uri) > -1) {
        isOpened = true;
        return isOpened;
      } else {
        return isOpened;
      }
    });

    return isOpened;
  };

  const renderContent = () => {
    return content.map((item, index) => {
      if (item.uri) {
        return (
          <li key={index} className="dropDown__item">
            <NavLink
              className={(navData) => {
                if (navData.isActive) {
                  return "dropDown__item-link dropDown__item-link--active";
                } else {
                  return "dropDown__item-link";
                }
              }}
              to={"/admin" + item.uri}
            >
              <BsDot size={20} />
              {item.name}
            </NavLink>
          </li>
        );
      } else {
        return <div key={index}>{item.component}</div>;
      }
    });
  };

  return (
    <div className={`${visible && "dropDown--showed"}`}>
      <div
        className={`dropDown  ${isOpenedOnCheck() && "dropDown--opened"}`}
        onClick={() => setVisible(!visible)}
      >
        <div className="dropDown__icon">{icon}</div>

        <label className="dropDown__title">
          {title}
          <BsChevronRight
            className={visible ? "dropDown--clicked" : "dropDown--noClicked"}
          />
        </label>
      </div>

      {visible && <div className="dropDown__content">{renderContent()}</div>}
    </div>
  );
};

export default DropDown;
