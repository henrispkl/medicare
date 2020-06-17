import React from 'react';
import styles from './PrimaryButton.module.css';

const PrimaryButton = props => {
  const classes = [props.className, styles.PrimaryButton, 'PrimaryButton'];
  return (
    <div className={classes.join(' ')} onClick={props.click}>
      {props.children}
    </div>
  );
};

export default PrimaryButton;
