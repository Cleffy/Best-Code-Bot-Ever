import React from 'react';
import { Route, Switch } from 'react-router-dom';


import NewChat from './components/NewChat'; 
import History from './components/History'; 
import SignOut from './components/SignOut'; 
import Home from './components/Home'; 

const Routes = () => {
  return (
    <Switch>
      <Route path="/new-chat" component={NewChat} />
      <Route path="/history" component={History} />
      <Route path="/sign-out" component={SignOut} />
      <Route path="/" component={Home} />
    </Switch>
  );
};

export default Routes;
