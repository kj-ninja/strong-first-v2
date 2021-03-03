import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Layout from '../layout/Layout';

const App = () => {
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

      </Layout>
    </>
  );
};

export default App;
