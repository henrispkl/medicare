import React from 'react';
import Logo from '../Logo/Logo';
import MenuList from './MenuList/MenuList';

import styles from './RightBar.module.css';

const RightBar = props => {
  let barStyles = [styles.RightBar];

  if (!props.viewBar) {
    barStyles.push(styles.HiddenBar);
  }

  return (
    <React.Fragment>
      <div className={barStyles.join(' ')}>
        <Logo padding="15px" />
        <MenuList hideBar={props.hideBar} />
      </div>
      <div
        className={styles.Bg}
        style={{
          opacity: props.viewBar ? '1' : '0',
          visibility: props.viewBar ? 'visible' : 'hidden'
        }}
        onClick={props.hideBar}
      ></div>
    </React.Fragment>
  );
};

export default RightBar;
