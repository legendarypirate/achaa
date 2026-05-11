// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { BsCalendar2EventFill } from "react-icons/bs";
import Axios from "../../Axios";
import { NEWS_IMAGE_FALLBACK } from "../../constants/media";


const NewsDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(`news/getByID/${id}`).then((res) => {
      if (res.data) {
        setData(res.data);
      }
    });
  }, [id]);

  return (
    <div className="newsDetail">
      <h3 className="newsDetail__title">{data.title}</h3>
      <div className="newsDetail__date">
        <BsCalendar2EventFill />
        {moment(data.created_date).format("YYYY/MM/DD")}
      </div>

      <img
        className="newsDetail__img"
        src={data.image}
        alt=""
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = NEWS_IMAGE_FALLBACK;
        }}
      />

      <CKEditor editor={DecoupledEditor} data={data.information} disabled />
    </div>
  );
};

export default NewsDetail;
