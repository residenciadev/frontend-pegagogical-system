import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SingIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Lessons from '../pages/Lessons';
import EditLessons from '../pages/EditLessons';
import Courses from '../pages/Courses';
import Notification from '../pages/Notification';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/resetpassword" component={ResetPassword} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/courses" component={Courses} isPrivate />
      <Route path="/new-lessons" component={Lessons} isPrivate />
      <Route path="/edit-lessons/:id" component={EditLessons} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/users" component={Users} isPrivate />
      <Route path="/notifications" component={Notification} isPrivate />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
