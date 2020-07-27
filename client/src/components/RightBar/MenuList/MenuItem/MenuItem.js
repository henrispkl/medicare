import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MenuItem.module.css';

const MenuItem = props => {
  let itemContent;
  let itemRef = useRef(null);

  if (props.icon) {
    itemContent = <i className={props.icon}></i>;
  } else if (props.number) {
    itemContent = (
      <div className={styles.NumberContainer}>
        <div className={styles.Number}>{props.number}</div>
      </div>
    );
  }

  const closeBarOnClick = () => {
    if (!itemRef.current.classList.contains(styles.ActiveItem)) {
      props.hideBar();
    }
  };

  return (
    <NavLink
      to={props.to}
      activeClassName={styles.ActiveItem}
      className={styles.MenuLink}
      exact={props.exact}
      onClick={closeBarOnClick}
      ref={itemRef}
    >
      <div className={styles.MenuItem}>
        <div className={styles.ActiveBorder} />

        <div className={styles.Content}>
          <div className={styles.Icon}>{itemContent}</div>
          {props.name}
        </div>
      </div>
    </NavLink>
  );
};

export default MenuItem;
