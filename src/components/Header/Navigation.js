import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../../api/firebase/firebaseClient';
import { connect } from 'react-redux';
import './Navigation.scss';

const Navigation = ({ isAuth }) => {

  let links = (
    <ul className='navigation'>
      <li className='navigation__item'>
        <NavLink to='/sign-up'>Rejestracja</NavLink>
      </li>
      <li className='navigation__item'>
        <NavLink to='/sign-in'>Logowanie</NavLink>
      </li>
    </ul>
  );

  if (isAuth) {
    links = (
      <ul className='navigation'>
        <li className='navigation__item'>
          <NavLink to='/add-training'>Dodaj trening</NavLink>
        </li>
        <li className='navigation__item'>
          <NavLink to='/logout' onClick={() => auth.signOut()}>
            Wyloguj
          </NavLink>
        </li>
      </ul>
    );
  }

  return <nav>{links}</nav>;
};

const mapStateToProps = (state) => ({
  isAuth: state.user.currentUser !== null
});

export default connect(mapStateToProps)(Navigation);
