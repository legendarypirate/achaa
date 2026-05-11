// @ts-nocheck
import React from "react";
import NoFile from "../../../assets/no-file.jpg";

export const RenderImageUploader = ({
  avatar,
  center,
  inputID,
  currentFile,
  haveFile,
  imgWidth,
  handleFileChanger,
}) => {
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
        accept="image/jpeg, image/png, image/svg+xml"
        onChange={handleFileChanger}
      />
      {avatar || (
        <label
          className="fileUplaoder__label fileUplaoder__label--top"
          htmlFor={inputID}
        >
          Файл сонгох
        </label>
      )}

      {currentFile.name}

      <figure
        style={{ width: imgWidth }}
        className={`fileUplaoder__figure ${
          haveFile || "fileUplaoder__figure--noIMG"
        } ${avatar && "fileUplaoder__figure--avatar"}`}
      >
        <img
          className={`fileUplaoder__figure-img ${
            avatar && "fileUplaoder__figure-img--avatar"
          }`}
          src={currentFile}
          alt="no file" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
          onError={(event) => {
            event.target.onerror = null;
            event.target.src = NoFile;
          }}
        />
      </figure>

      {avatar && (
        <label
          className="fileUplaoder__label fileUplaoder__label--bottom"
          htmlFor={inputID}
        >
          Зураг сонгох
        </label>
      )}
    </div>
  );
};
