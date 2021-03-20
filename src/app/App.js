import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {authStateCheck} from '../redux/user/user.actions';
import {connect} from 'react-redux';
import Layout from '../layout/Layout';
import SignIn from "../components/Auth/SignIn/SignIn";
import SignUp from "../components/Auth/SignUp/SignUp";
import './App.scss';

const App = (props) => {
  const {isAuth, authStateCheck} = props;

  useEffect(() => {
    authStateCheck();
  }, [authStateCheck]);

  let routes = (
    <>
      <Switch>
        <Route path="/sign-in" component={SignIn}/>
        <Route path="/sign-up" component={SignUp}/>
        <Redirect to="/"/>
      </Switch>
    </>
  );

  if (isAuth) {
    routes = (
      <>
        <Switch>
          <h1>Jesteś zalogowany i tutaj będzie kalendarz itp...</h1>
        </Switch>
      </>
    );
  }

  return (
    <>
      <Layout>
        {routes}
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.user.currentUser !== null
});

export default connect(mapStateToProps, {authStateCheck})(App);
