// @ts-nocheck
import React, { useState } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { ROUTES } from "./routes";
import AdminMenu from "./AdminTools/AdminMenu/AdminMenu";
import AdminHeader from "./AdminTools/AdminHeader/AdminHeader";

const Admin = () => {
  const { id } = useParams();
  const [profileVisible, setProfileVisible] = useState(false);

  const renderRoutes = () => {
    return ROUTES({ id }).map((item, index) => {
      if (!item) {
        return null;
      } else if (item.dropDown) {
        return item.dropDown.map((dropItem, dropIndex) => {
          if (!dropItem) {
            return null;
          } else {
            return (
              <Route
                key={dropIndex}
                path={dropItem.uri}
                element={dropItem.component}
              />
            );
          }
        });
      } else {
        return <Route key={index} path={item.uri} element={item.component} />;
      }
    });
  };

  return (
    <div id="admin-shadcn-root">
      <div className="flex min-h-screen w-full bg-slate-100 text-slate-900 antialiased">
        <AdminMenu
          profileVisible={profileVisible}
          setProfileVisible={setProfileVisible}
        />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <AdminHeader
            profileVisible={profileVisible}
            setProfileVisible={setProfileVisible}
          />
          <main
            className="flex min-h-0 flex-1 flex-col overflow-auto p-4 md:p-6"
            onClick={() => setProfileVisible(false)}
          >
            <div className="mx-auto w-full max-w-[1600px] flex-1 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm md:p-6">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to={`/admin/${id}/dashboard`} />}
                />
                {renderRoutes()}
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
