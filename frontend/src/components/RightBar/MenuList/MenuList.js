import React from 'react';
import styles from './MenuList.module.css';

import MenuItem from './MenuItem/MenuItem';
const professionalsNumber = '20';

const MenuList = props => {
  return (
    <div className={styles.MenuList}>
      <MenuItem
        hideBar={props.hideBar}
        name="New Jobs"
        to="/"
        icon="fas fa-briefcase"
        exact
      />
      <MenuItem
        hideBar={props.hideBar}
        name="Professionals"
        to="/professionals"
        number={professionalsNumber}
      />
    </div>
  );
};

export default MenuList;
