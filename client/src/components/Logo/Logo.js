import React from 'react';
import logoImage from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

import styles from './Logo.module.css';

const Logo = props => {
  return (
    <div
      className={styles.LogoContainer}
      style={{ padding: props.padding && props.padding }}
    >
      <Link to="/">
        <img src={logoImage} alt="" />
      </Link>
    </div>
  );
};

export default Logo;
