import React from 'react';
import Navigation from "./Navigation";
import './Header.scss';
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">

        <h1 className="header__logo">
          <NavLink to="/">StrongFirst</NavLink>
        </h1>

        <Navigation/>
      </div>
    </header>
  );
};

export default Header;
