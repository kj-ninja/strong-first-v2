import React, { useState } from 'react';
import {
  auth,
  createUserProfileDocument,
} from '../../../firebase/firebaseClient';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import './Sign-up.scss';

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSumbit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('hasła są niezgodne');
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      setUserCredentials({
        ...userCredentials,
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className='sign-up'>
      <h2>Marzy mi się założenie konta</h2>
      <p>Rejestracja</p>
      <form onSubmit={handleSumbit}>
        <Input
          name='displayName'
          type='text'
          label='Display Name'
          value={displayName}
          onChange={handleChange}
          // required
        />
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
        <Input
          name='confirmPassword'
          type='password'
          label='Potwierdz hasło '
          value={confirmPassword}
          onChange={handleChange}
          // required
        />
        <div className='sign-in__buttons'>
          <Button value='submit'>Załóż konto</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
