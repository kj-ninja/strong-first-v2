import React, { useState } from 'react';
import './Sign-in.scss';
import Input from '../../shared/Input/Input';
import { signInWithGoogle } from '../../../firebase/firebase.utils';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSumbit = (event) => {
    event.preventDefault();

    setEmail('');
    setPassword('');
  };

  return (
    <div className='sign-in'>
      <h2>It great to have you back on your next training session</h2>
      <span>Sign in and let's do this</span>
      <form onSubmit={handleSumbit}>
        <Input
          name='email'
          type='email'
          label='email'
          value={email}
          setValueToState={setEmail}
          required
        />
        <Input
          name='password'
          type='password'
          label='Password'
          value={password}
          setValueToState={setPassword}
          required
        />
        <input onClick={signInWithGoogle} value='Zaloguj się' />
      </form>
    </div>
  );
};

export default SignIn;
