import React from 'react';
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import './Navigation.scss';

const Navigation = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  let links = (
    <ul className="navigation">
      <li className="navigation__item"><NavLink to="/sign-up">Rejestracja</NavLink></li>
      <li className="navigation__item"><NavLink to="/sign-in">Logowanie</NavLink></li>
    </ul>
  );

  if (isAuth) {
    links = (
      <ul className="navigation">
        <li className="navigation__item"><NavLink to="/add-training">Dodaj trening</NavLink></li>
        <li className="navigation__item"><NavLink to="/logout">Wyloguj</NavLink></li>
      </ul>
    );
  }

  return (
    <nav>
      {links}
    </nav>
  );
};

export default Navigation;
