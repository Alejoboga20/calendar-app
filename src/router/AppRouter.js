import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { CalendarApp } from '../CalendarApp';
import { LoginScreen } from '../components/auth/LoginScreen';

export const AppRouter = () => {
  return (
    <div>
      <h1>App Router</h1>

      <Router>
        <div>
          <Switch>
            <Route exact path='/login' component={LoginScreen} />
            <Route exact path='/' component={CalendarApp} />

            <Redirect to='/' />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
