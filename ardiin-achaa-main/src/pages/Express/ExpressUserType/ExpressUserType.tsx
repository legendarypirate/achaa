// @ts-nocheck
import React from "react";
import { Link, useParams } from "react-router-dom";
import { RiBuilding4Line, RiUserAddLine } from "react-icons/ri";


const ExpressUserType = () => {
  const { id } = useParams();

  let type = "";
  if (id === "2") {
    type = "Чингэлэг";
  } else if (id === "3") {
    type = "Вагон";
  }

  return (
    <div className="expressUserType">
      <h3 className="expressUserType__title">{type} тээвэр бүртгүүлэх</h3>

      <div className="expressUserType__content">
        <Link
          className="expressUserType__content-type"
          to={`/express/${id}/user-type/company/register`}
        >
          <RiBuilding4Line className="expressUserType__content-type-icon" />
          Компаниар бүртгүүлэх
        </Link>

        <Link
          className="expressUserType__content-type"
          to={`/express/${id}/user-type/person/register`}
        >
          <RiUserAddLine className="expressUserType__content-type-icon" />
          Хувь хүнээр бүртгүүлэх
        </Link>
      </div>
    </div>
  );
};

export default ExpressUserType;
