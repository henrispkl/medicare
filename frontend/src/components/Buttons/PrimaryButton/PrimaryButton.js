import React from 'react';
import styles from './PrimaryButton.module.css';

const PrimaryButton = props => {
  const classes = [props.className, styles.PrimaryButton];
  return <div className={classes.join(' ')}>{props.children}</div>;
};

export default PrimaryButton;
