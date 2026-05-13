// @ts-nocheck
import React, { useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { Button } from "@/components/ui/button";


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
      <Button
        type="button"
        variant="ghost"
        onClick={isClickedChanger}
        className={"navDropDown-title h-auto w-full justify-start px-0 py-0 text-left font-normal hover:bg-transparent " + props.activeDropDown}
      >
        <p>
          {props.title}
          <HiOutlineChevronRight className={iconClass} />
        </p>
      </Button>

      <div className="navDropDown-children">{isClicked && props.children}</div>
    </div>
  );
};

export default NavDropDown;