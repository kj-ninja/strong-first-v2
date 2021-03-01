import React from 'react';
import Navigation from "./Navigation/Navigation";
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo">
          StrongFirst
        </h1>

        <Navigation/>
      </div>
    </header>
  );
};

export default Header;
