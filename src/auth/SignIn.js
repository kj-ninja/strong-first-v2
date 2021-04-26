import React, {useState} from 'react';
import {auth, signInWithGoogle} from '../api/firebase/firebaseClient';
import Input from "../components/shared/Input/Input";
import Button from "../components/shared/Button/Button";
import './SignIn.scss';

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const {email, password} = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setUserCredentials({...userCredentials, email: '', password: ''});
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const {name, value} = event.target;

    setUserCredentials({...userCredentials, [name]: value});
  };

  return (
    <div className='sign-in'>
      <h2>It great to have you back on your next training session</h2>
      <p>Sign in and let's do this</p>
      <form onSubmit={handleSubmit}>
        <Input
          name='email'
          type='email'
          label='Email'
          value={email}
          onChange={handleChange}
          required
        />
        <Input
          name='password'
          type='password'
          label='Password'
          value={password}
          onChange={handleChange}
          required
        />
        <div className='sign-in__buttons'>
          <Button type='submit'>Zaloguj się</Button>
          <Button onClick={signInWithGoogle}>Zaloguj z Google</Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
