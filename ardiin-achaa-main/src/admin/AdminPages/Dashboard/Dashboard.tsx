// @ts-nocheck
import React from "react";
// import PieChart from "./PieChart/PieChart";


const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* <div className="dashboard__type">
        <h3>Барааны төрөл</h3>

        <PieChart />
      </div> */}

      <div className="dashboard__box">
        <div className="dashboard__box__item">
          <div className="dashboard__box__item-number">5</div>
          <div className="dashboard__box__item-text">
            Ирсэн тээврийн саналууд
          </div>
        </div>

        <div className="dashboard__box__item">
          <div className="dashboard__box__item-number">3</div>
          <div className="dashboard__box__item-text">
            Нийт ажилт хийлгэсэн тоо
          </div>
        </div>

        <div className="dashboard__box__item">
          <div className="dashboard__box__item-number">218</div>
          <div className="dashboard__box__item-text">
            Нийт хүлээн авсан ачаа барааны м3
          </div>
        </div>

        <div className="dashboard__box__item">
          <div className="dashboard__box__item-number">2</div>
          <div className="dashboard__box__item-text">Ирсэн нэхэмжлэл</div>
        </div>

        <div className="dashboard__box__item">
          <div className="dashboard__box__item-number">327</div>
          <div className="dashboard__box__item-text">
            Нийт бүртгэлтэй ачаа барааны м3
          </div>
        </div>

        <div className="dashboard__box__item">
          <div className="dashboard__box__item-number">58</div>
          <div className="dashboard__box__item-text">
            Хамтран ажиллаж байгаа компани
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
