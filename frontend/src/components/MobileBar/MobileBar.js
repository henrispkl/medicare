import React from 'react';
import styles from './MobileBar.module.css';
import { connect } from 'react-redux';
import appActions from '../../reducers/appReducer/appActions';

import ToggleMenu from './ToggleMenu/ToggleMenu';
import Logo from '../Logo/Logo';

const MobileBar = (props) => {
  const displayBar = () => {
    props.dispatch(appActions.setViewbar(true));
  };

  return (
    <div className={styles.MobileBar}>
      <ToggleMenu click={displayBar} />
      <Logo />
    </div>
  );
};

export default connect((store) => ({ viewBar: store.viewBar }))(MobileBar);
