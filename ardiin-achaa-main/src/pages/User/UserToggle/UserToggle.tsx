// @ts-nocheck
import React, { useRef } from "react";


const UserToggle = ({ visible, renderMenu, onCancel }) => {
  const toggleRef = useRef();

  const closeOnClick = (e) => {
    if (onCancel && toggleRef.current === e.target) {
      onCancel();
    }
  };

  return visible ? (
    <div className="userToggle" ref={toggleRef} onClick={closeOnClick}>
      <div className="userToggle__content">{renderMenu(true)}</div>
    </div>
  ) : null;
};

export default UserToggle;
