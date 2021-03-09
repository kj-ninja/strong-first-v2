import React, { useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { auth, createUserProfileDocument } from '../firebase/firebaseClient';
import { setCurrentUser } from '../redux/user/user.actions';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import store from '../redux/store';
import Layout from '../layout/Layout';
import Login from '../components/Login/Login';
import './App.scss';

const App = (props) => {
  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          props.setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      props.setCurrentUser(userAuth);
    });
  }, []);

  // TODO dodac logike czy user jest zalogowany jesli nie renderujemy ponizsze komponenty
  // let routes = (
  //   <Switch>
  //     <Route path="/login" component={Login}/>
  //     <Route path="/register" component={Register}/>
  //     <Redirect to="/"/>
  //   </Switch>
  // );

  // TODO jesli user jest zalogowany czyli token jest zapisany renderujemy ponizsze komponenty
  // if (props.isAuth) {
  //   routes = (
  //     <Switch>
  //       <Route path="/diary" component={Diary}/>
  //       <Route path="/big-six" render={(props) => <BigSix {...props}/>}/>
  //       <Route path="/add-training" render={(props) => <AddTraining {...props}/>}/>
  //       <Route path="/logout" component={Logout}/>
  //       <Redirect to='/diary'/>
  //       <Route component={NotFound}/>
  //     </Switch>
  //   );
  // }

  return (
    <>
      {/*<Layout>*/}
      {/*  {routes}*/}
      {/*</Layout>*/}
      <Layout>
        <Login />
      </Layout>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
