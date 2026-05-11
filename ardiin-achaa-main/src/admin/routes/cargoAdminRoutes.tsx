// @ts-nocheck
import Dashboard from "../AdminPages/Dashboard/Dashboard";
import Transportation from "../AdminPages/Transport/Transportation";
import AllPackages from "../AdminPages/Packages/AllPackages";
import RequestedPackages from "../AdminPages/Packages/RequestedPackages";
import ConfirmedRequests from "../AdminPages/Packages/ConfirmedRequests";
import ApprovedPackages from "../AdminPages/Packages/ApprovedPackages";
import News from "../AdminPages/News/News";

const ID = String(window.location.pathname).split("/")[2];

export const dashboardRoute = {
  heading: "Хянах самбар",
  name: "Хянах самбар",
  uri: "/dashboard",
  component: <Dashboard />,
};

export const transportationRoute = {
  heading: "Тээвэрлэлт",
  name: "Тээвэрлэлт",
  uri: "/transportation",
  component: <Transportation />,
};

export const packagesRoute = {
  name: "Ачаа бараа",
  dropDown: [
    {
      heading: "Нийт aчаа",
      name: "Нийт aчаа",
      uri: "/all-packages",
      component: <AllPackages />,
    },
    {
      heading: "Ачаа ачуулах хүсэлт",
      name: "Ачаа ачуулах хүсэлт",
      uri: "/requested-packages",
      component: <RequestedPackages />,
    },
    ID === "0" && {
      heading: "Зөвшөөрсөн хүсэлт",
      name: "Зөвшөөрсөн хүсэлт",
      uri: "/confirmed-requests",
      component: <ConfirmedRequests />,
    },
    {
      heading: ID === "0" ? "Бүртгэлтэй aчаа" : "Манайд бүртгэлтэй aчаа",
      name: ID === "0" ? "Бүртгэлтэй aчаа" : "Манайд бүртгэлтэй aчаа",
      uri: "/approved-packages",
      component: <ApprovedPackages />,
    },
  ],
};

export const newsRoute = {
  heading: "Зар мэдээ",
  name: "Зар мэдээ",
  uri: "/news",
  component: <News />,
};
