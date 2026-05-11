// @ts-nocheck
import React, { useRef } from "react";
import { NavLink } from "react-router-dom";


const HeaderDrawerToggle = ({ visible, onCancel }) => {
  const modalRef = useRef();

  const closeOnClick = (e) => {
    if (onCancel && modalRef.current === e.target) {
      onCancel(false);
    }
  };

  return visible ? (
    <div className="headerDrawerToggle" ref={modalRef} onClick={closeOnClick}>
      <ul className="headerDrawerToggle__menu">
        <li className="headerDrawerToggle__menu-item">
          <NavLink
            className={(navData) =>
              navData.isActive
                ? "headerDrawerToggle__menu-item-link headerDrawerToggle__menu-item-link--active"
                : "headerDrawerToggle__menu-item-link"
            }
            to="/"
            reloadDocument
          >
            Нүүр хуудас
          </NavLink>
        </li>
        <li className="headerDrawerToggle__menu-item">
          <NavLink
            className={(navData) =>
              navData.isActive
                ? "headerDrawerToggle__menu-item-link headerDrawerToggle__menu-item-link--active"
                : "headerDrawerToggle__menu-item-link"
            }
            to="/about-us"
            reloadDocument
          >
            Бидний тухай
          </NavLink>
        </li>

        <li className="headerDrawerToggle__menu-item">
          <NavLink
            className={(navData) =>
              navData.isActive
                ? "headerDrawerToggle__menu-item-link headerDrawerToggle__menu-item-link--active"
                : "headerDrawerToggle__menu-item-link"
            }
            to="/e-course"
            reloadDocument
          >
            E-Achaa академи
          </NavLink>
        </li>
        <li className="headerDrawerToggle__menu-item">
          <NavLink
            className={(navData) =>
              navData.isActive
                ? "headerDrawerToggle__menu-item-link headerDrawerToggle__menu-item-link--active"
                : "headerDrawerToggle__menu-item-link"
            }
            to="/news/1"
            reloadDocument
          >
            Зар мэдээ мэдээлэл
          </NavLink>
        </li>
        <li className="headerDrawerToggle__menu-item">
          <NavLink
            className={(navData) =>
              navData.isActive
                ? "headerDrawerToggle__menu-item-link headerDrawerToggle__menu-item-link--active"
                : "headerDrawerToggle__menu-item-link"
            }
            to="/publicity"
            reloadDocument
          >
            Ил тод байдал
          </NavLink>
        </li>
      </ul>
    </div>
  ) : null;
};

export default HeaderDrawerToggle;
