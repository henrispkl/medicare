import React, { Fragment } from 'react';
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
        <Fragment>
          <div className={styles.User}>
            <div className={styles.UserIcon}>
              <i className="far fa-user-circle"></i>
            </div>
            <div className={styles.UserName}>{props.user.name}</div>
          </div>
          <div className={styles.Link} onClick={logoutHandler}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </div>
        </Fragment>
      ) : (
        <div className={styles.Link} onClick={openAuthModal}>
          <i className="fas fa-sign-in-alt"></i> Sign-in
        </div>
      )}
    </div>
  );
};

export default connect((store) => ({
  authModal: store.app.authModal,
  isAuthenticated: store.auth.isAuthenticated,
  user: store.auth.user,
}))(AuthBar);
