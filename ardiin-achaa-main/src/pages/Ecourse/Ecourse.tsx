// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsCameraVideoFill, BsFillPlayCircleFill } from "react-icons/bs";
import htmlParser from "html-react-parser";
import Teacher from "../../assets/teacher.jpg";
import Axios from "../../Axios";
import { staticAssetUrl } from "../../utils/staticAssetUrl";


const Ecourse = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("/academy/getAll").then((res) => {
      setData(res.data);
    });
  }, []);

  const renderData = () => {
    return data.map((item, index) => {
      return (
        <Link
          key={index}
          className="ecourse__set"
          to={`/e-course/detail/${item.id}`}
        >
          <img className="ecourse__set-img" src={item.image} alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }} />

          <div className="ecourse__set-content">
            <div className="ecourse__set-content-teacher">
              <img
                className="ecourse__set-content-teacher-pic"
                src={staticAssetUrl(Teacher)}
                alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
              />
              <label className="ecourse__set-content-teacher-name">Б.Бат</label>
            </div>

            <span className="ecourse__set-content-title">
              {htmlParser(item.title)}
            </span>

            <div className="ecourse__set-content-count">
              <div className="ecourse__set-content-count-item">
                <BsCameraVideoFill />

                <div className="ecourse__set-content-count-item-text">
                  10 видео хичээл
                </div>
              </div>

              <div className="ecourse__set-content-count-item">
                <BsFillPlayCircleFill />

                <div className="ecourse__set-content-count-item-text">
                  178 удаа үзэгдсэн
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="ecourse">
      <div className="ecourse__container">{renderData()}</div>
    </div>
  );
};

export default Ecourse;
