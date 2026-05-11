// @ts-nocheck
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { RiUserFill, RiBuilding2Fill, RiUserStarFill } from "react-icons/ri";
import DebitModal from "./DebitModal/DebitModal";


const SelectMembership = () => {
  const { id } = useParams();

  const [membership, setMembership] = useState(0);
  const [price, setPrice] = useState(null);
  const [invoiceDescription, setInvoiceDescription] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="membership">
      <DebitModal
        id={id}
        membership={membership}
        price={price}
        invoiceDescription={invoiceDescription}
        visible={modalVisible}
        onCancel={() => {
          setPrice(null);
          setInvoiceDescription("");
          setModalVisible(false);
        }}
      />

      <div className="membership__choose">
        <div className="membership__choose-top">
          <div className="membership__choose-header">
            <h4 className="membership__choose-header-title">
              Гишүүнчлэлийн эрх сонгох
            </h4>

            <div className="membership__choose-header-stars">
              <AiFillStar color="orange" size={24} />
              <AiFillStar color="gray" size={24} />
              <AiFillStar color="gray" size={24} />
            </div>
          </div>

          <div className="membership__choose-box">
            <RiUserFill size={40} />
            <label className="membership__choose-box-text">
              Энгийн хэрэглэгч
            </label>
          </div>

          <ol className="membership__choose-text">
            <li className="membership__choose-text-item">
              30 хоногийн хугацаанд сайтын үйлчилгээг авах
            </li>
            <li className="membership__choose-text-item">
              Шуурхай мэдээллийн группт гишүүн болох эрх
            </li>
            <li className="membership__choose-text-item">
              Ачаа тээврийн үйлчилгээ эрхлэгч байгууллага хувь хүмүүсийн
              мэдээлэл авах эрх /Хязгаартай 10/
            </li>
            <li className="membership__choose-text-item">
              Идэвхитэй тээврийн мэдээлэл авч холбоо тогтоох боломж /Хязгаартай
              10/
            </li>
            <li className="membership__choose-text-item">
              E-Achaa academy Үнэгүй хичээлийг үзэх
            </li>
            <li className="membership__choose-text-item">
              Таньд хэрэгтэй холбоосууд харах эрх /хязгаартай/
            </li>
            <li className="membership__choose-text-item">
              Нэгдлийн EVENT арга хэмжээнд оролцох эрх /30 хоногт дотор/
            </li>
          </ol>
        </div>

        <div className="membership__choose-bottom">
          <div className="membership__choose-price">19'900₮ /НӨАТ багтсан/</div>
          <button
            className="membership__choose-selectBtn"
            onClick={() => {
              setMembership(1);
              setInvoiceDescription("Энгийн хэрэглэгч");
              setPrice(19900);
              setModalVisible(true);
            }}
          >
            Сонгох
          </button>
        </div>
      </div>

      <div className="membership__choose">
        <div className="membership__choose-top">
          <div className="membership__choose-header">
            <h4 className="membership__choose-header-title">
              Гишүүнчлэлийн эрх сонгох
            </h4>

            <div className="membership__choose-header-stars">
              <AiFillStar color="orange" size={24} />
              <AiFillStar color="orange" size={24} />
              <AiFillStar color="gray" size={24} />
            </div>
          </div>

          <div className="membership__choose-box">
            <RiBuilding2Fill size={40} />
            <label className="membership__choose-box-text">
              Байгуулгын эрх
            </label>
          </div>

          <ol className="membership__choose-text">
            <li className="membership__choose-text-item">
              365 хоногийн хугацаанд сайтын үйлчилгээг авах
            </li>
            <li className="membership__choose-text-item">
              Шуурхай мэдээллийн группт гишүүн болох эрх
            </li>
            <li className="membership__choose-text-item">
              Ачаа тээврийн үйлчилгээ эрхлэгч байгууллага хувь хүмүүсийн
              мэдээлэл авах эрх /Хязгаартай 100/
            </li>
            <li className="membership__choose-text-item">
              Идэвхитэй тээврийн мэдээлэл авч холбоо тогтоох боломж /Хязгаартай
              100/
            </li>
            <li className="membership__choose-text-item">
              E-Achaa academy Үнэгүй хичээлийг үзэх
            </li>
            <li className="membership__choose-text-item">
              Таньд хэрэгтэй холбоосууд харах эрх /хязгааргүй/
            </li>

            <li className="membership__choose-text-item">
              Нэгдлийн EVENT арга хэмжээнд оролцох эрх /365 хоногт дотор/
            </li>
            <li className="membership__choose-text-item">
              Тээвэр захих /эргэх холбоо үйлчилгээ/
            </li>
            <li className="membership__choose-text-item">
              Сурталчилгааны баннер /Нүүр талд 3 хоног/
            </li>
          </ol>
        </div>

        <div className="membership__choose-bottom">
          <div className="membership__choose-price">
            199'900₮ /НӨАТ багтсан/
          </div>
          <button
            className="membership__choose-selectBtn"
            onClick={() => {
              setMembership(2);
              setInvoiceDescription("Байгуулгын эрх");
              setPrice(199900);
              setModalVisible(true);
            }}
          >
            Сонгох
          </button>
        </div>
      </div>

      <div className="membership__choose">
        <div className="membership__choose-top">
          <div className="membership__choose-header">
            <h4 className="membership__choose-header-title">
              Гишүүнчлэлийн эрх сонгох
            </h4>

            <div className="membership__choose-header-stars">
              <AiFillStar color="orange" size={24} />
              <AiFillStar color="orange" size={24} />
              <AiFillStar color="orange" size={24} />
            </div>
          </div>

          <div className="membership__choose-box">
            <RiUserStarFill size={40} />
            <label className="membership__choose-box-text">
              Тусгай гишүүний эрх
            </label>
          </div>

          <ol className="membership__choose-text">
            <li className="membership__choose-text-item">
              365 хоногийн хугацаанд сайтын үйлчилгээг авах
            </li>
            <li className="membership__choose-text-item">
              Шуурхай мэдээллийн группт гишүүн болох эрх
            </li>
            <li className="membership__choose-text-item">
              Ачаа тээврийн үйлчилгээ эрхлэгч байгууллага хувь хүмүүсийн
              мэдээлэл авах эрх /Хязгааргүй/
            </li>
            <li className="membership__choose-text-item">
              Идэвхитэй тээврийн мэдээлэл авч холбоо тогтоох боломж /Хязгааргүй/
            </li>
            <li className="membership__choose-text-item">
              E-Achaa academy төлбөртэй хичээл үзэх
            </li>
            <li className="membership__choose-text-item">
              Таньд хэрэгтэй холбоосууд харах эрх /хязгааргүй/
            </li>

            <li className="membership__choose-text-item">
              Нэгдлийн EVENT арга хэмжээнд оролцох эрх /365 хоногт дотор/
            </li>
            <li className="membership__choose-text-item">
              Тээвэр захих /эргэх холбоо үйлчилгээ/
            </li>
            <li className="membership__choose-text-item">
              Сурталчилгааны баннер /Нүүр талд 3 хоног/
            </li>
            <li className="membership__choose-text-item">
              Ачаа бүрлүүлэлтийн /Зар сурталчилгаа/
            </li>
            <li className="membership__choose-text-item">
              Сошиал медиа групп-т сурталчилгааны пост оруулах /нэг удаа/
            </li>
          </ol>
        </div>

        <div className="membership__choose-bottom">
          <div className="membership__choose-price">
            499'900₮ /НӨАТ багтсан/
          </div>
          <button
            className="membership__choose-selectBtn"
            onClick={() => {
              setMembership(3);
              setInvoiceDescription("Тусгай гишүүн");
              setPrice(499900);
              setModalVisible(true);
            }}
          >
            Сонгох
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectMembership;
