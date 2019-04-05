import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
       localStorage.auth === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/users/login" />
      )
    }
  />
);



export default PrivateRoute;