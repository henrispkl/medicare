import React, { useRef, useEffect, useState } from 'react';
import styles from './InputContainer.module.css';

const InputContainer = props => {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const [activeName, setActiveName] = useState('');
  let propClassName = '';

  useEffect(() => {
    // Focus input even if clicked on activeName
    if (nameRef.current) {
      nameRef.current.addEventListener('click', () => {
        containerRef.current.querySelector('input').focus();
      });
    }

    // Toggle focus/active mode
    if (containerRef.current) {
      const input =
        containerRef.current.querySelector('input') ||
        containerRef.current.querySelector('textarea');

      input.addEventListener('focus', () => {
        setActiveName(styles.ActiveName);
      });

      input.addEventListener('blur', () => {
        if (input.value.length === 0) {
          setActiveName('');
        }
      });
    }
  }, []);

  if (props.styleName) {
    propClassName = props.styleName;
  }

  return (
    <div
      className={styles.InputContainer + ' ' + propClassName}
      ref={containerRef}
    >
      <div className={styles.Name + ' ' + activeName} ref={nameRef}>
        {props.name}
      </div>
      {props.children}
    </div>
  );
};

export default InputContainer;
