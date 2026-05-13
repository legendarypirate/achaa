// @ts-nocheck
import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";
import FileUploader from "../../AdminTools/FileUploader/FileUploader";
import { Button } from "@/components/ui/button";

type IntroBannerItem = {
  file_url?: string;
  type?: string;
};

const IntroBanner = () => {
  const [homeData, setHomeData] = useState<IntroBannerItem>({});
  const [academyData, setAcademyData] = useState<IntroBannerItem>({});
  const [bannerData, setBannerData] = useState<IntroBannerItem>({});

  const [homeVideoFile, setHomeDataFile] = useState<File | null>(null);
  const [academyVideoFile, setAcademyVideoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  useEffect(() => {
    Axios.get("/introBanner/getByType/homeVideo").then((res) => {
      setHomeData(res.data);
    });

    Axios.get("/introBanner/getByType/academyVideo").then((res) => {
      setAcademyData(res.data);
    });

    Axios.get("/introBanner/getByType/banner").then((res) => {
      setBannerData(res.data);
    });
  }, []);

  const saveOnClick = (type) => {
    const formData = new FormData();

    let fileURL = "";
    let FILE: File | null = null;

    if (type === "homeVideo") {
      fileURL = homeData.file_url;
      FILE = homeVideoFile;
    } else if (type === "academyVideo") {
      fileURL = academyData.file_url;
      FILE = academyVideoFile;
    } else if (type === "banner") {
      fileURL = bannerData.file_url;
      FILE = bannerFile;
    }

    formData.append("type", type);
    formData.append("fileURL", fileURL);
    if (FILE) {
      formData.append("file", FILE);
    }

    let routeEnd = "";
    if (
      homeData.type === type ||
      academyData.type === type ||
      bannerData.type === type
    ) {
      routeEnd = "update";
    } else {
      routeEnd = "insert";
    }

    Axios.post(`/introBanner/${routeEnd}`, formData).then((res) => {
      if (res.data.message === "success") {
        alert("Амжилттай хадгалагдлаа.");
        window.location.reload();
      } else {
        alert("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
        window.location.reload();
      }
    });
  };

  return (
    <div className="introBanner">
      <div className="introBanner__box">
        <h3 className="introBanner__box-title">Нүүрний бичлэг:</h3>
        <FileUploader
          file={homeData.file_url}
          getFile={setHomeDataFile}
          video
        />
        <Button type="button" onClick={() => saveOnClick("homeVideo")}>
          хадгалах
        </Button>
      </div>

      <div className="introBanner__box">
        <h3 className="introBanner__box-title">Сургалтын бичлэг:</h3>
        <FileUploader
          file={academyData.file_url}
          getFile={setAcademyVideoFile}
          video
        />
        <Button type="button" onClick={() => saveOnClick("academyVideo")}>
          хадгалах
        </Button>
      </div>

      <div className="introBanner__box">
        <h3 className="introBanner__box-title">Баннер:</h3>
        <FileUploader file={bannerData.file_url} getFile={setBannerFile} />
        <Button type="button" onClick={() => saveOnClick("banner")}>
          хадгалах
        </Button>
      </div>
    </div>
  );
};

export default IntroBanner;
