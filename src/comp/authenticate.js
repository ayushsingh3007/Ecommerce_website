// authenticate.js
import React from 'react';
import { Redirect } from 'react-router-dom';

const Authenticate = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    return <Redirect to="/login" />;
  }

  // If the user is authenticated, render the children (component/content)
  return <>{children}</>;
};

export default Authenticate;
