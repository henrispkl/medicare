import React from 'react';
import styles from './MobileBar.module.css';

import ToggleMenu from './ToggleMenu/ToggleMenu';
import Logo from '../Logo/Logo';

const MobileBar = props => {
  return (
    <div className={styles.MobileBar}>
      <ToggleMenu click={props.displayBar} />
      <Logo />
    </div>
  );
};

export default MobileBar;
