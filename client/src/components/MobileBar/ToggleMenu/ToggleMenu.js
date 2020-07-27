import React from 'react';
import styles from './ToggleMenu.module.css';

const ToggleMenu = props => {
  return (
    <div className={styles.ToggleMenu} onClick={props.click}>
      <i className="fas fa-bars"></i>
    </div>
  );
};

export default ToggleMenu;
