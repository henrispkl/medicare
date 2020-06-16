import React from 'react';
import styles from './Page.module.css';

const Page = props => {
  return <div className={styles.Page}>{props.children}</div>;
};

export default Page;
