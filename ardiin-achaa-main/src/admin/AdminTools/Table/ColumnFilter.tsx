// @ts-nocheck
import React from "react";


const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <span className="filter">
      <input
        className="filter__column"
        placeholder="Хайх..."
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};

export default ColumnFilter;
