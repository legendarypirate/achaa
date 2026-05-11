// @ts-nocheck
import React from "react";

import Aux from "../Auxillary/Auxillary";
import Header from "../../tools/Header/Header";
import Footer from "../../tools/Footer/Footer";

const Layout = (props) => {
  return (
    <Aux>
      <div className="layout">
        <div className="layout__header">
          <Header />
        </div>
        <main className="layout__main">{props.children}</main>
        <div className="layout__footer">
          <Footer />
        </div>
      </div>
    </Aux>
  );
};

export default Layout;
