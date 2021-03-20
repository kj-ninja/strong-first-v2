import React from 'react';
import './Layout.scss';
import Header from '../components/Header/Header';

const Layout = ({children}) => {
  return (
    <>
      <Header />

      <main className='content'>{children}</main>
    </>
  );
};

export default Layout;
