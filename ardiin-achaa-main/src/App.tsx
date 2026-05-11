// @ts-nocheck
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions";
import Layout from "./hoc/Layouts/Layout";

import NoPages from "./pages/NoPages/NoPages";

import AdminLogin from "./admin/AdminPages/AdminLogin/AdminLogin";
import Admin from "./admin/Admin";

import User from "./pages/User/User";
import ForgotPassword from "./pages/RecoverPassword/ForgotPassword";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword";
import SelectMembership from "./pages/User/SelectMembership/SelectMembership";

import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Ecourse from "./pages/Ecourse/Ecourse";
import EcourseDetail from "./pages/Ecourse/EcourseDetail";
import News from "./pages/News/News";
import Publicity from "./pages/Publicity/Publicity";
import AllOrganizations from "./pages/AllOrganizations/AllOrganizations";

import PartnerRequest from "./pages/Express/PartnerRequest/PartnerRequest";
import ExpressUserType from "./pages/Express/ExpressUserType/ExpressUserType";
import PartnerRegister from "./pages/Express/PartnerRegister/PartnerRegister";


function App(props) {
  const [device, setDevice] = useState("");

  useEffect(() => {
    props.onFetchAuth();

    if (/Android|iPhone/i.test(navigator.userAgent)) {
      setDevice("mobile");
    } else {
      setDevice("web");
    }
    // Intentionally run once on mount. `[props]` re-ran on every Redux update because
    // connect() passes a new props object each time, causing endless /accounts/authenticate
    // requests and a browser tab that never stops "loading".
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Wrapper = ({ children }) => {
    const location = useLocation();

    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    return children;
  };

  return (
    <Wrapper>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        {device === "web" && (
          <>
            <Route
              path="/admin"
              element={
                props.auth ? (
                  <Navigate to={`/admin/${props.id}`} />
                ) : (
                  <AdminLogin />
                )
              }
            />
            <Route
              path="/admin/:id/*"
              element={props.auth ? <Admin /> : <AdminLogin />}
            />
          </>
        )}

        {props.auth && (
          <>
            <Route
              path="/user/:id/*"
              element={
                <Layout>
                  <User />
                </Layout>
              }
            />

            <Route
              path="/select-membership/:id"
              element={
                <Layout>
                  <SelectMembership />
                </Layout>
              }
            />
          </>
        )}

        <Route
          path="/forgot-password"
          element={
            <Layout>
              <ForgotPassword />
            </Layout>
          }
        />
        <Route
          path="/recover-password/:token"
          element={
            <Layout>
              <RecoverPassword />
            </Layout>
          }
        />

        <Route
          path="/about-us"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />

        <Route
          path="/e-course"
          element={
            <Layout>
              <Ecourse />
            </Layout>
          }
        />
        <Route
          path="/e-course/detail/:id"
          element={
            <Layout>
              <EcourseDetail />
            </Layout>
          }
        />

        <Route
          path="/news/*"
          element={
            <Layout>
              <News />
            </Layout>
          }
        />
        <Route
          path="/publicity"
          element={
            <Layout>
              <Publicity />
            </Layout>
          }
        />
        <Route
          path="/all-organizations"
          element={
            <Layout>
              <AllOrganizations />
            </Layout>
          }
        />

        <Route
          path="/express/:id"
          element={
            <Layout>
              <PartnerRequest />
            </Layout>
          }
        />
        <Route
          path="/express/:id/user-type"
          element={
            <Layout>
              <ExpressUserType />
            </Layout>
          }
        />
        <Route
          path="/express/:id/user-type/:type/register"
          element={
            <Layout>
              <PartnerRegister />
            </Layout>
          }
        />
        <Route
          path="/express/:id/register"
          element={
            <Layout>
              <PartnerRegister />
            </Layout>
          }
        />

        <Route path="*" element={<NoPages />} />
      </Routes>
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.authenticate,
    id: state.auth.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAuth: () => dispatch(actions.fetchAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
