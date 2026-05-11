// @ts-nocheck
import React, { useRef } from "react";


const NewsToggle = ({ visible, renderMenu, onCancel }) => {
  const toggleRef = useRef();

  const closeOnClick = (e) => {
    if (onCancel && toggleRef.current === e.target) {
      onCancel();
    }
  };

  return visible ? (
    <div className="newsToggle" ref={toggleRef} onClick={closeOnClick}>
      <div className="newsToggle__content">{renderMenu(true)}</div>
    </div>
  ) : null;
};

export default NewsToggle;
