// @ts-nocheck
import React, { cloneElement } from "react";


export const TabContainer = ({ children }) => {
  return <div className="tab">{children}</div>;
};

export const Tabs = ({ children, selectedTab, onChange }) => {
  let tabs = null;

  if (children) {
    if (children?.length >= 2) {
      tabs = children.map((child) => {
        const handleClick = (e) => {
          onChange(e, child.props.value);
        };

        return cloneElement(child, {
          active: child.props.value === selectedTab,
          onClick: handleClick,
        });
      });
    } else {
      tabs = cloneElement(children, {
        active: children.props.value === selectedTab,
        onClick: (e) => {
          onChange(e, children.props.value);
        },
      });
    }
  }

  return <div className="tab__header">{tabs}</div>;
};

export const Tab = ({ image, title, active, onClick }) => {
  return (
    <div
      className={`tab__header-item tab__header-item--${active && "active"}`}
      role="tab"
      onClick={onClick}
    >
      {image && <img src={image} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} />}
      {title}
    </div>
  );
};

export const TabPanel = ({ children, selectedTab, value }) => {
  const hidden = selectedTab !== value;

  return (
    <div className="tab__panel" hidden={hidden}>
      {children}
    </div>
  );
};
