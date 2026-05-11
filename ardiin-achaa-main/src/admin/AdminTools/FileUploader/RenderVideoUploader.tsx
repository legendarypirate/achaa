// @ts-nocheck
import React, { useEffect, useRef } from "react";
import NoFile from "../../../assets/no-file.jpg";

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
          <source src={currentFile} />
        </video>
      ) : (
        <figure className="fileUplaoder__figure fileUplaoder__figure--noIMG">
          <img
            className="fileUplaoder__figure-img"
            src={currentFile}
            alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = NoFile;
            }}
          />
        </figure>
      )}
    </div>
  );
};
