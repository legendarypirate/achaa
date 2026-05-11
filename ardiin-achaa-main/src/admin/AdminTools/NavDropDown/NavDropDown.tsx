// @ts-nocheck
import React, { useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";


const NavDropDown = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  let iconClass = isClicked
    ? `navDropDown-icon navDropDown-icon--clicked`
    : "navDropDown-icon";

  const isClickedChanger = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="navDropDown">
      <button
        onClick={isClickedChanger}
        className={"navDropDown-title " + props.activeDropDown}
      >
        <p>
          {props.title}
          <HiOutlineChevronRight className={iconClass} />
        </p>
      </button>

      <div className="navDropDown-children">{isClicked && props.children}</div>
    </div>
  );
};

export default NavDropDown;