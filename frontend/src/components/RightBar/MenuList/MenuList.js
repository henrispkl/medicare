import React, { useEffect, useState } from 'react';
import styles from './MenuList.module.css';
import API from '../../../utils/API';

import MenuItem from './MenuItem/MenuItem';

const MenuList = (props) => {
  const [professionalsNumber, setProfessionalsNumber] = useState(0);

  useEffect(() => {
    API.get('/stats/professionals').then((res) => {
      setProfessionalsNumber(res.data.count);
    });
  }, []);

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
