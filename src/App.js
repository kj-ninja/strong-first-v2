import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {authStateCheck} from "./auth/userSlice";
import {useSelector, useDispatch} from "react-redux";
import Layout from './layout/Layout';
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import MonthPicker from "./features/Calendar/MonthPicker";
import Calendar from "./features/Calendar/Calendar";

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.currentUser !== null);

  useEffect(() => {
    dispatch(authStateCheck());
  }, [dispatch]);

  let routes = (
    <Switch>
      <Route path="/sign-in" component={SignIn}/>
      <Route path="/sign-up" component={SignUp}/>
      <Redirect to="/"/>
    </Switch>
  );

  if (isAuth) {
    routes = (
      <>
        <MonthPicker/>
        <Calendar/>
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

export default App;
