import React from 'react';
import styles from './Page.module.css';
import AuthBar from '../AuthBar/AuthBar';

const Page = (props) => {
  return (
    <div className={styles.Page}>
      <AuthBar />
      {props.children}
    </div>
  );
};

export default Page;
