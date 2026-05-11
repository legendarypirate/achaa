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
    <div className="admin">
      <AdminHeader
        profileVisible={profileVisible}
        setProfileVisible={setProfileVisible}
      />
      <AdminMenu
        profileVisible={profileVisible}
        setProfileVisible={setProfileVisible}
      />

      <main className="admin__content" onClick={() => setProfileVisible(false)}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/admin/${id}/dashboard`} />}
          />

          {renderRoutes()}
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
