// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../../Axios";


const AboutCourse = ({ shouldAutoplayVideo = false }) => {
  const [academyVideo, setAcademyVideo] = useState("");

  useEffect(() => {
    let isMounted = true;

    Axios.get("/introBanner/getByType/academyVideo")
      .then((res) => {
        if (isMounted) {
          setAcademyVideo(res.data?.file_url || "");
        }
      })
      .catch(() => {
        /* API unreachable in dev — avoid unhandled rejection */
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="course">
      <video
        className="course__video"
        controls
        autoPlay={shouldAutoplayVideo}
        loop
        muted
        playsInline
        preload="metadata"
      >
        {academyVideo ? <source src={academyVideo} /> : null}
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

export default React.memo(AboutCourse);
