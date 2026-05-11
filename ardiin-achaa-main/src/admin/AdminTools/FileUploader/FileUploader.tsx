// @ts-nocheck
import { useEffect, useState } from "react";
import { RenderImageUploader } from "./RenderImageUploader";
import { RenderVideoUploader } from "./RenderVideoUploader";
import NoImage from "../../../assets/no-image.jpg";
import NoVideo from "../../../assets/no-video.jpg";


const FileUploader = ({ file, getFile, avatar, video, center, imgWidth }) => {
  const [inputID, setInputID] = useState("");

  const [currentFile, setCurrentFile] = useState(NoImage);
  const [haveFile, setHaveFile] = useState(false);

  useEffect(() => {
    setInputID(Math.random());

    if (file) {
      setHaveFile(true);
      setCurrentFile(file);
    } else {
      setHaveFile(false);

      if (video) {
        setCurrentFile(NoVideo);
      } else {
        setCurrentFile(NoImage);
      }
    }
  }, [file, video]);

  const handleFileChanger = (e) => {
    let fileReader = new FileReader();
    let uploadingFile = e.target.files[0];

    fileReader.onloadend = () => {
      setHaveFile(true);

      getFile(uploadingFile);
      setCurrentFile(fileReader.result);
    };

    if (uploadingFile) {
      fileReader.readAsDataURL(uploadingFile);
    }
  };

  if (video) {
    return RenderVideoUploader({
      center,
      inputID,
      currentFile,
      haveFile,
      handleFileChanger,
    });
  } else {
    return RenderImageUploader({
      avatar,
      center,
      inputID,
      currentFile,
      haveFile,
      imgWidth,
      handleFileChanger,
    });
  }
};

export default FileUploader;
