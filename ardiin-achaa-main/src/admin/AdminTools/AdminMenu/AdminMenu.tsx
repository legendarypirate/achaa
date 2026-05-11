// @ts-nocheck
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import moment from "moment";
import { RiUserFill } from "react-icons/ri";
import Logo from "../../../assets/logo.png";
import NoImage from "../../../assets/no-image.jpg";
import Axios from ".././../../Axios";
import { ROUTES } from "../../routes";
import DropDown from "./DropDown/DropDown";
import CompanyProfileModal from "./CompanyProfileModal/CompanyProfileModal";
import { staticAssetUrl } from "../../../utils/staticAssetUrl";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AdminMenu = ({ setProfileVisible }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [banner, setBanner] = useState("");

  const [privateModalVisible, setPrivateModalVisible] = useState(false);

  useEffect(() => {
    Axios.get(`/partner/getByCargoAdminID/${id}`).then((res) => {
      setData(res.data);
    });

    Axios.get("/introBanner/getByType/banner").then((res) => {
      const url = res.data && res.data.file_url;
      if (typeof url === "string" && url.length > 0) {
        setBanner(url);
      } else {
        setBanner(staticAssetUrl(NoImage));
      }
    });
  }, [id]);

  const activityViewer = () => {
    if (data.insurance) {
      return "Улс, хот хоорондын";
    } else if (data.express_type) {
      return data.express_type;
    } else {
      return null;
    }
  };

  const renderHeading = () => {
    return (
      <div className="border-b bg-card px-4 py-5">
        <div className="flex flex-col items-center gap-3 text-center">
          {Number(id) > 0 ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-muted text-muted-foreground">
              <RiUserFill className="h-9 w-9" aria-hidden />
            </div>
          ) : (
            <>
              <img
                className="h-14 w-auto object-contain"
                src={staticAssetUrl(Logo)}
                alt="Ардын ачаа"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = "none";
                }}
              />
              <p className="text-sm font-semibold tracking-tight">Ардын ачаа</p>
            </>
          )}
        </div>

        {Number(id) > 0 && (
          <div className="mt-4 space-y-3 text-left text-sm">
            <p>
              <span className="font-medium text-muted-foreground">Нэр:</span>{" "}
              <span className="text-foreground">
                {!data.name || data.name === "0" ? "Хувь хүн" : data.name}
              </span>
            </p>
            <p>
              <span className="font-medium text-muted-foreground">
                Үйл ажиллагаа:
              </span>{" "}
              <span className="text-foreground">{activityViewer() || "—"}</span>
            </p>
            <p>
              <span className="font-medium text-muted-foreground">
                Бүртгүүлсэн:
              </span>{" "}
              <span className="text-foreground">
                {data.signed_date
                  ? moment(data.signed_date).format("YYYY/MM/DD")
                  : "—"}
              </span>
            </p>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={() => setPrivateModalVisible(true)}
            >
              Компанийн танилцуулга оруулах
            </Button>
          </div>
        )}
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
            content={item.dropDown.map((dropItem) => {
              return dropItem;
            })}
          />
        );
      } else {
        return (
          <li key={index} className="list-none">
            <NavLink
              className={({ isActive }) =>
                [
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")
              }
              to={`/admin/${id}${item.uri}`}
            >
              {item.name}
            </NavLink>
          </li>
        );
      }
    });
  };

  return (
    <aside
      className="sticky top-0 flex h-screen w-[260px] shrink-0 flex-col border-r bg-card shadow-sm"
      onClick={() => setProfileVisible(false)}
    >
      <CompanyProfileModal
        accountID={id}
        visible={privateModalVisible}
        onCancel={() => setPrivateModalVisible(false)}
      />

      {renderHeading()}

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Цэс
        </p>
        <ul className="space-y-1">{renderItem()}</ul>
      </nav>

      {Number(id) > 0 && (
        <>
          <Separator />
          <div className="p-3">
            <img
              className="max-h-48 w-full rounded-lg object-cover"
              src={
                typeof banner === "string" && banner
                  ? banner
                  : staticAssetUrl(NoImage)
              }
              alt=""
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = staticAssetUrl(NoImage);
              }}
            />
          </div>
        </>
      )}
    </aside>
  );
};

export default AdminMenu;
