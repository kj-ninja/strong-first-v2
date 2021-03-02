import React from 'react';
import './Login.scss';
import SignIn from './Sign-in/Sign-in';
import SignUp from './Sign-up/Sign-up';

const Login = () => {
  return (
    <div className='login'>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Login;
