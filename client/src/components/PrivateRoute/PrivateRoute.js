import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default connect((store) => ({
  isAuthenticated: store.auth.isAuthenticated,
}))(PrivateRoute);
