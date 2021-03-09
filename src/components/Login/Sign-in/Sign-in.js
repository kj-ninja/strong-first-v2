// import React, { useState } from 'react';
// import { auth, signInWithGoogle } from '../../../firebase/firebaseClient';
// import Input from '../../shared/Input/Input';
// import Button from '../../shared/Button/Button';
// import './Sign-in.scss';

// const SignIn = () => {
//   const [userCredentials, setUserCredentials] = useState({
//     displayName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const { email, password } = userCredentials;

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // await auth.signInWithEmailAndPassword(email, password);
//       setUserCredentials({ ...userCredentials, email: '', password: '' });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setUserCredentials({ ...userCredentials, [name]: value });
//   };

//   return (
//     <div className='sign-in'>
//       <h2>It great to have you back on your next training session</h2>
//       <p>Sign in and let's do this</p>
//       <form onSubmit={handleSumbit}>
//         <Input
//           name='email'
//           type='email'
//           label='email'
//           value={email}
//           onChange={handleChange}
//           // required
//         />
//         <Input
//           name='password'
//           type='password'
//           label='Password'
//           value={password}
//           onChange={handleChange}
//           // required
//         />
//         <div className='sign-in__buttons'>
//           <Button type='submit'>Zaloguj się</Button>
//           <Button onClick={signInWithGoogle}>Zaloguj z Google</Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignIn;

import React from 'react';
import {auth, signInWithGoogle} from '../../../firebase/firebaseClient';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import './Sign-in.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const {email, password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        } catch (error) {
            console.log(error);
        }
    };

    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({[name]: value});
    };

    render() {
        return (
            <div className='sign-in'>
                <h2>It great to have you back on your next training session</h2>
                <p>Sign in and let's do this</p>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name='email'
                        label='Email'
                        type='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        required
                    />
                    <Input
                        name='password'
                        label='Password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        required
                    />
                    <div className='sign-in__buttons'>
                        <Button type='submit'>Sign In</Button>
                        <Button onClick={signInWithGoogle}>Sign In with Google</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;
