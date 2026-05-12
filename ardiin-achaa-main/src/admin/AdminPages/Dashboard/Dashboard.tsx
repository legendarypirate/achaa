// @ts-nocheck
import React from "react";

const STATS = [
  { value: "5", label: "Ирсэн тээврийн саналууд" },
  { value: "3", label: "Нийт ажилт хийлгэсэн тоо" },
  { value: "218", label: "Нийт хүлээн авсан ачаа барааны м3" },
  { value: "2", label: "Ирсэн нэхэмжлэл" },
  { value: "327", label: "Нийт бүртгэлтэй ачаа барааны м3" },
  { value: "58", label: "Хамтран ажиллаж байгаа компани" },
];

const Dashboard = () => {
  return (
    <div className="dashboard w-full">
      <div className="dashboard__box">
        {STATS.map((row) => (
          <div key={row.label} className="dashboard__box__item">
            <div className="dashboard__box__item-number">{row.value}</div>
            <div className="dashboard__box__item-text">{row.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
