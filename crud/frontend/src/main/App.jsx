import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import React from "react";
import Logo from ".././components/templates/Logo";
import Nav from ".././components/templates/Nav";
import Home from "../components/templates/home/Home";
import Footer from ".././components/templates/Footer";

export default (props) => {
  return (
    <div className="app">
      <Logo />
      <Nav />
      <Home />
      <Footer />
    </div>
  );
};
