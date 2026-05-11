// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import htmlParser from "html-react-parser";
import ReactPaginate from "react-paginate";
import { BsCalendar2EventFill } from "react-icons/bs";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";
import Axios from "../../Axios";
import { NEWS_IMAGE_FALLBACK } from "../../constants/media";


function NewsItem({ sortID, data }) {
  return (
    data &&
    data.map((item, index) => (
      <Link
        key={index}
        className="newsComp"
        to={`/news/${sortID}/detail/${item.id}`}
      >
        <img
          className="newsComp__image"
          src={item.image}
          alt=""
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = NEWS_IMAGE_FALLBACK;
          }}
        />

        <div className="newsComp__content">
          <h3 className="newsComp__content-title">{htmlParser(item.title)}</h3>
          <div className="newsComp__content-date">
            <BsCalendar2EventFill />
            {moment(item.created_date).format("YYYY/MM/DD")}
          </div>

          <div className="newsComp__content-info">
            {htmlParser(item.information)}
          </div>
        </div>
      </Link>
    ))
  );
}

const NewsComp = () => {
  const { sortID } = useParams();
  const itemsPerPage = 4;

  const [device, setDevice] = useState("");
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (window.innerWidth <= 430) {
      setDevice("mobile");
    } else {
      setDevice("web");
    }

    Axios.get(
      `news/getBySort/${sortID}/offset/${itemOffset}/limit/${itemsPerPage}`
    ).then((res) => {
      setData(res.data);
    });

    Axios.get(`news/getCountBySort/${sortID}`).then((res) => {
      setDataCount(res.data.count);
      setPageCount(Math.ceil(res.data.count / itemsPerPage));
    });
  }, [sortID, itemOffset, itemsPerPage]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % dataCount;

    setItemOffset(newOffset);
  };

  return data.length > 0 ? (
    <>
      <NewsItem sortID={sortID} data={data} />

      <ReactPaginate
        breakLabel="..."
        nextLabel={<TiChevronRight />}
        previousLabel={<TiChevronLeft />}
        pageRangeDisplayed={device === "mobile" ? 2 : 5}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        /*~~~ClassNames~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        containerClassName="pagContainer"
        nextClassName="pagContainer__nextBtn"
        previousClassName="pagContainer__prevBtn"
        activeLinkClassName="pagContainer__active"
        disabledClassName="pagContainer__disabled"
        pageClassName="pagContainer__page001"
        pageLinkClassName="pagContainer__page"
        breakLinkClassName="pagContainer__break"
        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      />
    </>
  ) : (
    <p className="newsComp__empty">Уг төрөлд мэдээ байхгүй байна.</p>
  );
};

export default NewsComp;
