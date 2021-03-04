import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';
import Layout from '../layout/Layout';
import Login from '../components/Login/Login';
import './App.scss';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
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
      <Layout currentUser={currentUser}>
        
      </Layout>
    </>
  );
};

export default App;
