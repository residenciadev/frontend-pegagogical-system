import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SingIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import Subpasta from '../pages/Subpasta';
import Users from '../pages/Users';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/resetpassword" component={ResetPassword} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/subpasta/:id/:title" component={Subpasta} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/users" component={Users} isPrivate />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
