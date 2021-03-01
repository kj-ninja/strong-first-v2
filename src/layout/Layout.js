import React from 'react';
import './Layout.scss';
import Header from '../components/Header/Header';

const Layout = (props) => {
  return (
    <>
      <Header/>

      <main className="content">
        {props.children}
      </main>
    </>
  );
};

export default Layout;
