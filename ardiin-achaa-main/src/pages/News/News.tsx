// @ts-nocheck
import React, { useState, useEffect } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { RiMenuUnfoldFill } from "react-icons/ri";
import Axios from "../../Axios";
import NewsComp from "../../components/NewsComp/NewsComp";
import NewsDetail from "../../components/NewsComp/NewsDetail";
import NewsToggle from "./NewsToggle/NewsToggle";


const News = () => {
  const [sorts, setSorts] = useState([]);

  const [isToggleTop, setIsToggleTop] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsToggleTop(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    Axios.get("news/sort/getAll").then((res) => {
      if (res.data) {
        setSorts(res.data);
      }
    });
  }, []);

  const renderSorts = (isToggle) => {
    return sorts.map((item, index) => {
      return (
        <NavLink
          key={index}
          className={({ isActive }) =>
            [
              "news__menu-item",
              isActive ? "news__menu-item--active" : "",
              isToggle ? "news__menu-item--toggle" : "",
              isToggle && isActive ? "news__menu-item--toggle--active" : "",
            ]
              .filter(Boolean)
              .join(" ")
          }
          onClick={() => setShowToggle(false)}
          to={`/news/${item.id}`}
        >
          {item.sort}
        </NavLink>
      );
    });
  };

  return (
    <div className="news">
      <h1 className="news__title">Мэдээ, Мэдээлэл</h1>
      <aside className="news__menu">{renderSorts()}</aside>

      <div
        className={`news--drawerToggle ${
          isToggleTop ? "news--drawerToggle--top" : ""
        }`}
      >
        <button
          className="news--drawerToggle-btn"
          onClick={() => setShowToggle(true)}
        >
          <RiMenuUnfoldFill />
        </button>
        <NewsToggle
          visible={showToggle}
          renderMenu={renderSorts}
          onCancel={() => setShowToggle(false)}
        />
      </div>

      <div className="news__content">
        <Routes>
          <Route path="/:sortID" element={<NewsComp />} />
          <Route path="/:sortID/detail/:id" element={<NewsDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default News;
