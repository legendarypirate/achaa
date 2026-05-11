// @ts-nocheck
import React from "react";
import NoFile from "../../../assets/no-file.jpg";
import { staticAssetUrl } from "../../../utils/staticAssetUrl";

export const RenderImageUploader = ({
  avatar,
  center,
  inputID,
  currentFile,
  haveFile,
  imgWidth,
  handleFileChanger,
}) => {
  const imgSrc =
    staticAssetUrl(currentFile) || staticAssetUrl(NoFile);
  const fileLabel =
    typeof File !== "undefined" && currentFile instanceof File
      ? currentFile.name
      : null;

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

      {fileLabel}

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
          src={imgSrc}
          alt=""
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = staticAssetUrl(NoFile);
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
