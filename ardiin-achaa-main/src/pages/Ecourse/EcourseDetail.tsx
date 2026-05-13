// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsCameraVideoFill, BsFillPlayCircleFill } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import Teacher from "../../assets/teacher.jpg";
import Axios from "../../Axios";
import { staticAssetUrl } from "../../utils/staticAssetUrl";


const EcourseDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    Axios.get(`/academy/getByID/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  return (
    <div className="eCourseDetail">
      <div className="eCourseDetail__content">
        <div className="eCourseDetail__content-background">
          <video
            className="eCourseDetail__content-background-intro"
            controls
            autoPlay
            loop
          >
            <source src="/ecourse-intro.mp4" type="video/mp4" />
          </video>
          {/* <img
            className="eCourseDetail__content-background-intro"
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
            src={data.image}
          /> */}

          <div className="eCourseDetail__content-count">
            <div className="eCourseDetail__content-count-item">
              <BsCameraVideoFill />
              <div className="eCourseDetail__content-count-item-text">
                10 видео хичээл
              </div>
            </div>

            <div className="eCourseDetail__content-count-item">
              <BsFillPlayCircleFill />
              <div className="eCourseDetail__content-count-item-text">
                178 удаа үзэгдсэн
              </div>
            </div>
          </div>
        </div>

        <h3 className="eCourseDetail__content-name">{data.title}</h3>
        <p className="eCourseDetail__content-detail">
          <CKEditor editor={DecoupledEditor} data={data.information} disabled />
        </p>
      </div>

      <div className="eCourseDetail__teacher">
        <img
          className="eCourseDetail__teacher-pic"
          src={staticAssetUrl(Teacher)}
          alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
        />
        <label className="eCourseDetail__teacher-name">
          Багш: <b>Б.Цэцэг</b>
        </label>

        <div className="eCourseDetail__teacher-status">
          <AiFillStar color="orange" fontSize={20} />
          <AiFillStar color="orange" fontSize={20} />
          <AiFillStar color="orange" fontSize={20} />
          <AiOutlineStar color="gray" fontSize={20} />
          <AiOutlineStar color="gray" fontSize={20} />
        </div>

        <p className="eCourseDetail__teacher-text ">
          in publishing and graphic design, Lorem ipsum is placeholder text
          commonly used to demonstrate the visual from of a document or a
          typeface without relying on meaningful contnet. Lorem ipsum may be
          used as a placeholder before the final copy is available.
        </p>
      </div>
    </div>
  );
};

export default EcourseDetail;
