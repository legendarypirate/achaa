// @ts-nocheck
import User from "../AdminPages/User/User";
import Academy from "../AdminPages/Academy/Academy";
import Publicity from "../AdminPages/Publicity/Piblicity";
import RequestedPartner from "../AdminPages/Partner/RequestedPartner";
import ApprovedPartner from "../AdminPages/Partner/ApprovedPartner";
import IntroBanner from "../AdminPages/IntroBanner/IntroBanner";

export const userRoute = {
  heading: "Хэрэглэгч",
  name: "Хэрэглэгч",
  uri: "/user",
  component: <User />,
};

export const academyRoute = {
  heading: "Академи",
  name: "Академи",
  uri: "/academy",
  component: <Academy />,
};

export const publicityRoute = {
  heading: "Ил тод байдал",
  name: "Ил тод байдал",
  uri: "/publicity",
  component: <Publicity />,
};

export const requestedPartnerRoute = {
  heading: "Хамтран ажиллах байгууллагын хүсэлт",
  name: "Хамтран ажиллах байгууллагын хүсэлт",
  uri: "/requested-partner",
  component: <RequestedPartner />,
};

export const approvedPartnerRoute = {
  heading: "Систем ашиглагч байгууллага",
  name: "Систем ашиглагч байгууллага",
  uri: "/approved-partner",
  component: <ApprovedPartner />,
};

export const introBannerRoute = {
  heading: "Интро болон баннер",
  name: "Интро болон баннер",
  uri: "/intro-banner",
  component: <IntroBanner />,
};
