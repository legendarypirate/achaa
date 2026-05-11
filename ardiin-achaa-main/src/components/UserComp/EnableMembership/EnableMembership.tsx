// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";


const EnableMembership = ({ id, membership }) => {
  const isMembership = () => {
    if (membership === 1 || membership === 2 || membership === 3) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="enableMembership">
      <p className="enableMembership-text">
        {isMembership()
          ? "Таны хүсэлтийг шалгаж байна. Түр хүлээнэ үү."
          : "гишүүнчлэлийн эрхээ шинэчлэснээр тээвэрлэлтийн мэдээлэл болон ачаа мэдүүлгийн жагсаалтыг харна уу!"}
      </p>

      {isMembership() || (
        <Link to={`/select-membership/${id}`} className="enableMembership-link">
          Энд дарна уу
        </Link>
      )}
    </div>
  );
};

export default EnableMembership;
