import React from 'react';
import {
  auth,
  signInWithGoogle,
} from '../../../api/firebase/firebaseClient';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import './SignUp.scss';
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
      .typeError('Proszę podać poprawny adres email')
      .email('Proszę podać poprawny adres email')
      .required('Pole obowiązkowe')
      .min(6, 'Minimum 6 znaków'),
  password: Yup.string()
      .min(6, 'Minimum 6 znaków')
      .max(40, 'Maxymalnie 30 znaków')
      .required('Pole obowiązkowe'),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Hasła muszą być identyczne')
      .required('Pole obowiązkowe')
});

const SignUp = () => {

  return (
      <div className='sign-up'>
        <h2>Marzy mi się założenie konta</h2>
        <p>Rejestracja</p>
        <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={SignInSchema}
            onSubmit={async (values, {setSubmitting}) => {
              if (values.password !== values.confirmPassword) {
                alert('hasła są niezgodne');
                return;
              }
              try {
                await auth.createUserWithEmailAndPassword(
                    values.email,
                    values.password
                );
              } catch (error) {
                console.error(error);
              }
              setSubmitting(false);
            }}
        >
          {({
              values, handleChange,
            }) => (
              <Form>
                <Field
                    label="E-mail"
                    id="emailId"
                    name="email"
                    type="email"
                    component={Input}
                    value={values.email}
                    onChange={handleChange}
                />
                <Field
                    id='passwordId'
                    name='password'
                    label='Password'
                    component={Input}
                    value={values.password}
                    onChange={handleChange}
                />
                <Field
                    name='confirmPassword'
                    type='password'
                    label='Confirm Password'
                    component={Input}
                    value={values.confirmPassword}
                    onChange={handleChange}
                />
                <div className='sign-in__buttons'>
                  <Button type='submit'>Załóż konto</Button>
                  <Button onClick={signInWithGoogle} effectName={"google-effect"}>Zaloguj z Google</Button>
                </div>
              </Form>
          )}
        </Formik>
      </div>
  );
};

export default SignUp;
