// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../../Axios";


const AboutCourse = () => {
  const videoRef = useRef();
  const [academyVideo, setAcademyVideo] = useState("");

  useEffect(() => {
    let isMounted = true;
    videoRef.current?.load();

    Axios.get("/introBanner/getByType/academyVideo").then((res) => {
      if (isMounted) {
        setAcademyVideo(res.data.file_url);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="course">
      <video
        className="course__video"
        ref={videoRef}
        controls
        autoPlay
        loop
        muted
      >
        <source src={academyVideo} />
      </video>

      <div className="course__para">
        <h3 className="course__para-title">E-ACHAA СУРГАЛТЫН ТАЛААРХ</h3>
        
        <p className="course__para-text">
          Цаг хугацаа орон зайг үл харгалзан цахим орчинд хязгааргүй суралц
        </p>

        <Link to="/e-course" className="course__para-link">
          Дэлгэрэнгүй
        </Link>
      </div>
    </div>
  );
};

export default AboutCourse;
