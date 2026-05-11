// @ts-nocheck
import React, { useEffect, useState } from "react";
import htmlParser from "html-react-parser";
import Axios from "../../Axios";


const Publicity = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("/publicity/getAll/").then((res) => {
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

          <figcaption className="publicity__container-images-fig-text">
            {htmlParser(item.text)}
          </figcaption>
        </figure>
      );
    });
  };

  return (
    <div className="publicity">
      <div className="publicity__container">
        <h3 className="publicity__container-title">
          Бидний үйл ажиллагааны ил тод байдал
        </h3>

        <p className="publicity__container-text">
          Нийтэд нээлттэй ил тод олон талт оролцоог хангасан тээврийн дэд
          бүтцийг системчилж олон улсад хүлээн зөвшөөрөгдөх үндэсний хүчирхэг
          нэгдэл болход оршино.
        </p>

        <h4 className="publicity__container-subTitle">
          Тогтвортой хамтын ажиллагаа ба хамтралын гэрээ
        </h4>

        <div className="publicity__container-images">{renderData()}</div>
      </div>
    </div>
  );
};

export default Publicity;
