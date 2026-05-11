// @ts-nocheck
import { useEffect, useState } from "react";
import Axios from "../../Axios";

import {
  dashboardRoute,
  newsRoute,
  packagesRoute,
  transportationRoute,
} from "./cargoAdminRoutes";
import {
  academyRoute,
  approvedPartnerRoute,
  introBannerRoute,
  publicityRoute,
  requestedPartnerRoute,
  userRoute,
} from "./otherRoutes";

export const ROUTES = ({ id }) => {
  const [roleID, setRoleID] = useState(0);

  useEffect(() => {
    Axios.get("/accounts/getByID/" + id).then((res) => {
      setRoleID(res.data.role_id);
    });
  }, [id]);

  const allRoutes = [
    dashboardRoute,
    userRoute,
    transportationRoute,
    packagesRoute,
    newsRoute,
    academyRoute,
    publicityRoute,
    requestedPartnerRoute,
    approvedPartnerRoute,
    introBannerRoute,
  ];

  const cargoAdminRoutes = [
    dashboardRoute,
    transportationRoute,
    packagesRoute,
    newsRoute,
  ];

  if (roleID === 2) {
    return allRoutes;
  } else {
    return cargoAdminRoutes;
  }
};
