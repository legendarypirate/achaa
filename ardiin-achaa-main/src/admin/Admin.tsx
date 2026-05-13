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
      <div className="flex min-h-screen w-full bg-muted/40 text-foreground antialiased">
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
            className="flex min-h-0 flex-1 flex-col overflow-auto p-3 sm:p-4 md:p-6"
            onClick={() => setProfileVisible(false)}
          >
            <div className="flex min-h-0 w-full max-w-none flex-1 flex-col rounded-2xl border border-border/80 bg-card p-5 shadow-sm ring-1 ring-black/[0.03] sm:p-6 md:p-8">
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
