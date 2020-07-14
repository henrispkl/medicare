import React from 'react';
import styles from './PrimaryButton.module.css';

const PrimaryButton = (props) => {
  const classes = [props.className, styles.PrimaryButton, 'PrimaryButton'];

  if (props.inactive) {
    classes.push(styles.Inactive);
  }

  return (
    <div className={classes.join(' ')} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default PrimaryButton;
