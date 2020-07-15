import React from 'react';
import styles from './AuthBar.module.css';
import { connect } from 'react-redux';
import { setAuthModal } from '../../store/actions/appActions';
import { logout } from '../../store/actions/authActions';

const AuthBar = (props) => {
  const openAuthModal = () => {
    props.dispatch(setAuthModal(true));
  };

  const logoutHandler = () => {
    props.dispatch(logout());
  };

  return (
    <div className={styles.AuthBar}>
      {props.isAuthenticated ? (
        <div className={styles.Link} onClick={logoutHandler}>
          Logout
        </div>
      ) : (
        <div className={styles.Link} onClick={openAuthModal}>
          Login/Register
        </div>
      )}
    </div>
  );
};

export default connect((store) => ({
  authModal: store.app.authModal,
  isAuthenticated: store.auth.isAuthenticated,
}))(AuthBar);
