// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const NoPages = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const TIMER = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(TIMER);
  }, []);

  return (
    loading || (
      <div className="noPage">
        <div className="noPage__box">
          <div className="noPage__box-header">Хуудас олдсонгүй</div>
          <Link to="/" className="noPage__box-text">
            /Нүүр хуудас руу шилжих/
          </Link>
        </div>
      </div>
    )
  );
};

export default NoPages;
