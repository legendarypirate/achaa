// @ts-nocheck
import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";

const ApprovedPartner = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("/partner/confirmed/getAll/").then((res) => {
      setData(res.data);
    });
  }, []);

  const renderData = () => {
    return data.map((item, index) => {
      return (
        <figure className="publicity__container-images-fig" key={index}>
          <img
            className="publicity__container-images-fig-img"
            src={item.image}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          <div>{item.phone}</div>
          <figcaption className="publicity__container-images-fig-text">
            {item.text}
          </figcaption>
        </figure>
      );
    });
  };
  return (
    <div>
      <div>
        <div className="publicity__container-images">{renderData()}</div>
      </div>
    </div>
  );
};

export default ApprovedPartner;
