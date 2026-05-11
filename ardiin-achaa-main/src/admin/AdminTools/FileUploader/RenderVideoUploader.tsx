// @ts-nocheck
import React, { useEffect, useRef } from "react";
import NoFile from "../../../assets/no-file.jpg";
import { staticAssetUrl } from "../../../utils/staticAssetUrl";

export const RenderVideoUploader = ({
  center,
  inputID,
  currentFile,
  haveFile,
  handleFileChanger,
}) => {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current?.load();
  }, [currentFile]);

  const mediaSrc = staticAssetUrl(currentFile) || staticAssetUrl(NoFile);

  return (
    <div
      className="fileUplaoder"
      style={{
        margin: center ? "0 auto" : "",
      }}
    >
      <input
        type="file"
        id={inputID}
        accept="video/mp4,video/x-m4v,video/*"
        onChange={handleFileChanger}
      />
      <label
        className="fileUplaoder__label fileUplaoder__label--top"
        htmlFor={inputID}
      >
        Файл сонгох
      </label>

      {haveFile ? (
        <video className="fileUplaoder__video" ref={videoRef} controls muted>
          <source src={typeof currentFile === "string" ? currentFile : mediaSrc} />
        </video>
      ) : (
        <figure className="fileUplaoder__figure fileUplaoder__figure--noIMG">
          <img
            className="fileUplaoder__figure-img"
            src={mediaSrc}
            alt=""
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = staticAssetUrl(NoFile);
            }}
          />
        </figure>
      )}
    </div>
  );
};
