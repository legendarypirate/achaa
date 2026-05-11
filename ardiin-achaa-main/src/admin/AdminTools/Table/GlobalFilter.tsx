// @ts-nocheck
import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <input
      className="rcTable__globalFilter"
      placeholder="Хайх..."
      value={filter || ""}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
    />
  );
};

export default GlobalFilter;
