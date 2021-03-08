import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../../../firebase/firebaseClient';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import './Sign-in.scss';

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    // displayName: '',
    email: '',
    password: '',
    // confirmPassword: '',
  });

  const { email, password } = userCredentials;

  const handleSumbit = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setUserCredentials({ ...userCredentials, email: '', password: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className='sign-in'>
      <h2>It great to have you back on your next training session</h2>
      <p>Sign in and let's do this</p>
      <form onSubmit={handleSumbit}>
        <Input
          name='email'
          type='email'
          label='email'
          value={email}
          onChange={handleChange}
          // required
        />
        <Input
          name='password'
          type='password'
          label='Password'
          value={password}
          onChange={handleChange}
          // required
        />
        <div className='sign-in__buttons'>
          <Button value='submit'>Zaloguj się</Button>
          <Button onClick={signInWithGoogle}>Zaloguj z Google</Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
