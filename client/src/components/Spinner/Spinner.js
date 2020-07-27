import React from 'react';
import styles from './Spinner.module.css';

const Spinner = props => {
  let classes = [];

  if (props.spinner2) {
    classes = [styles.Spinner2, 'fas fa-spinner'];
  } else {
    classes = [styles.Spinner, 'fas fa-heartbeat'];
  }
  return <i className={classes.join(' ')}></i>;
};

export default Spinner;
