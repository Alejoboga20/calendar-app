import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({ isAuth, component: Component, ...rest }) => {
  console.log({ ...rest });

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

PublicRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};
