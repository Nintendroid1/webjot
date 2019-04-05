import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      this.props.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/users/login" />
      )
    }
  />
);



export default PrivateRoute;