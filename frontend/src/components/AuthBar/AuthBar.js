import React from 'react';
import styles from './AuthBar.module.css';

const AuthBar = (props) => {
  return (
    <div className={styles.AuthBar}>
      <div styles={styles.Link}>Login/Register</div>
    </div>
  );
};

export default AuthBar;
