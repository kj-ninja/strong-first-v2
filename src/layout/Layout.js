import React from 'react';

const Layout = (props) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
        </ul>
      </nav>

      <main className="content">
        {props.children}
      </main>
    </>
  );
};

export default Layout;
