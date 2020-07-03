import React from 'react';
import Logo from '../Logo/Logo';
import MenuList from './MenuList/MenuList';
import { connect } from 'react-redux';
import appActions from '../../reducers/appReducer/appActions';

import styles from './RightBar.module.css';

const RightBar = (props) => {
  let barStyles = [styles.RightBar];

  if (!props.viewBar) {
    barStyles.push(styles.HiddenBar);
  }

  const hideBar = () => {
    props.dispatch(appActions.setViewbar(false));
  };

  return (
    <React.Fragment>
      <div className={barStyles.join(' ')}>
        <Logo padding="15px" />
        <MenuList hideBar={hideBar} />
      </div>
      <div
        className={styles.Bg}
        style={{
          opacity: props.viewBar ? '1' : '0',
          visibility: props.viewBar ? 'visible' : 'hidden',
        }}
        onClick={hideBar}
      ></div>
    </React.Fragment>
  );
};

export default connect((store) => ({ viewBar: store.viewBar }))(RightBar);
