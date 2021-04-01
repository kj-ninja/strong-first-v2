import React from 'react';
import {auth, signInWithGoogle} from '../../../api/firebase/firebaseClient';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import * as Yup from "yup";
import './SignIn.scss';
import {Formik, Form, Field} from 'formik';

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .typeError('Proszę podać poprawny adres email')
        .required('Pole obowiązkowe')
        .email('Proszę podać poprawny adres email')
        .min(6, 'Minimum 6 znaków'),
    password: Yup.string()
        .min(6, 'Minimum 6 znaków')
        .max(40, 'Maxymalnie 30 znaków')
        .required('Pole obowiązkowe'),
});

const SignIn = () => {
    return (
        <div className='sign-in'>
            <h2>It great to have you back on your next training session</h2>
            <p>Sign in and let's do this</p>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={SignInSchema}
                onSubmit={async (values, {setSubmitting}) => {
                    try {
                        await auth.signInWithEmailAndPassword(values.email, values.password);
                    } catch (error) {
                        console.log(error);
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
                        <div className='sign-in__buttons'>
                            <Button type='submit'>Zaloguj się</Button>
                            <Button onClick={signInWithGoogle} effectName={"google-effect"}>Zaloguj z Google</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignIn;
