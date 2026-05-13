// @ts-nocheck
import { React, useCallback, useEffect, useState } from "react";
import OpenPlatform from "../../assets/open-platform.png";
import Axios from "../../Axios";
import { staticAssetUrl } from "../../utils/staticAssetUrl";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Modal from "../../tools/Modal/Modal";

import Express from "../../components/HomeComp/Express/Express";
import Banner from "../../components/HomeComp/Banner/Banner";
import AboutCourse from "../../components/HomeComp/AboutCourse/AboutCourse";
import Organization from "../../components/HomeComp/Organizations/Organization";
import Calculator from "../../components/HomeComp/Calculator/Calculator";


const Home = () => {
  const [homeVideo, setHomeVideo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const isNarrowScreen = useMediaQuery("(max-width: 768px)");
  const shouldAutoplayVideo = !isCoarsePointer && !isNarrowScreen;

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    Axios.get("/introBanner/getByType/homeVideo")
      .then((res) => {
        if (isMounted) {
          setHomeVideo(res.data?.file_url || "");
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
    <main className="home">
      <div className="home__face">
        <div className="home__face-info">
          <h2 className="home__face-info-title">"E-ACHAA OPEN PLATFORM"</h2>

          <p className="home__face-info-text">
            Бид ачаа тээвэр зохицуулалтын чиглэлээр нээлттэй, олон нийтийн
            компани буюу хувьцаат компанийн зохион байгуулалтаар ажиллаж байна.
            Үндсэн 500 гишүүн, энгийн 100,000 гаруй гишүүн элсүүлхээр ажиллаж
            байна.
          </p>

          <button
            onClick={() => {
              setModalVisible(true);
            }}
            className="home__face-info-link"
          >
            Дэлгэрэнгүй
          </button>
          <Modal visible={modalVisible} onCancel={closeModal}>
            <img
              className="home__face-info-modalIMG"
              src={staticAssetUrl(OpenPlatform)}
              alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
            />
          </Modal>
        </div>

        <video
          className="home__face-video"
          controls
          autoPlay={shouldAutoplayVideo}
          loop
          muted
          playsInline
          preload="metadata"
        >
          {homeVideo ? <source src={homeVideo} /> : null}
        </video>
      </div>

      <Express />
      <Banner isNarrowScreen={isNarrowScreen} />
      <AboutCourse shouldAutoplayVideo={shouldAutoplayVideo} />
      <Organization isNarrowScreen={isNarrowScreen} />
      <Calculator />
    </main>
  );
};

export default Home;
