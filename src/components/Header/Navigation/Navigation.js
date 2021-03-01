import React from 'react';
import {useSelector} from "react-redux";
import './Navigation.scss';

const Navigation = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  let links = (
    <ul className="navigation">
      <li className="navigation__item"><a href="/sign-up">Zarejestruj się</a></li>
      <li className="navigation__item"><a href="/sign-in">Zaloguj się</a></li>
    </ul>
  );

  if (isAuth) {
    links = (
      <ul className="navigation">
        <li className="navigation__item"><a href="/sign-up">Dodaj trening</a></li>
        <li className="navigation__item"><a href="/sign-in">Wyloguj</a></li>
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
