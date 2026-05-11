// @ts-nocheck
import Dashboard from "./AdminPages/Dashboard/Dashboard";
import User from "./AdminPages/User/User";
import Transportation from "./AdminPages/Transport/Transportation";
import AllPackages from "./AdminPages/Package/AllPackages/AllPackages";
import RequestedPackages from "./AdminPages/Package/RequestedPackages/RequestedPackages";
import ApprovedPackages from "./AdminPages/Package/ApprovedPackages/ApprovedPackages";
import News from "./AdminPages/News/News";
import Academy from "./AdminPages/Academy/Academy";
import Publicity from "./AdminPages/Publicity/Piblicity";
import RequestedPartner from "./AdminPages/Partner/RequestedPartner";
import ApprovedPartner from "./AdminPages/Partner/ApprovedPartner";

let ROUTES = [
  {
    heading: "Хянах самбар",
    name: "Хянах самбар",
    uri: "/dashboard",
    component: <Dashboard />,
  },
  {
    heading: "Хэрэглэгч",
    name: "Хэрэглэгч",
    uri: "/user",
    component: <User />,
  },
  {
    heading: "Тээвэрлэлт",
    name: "Тээвэрлэлт",
    uri: "/transportation",
    component: <Transportation />,
  },

  {
    name: "Ачаа бараа",
    dropDown: [
      {
        heading: "Нийт ачаа бараа",
        name: "Нийт ачаа бараа",
        uri: "/all-packages",
        component: <AllPackages />,
      },
      {
        heading: "Ачаа бараа ачуулах хүсэлт",
        name: "Ачаа бараа ачуулах хүсэлт",
        uri: "/requested-packages",
        component: <RequestedPackages />,
      },
      {
        heading: "Бүртгэлтэй ачаа бараа",
        name: "Бүртгэлтэй ачаа бараа",
        uri: "/approved-packages",
        component: <ApprovedPackages />,
      },
    ],
  },

  {
    heading: "Зар мэдээ",
    name: "Зар мэдээ",
    uri: "/news",
    component: <News />,
  },
  {
    heading: "Академи",
    name: "Академи",
    uri: "/academy",
    component: <Academy />,
  },
  {
    heading: "Ил тод байдал",
    name: "Ил тод байдал",
    uri: "/publicity",
    component: <Publicity />,
  },
  {
    heading: "Хамтран ажиллах байгууллагын хүсэлт",
    name: "Хамтран ажиллах байгууллагын хүсэлт",
    uri: "/requested-partner",
    component: <RequestedPartner />,
  },
  {
    heading: "Хамтран ажиллаж байгаа байгуулга",
    name: "Хамтран ажиллаж байгаа байгуулга",
    uri: "/approved-partner",
    component: <ApprovedPartner />,
  },
];

export default ROUTES;
