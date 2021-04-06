import React from 'react';
import {auth, signInWithGoogle} from '../../../api/firebase/firebaseClient';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import * as Yup from "yup";
import '../Form.scss';
import {Formik, Form, Field} from 'formik';

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .typeError('Proszę podać poprawny adres email')
        .required('Pole obowiązkowe')
        .email('Proszę podać poprawny adres email')
        .min(6, 'Minimum 6 znaków'),
    password: Yup.string()
        .min(6, 'Minimum 6 znaków')
        .max(40, 'Maksymalnie 30 znaków')
        .required('Pole obowiązkowe'),
});

const SignIn = () => {
    return (
        <div className='form-container'>
            <h2>Dobrze dziku! Jedziemy z tym treningiem</h2>
            <p>Jeszcze tylko się zaloguj i możemy zaczynnać</p>
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
                            label='Hasło'
                            id='passwordId'
                            name='password'
                            type='password'
                            component={Input}
                            value={values.password}
                            onChange={handleChange}
                        />
                        <div className='form-container__buttons'>
                            <Button type='submit'>Zaloguj się</Button>
                            <Button onClick={signInWithGoogle} buttonClass={"google-class"}>Zaloguj z Google</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignIn;
