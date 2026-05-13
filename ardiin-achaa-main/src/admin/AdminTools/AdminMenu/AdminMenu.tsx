// @ts-nocheck
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Axios from ".././../../Axios";
import { ROUTES } from "../../routes";
import DropDown from "./DropDown/DropDown";
import CompanyProfileModal from "./CompanyProfileModal/CompanyProfileModal";
import { 
  LayoutDashboard, 
  Truck, 
  ShoppingCart, 
  Bell, 
  Package, 
  FileText, 
  Users, 
  Building, 
  Image as ImageIcon 
} from "lucide-react";

const getIcon = (name) => {
  switch (name) {
    case "Хянах самбар": return <LayoutDashboard className="h-[18px] w-[18px] mr-3 shrink-0" />;
    case "Тээвэрлэлт": return <Truck className="h-[18px] w-[18px] mr-3 shrink-0" />;
    case "Ачаа бараа": return <Package className="h-[18px] w-[18px] mr-3 shrink-0" />;
    case "Зар мэдээ": return <Bell className="h-[18px] w-[18px] mr-3 shrink-0" />;
    case "Академи": return <FileText className="h-[18px] w-[18px] mr-3 shrink-0" />;
    case "Ил тод байдал": return <FileText className="h-[18px] w-[18px] mr-3 shrink-0" />;
    case "Хэрэглэгч": return <Users className="h-[18px] w-[18px] mr-3 shrink-0" />;
    case "Хамтран ажиллах байгууллагын хүсэлт": return <Users className="h-[18px] w-[18px] mr-3 shrink-0" />;
    case "Систем ашиглагч байгууллага": return <Building className="h-[18px] w-[18px] mr-3 shrink-0" />;
    case "Интро болон баннер": return <ImageIcon className="h-[18px] w-[18px] mr-3 shrink-0" />;
    default: return <FileText className="h-[18px] w-[18px] mr-3 shrink-0" />;
  }
};

const AdminMenu = ({ setProfileVisible }) => {
  const { id } = useParams();
  const [privateModalVisible, setPrivateModalVisible] = useState(false);

  // We keep Axios calls if they are still needed for something else, 
  // but we remove the complex header UI.
  useEffect(() => {
    // If needed in future
  }, [id]);

  const renderHeading = () => {
    return (
      <div className="flex h-16 items-center px-6 border-b border-border/60">
        <h1 className="text-[20px] font-bold text-foreground tracking-tight">Ardiin achaa</h1>
      </div>
    );
  };

  const renderItem = () => {
    return ROUTES({ id }).map((item, index) => {
      if (!item) {
        return null;
      } else if (item.dropDown) {
        return (
          <DropDown
            key={index}
            id={id}
            title={item.name}
            icon={getIcon(item.name)}
            content={item.dropDown.map((dropItem) => {
              return dropItem;
            })}
          />
        );
      } else {
        return (
          <li key={index} className="list-none mb-1">
            <NavLink
              className={({ isActive }) =>
                [
                  "group relative flex items-center rounded-lg py-[10px] px-3 text-regular font-medium transition-colors duration-150",
                  isActive 
                    ? "bg-muted font-semibold text-foreground" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                ]
                  .filter(Boolean)
                  .join(" ")
              }
              to={`/admin/${id}${item.uri}`}
            >
              {getIcon(item.name)}
              {item.name}
            </NavLink>
          </li>
        );
      }
    });
  };

  return (
    <aside
      className="sticky top-0 flex h-screen w-[min(100vw,20rem)] shrink-0 flex-col border-r border-border/80 bg-background sm:w-[260px] md:min-w-[260px]"
      onClick={() => setProfileVisible(false)}
    >
      <CompanyProfileModal
        accountID={id}
        visible={privateModalVisible}
        onCancel={() => setPrivateModalVisible(false)}
      />

      {renderHeading()}

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-1">{renderItem()}</ul>
      </nav>
    </aside>
  );
};

export default AdminMenu;
