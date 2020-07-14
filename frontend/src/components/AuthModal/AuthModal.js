import React, { useState } from 'react';
import styles from './AuthModal.module.css';
import InputContainer from '../InputContainer/InputContainer';
import Submit from '../Buttons/PrimaryButton/PrimaryButton';

const AuthModal = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [visibility] = useState(props.visibility);
  const [containerClasses, setContainerClasses] = useState([styles.Container]);

  // Form data handlers
  const handleEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePassword = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleName = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  // Transition handlers
  const showRegisterPage = () => {
    setContainerClasses([...containerClasses, styles.registerPage]);
  };

  const showLoginPage = () => {
    setContainerClasses([styles.Container]);
  };

  return (
    <div
      className={
        visibility
          ? [styles.Bg, styles.visible].join(' ')
          : [styles.Bg].join(' ')
      }
    >
      <div className={styles.AuthModal}>
        <div className={styles.BoxDetail}></div>
        <div className={styles.Content}>
          <div className={styles.Close}>
            <i className="far fa-window-close"></i>
          </div>
          <div className={containerClasses.join(' ')}>
            <div className={styles.Login}>
              <h2 className={styles.Title}>Login</h2>
              <InputContainer name="Email" styleName={styles.Input}>
                <label htmlFor="loginEmail">Email</label>
                <input
                  value={formData.email}
                  id="loginEmail"
                  type="email"
                  onChange={handleEmail}
                />
              </InputContainer>
              <InputContainer name="Password" styleName={styles.Input}>
                <label htmlFor="loginPassword">Password</label>
                <input
                  value={formData.password}
                  id="loginPassword"
                  minLength="3"
                  type="password"
                  onChange={handlePassword}
                />
              </InputContainer>
              <div className={styles.Link} onClick={showRegisterPage}>
                Create a new account
              </div>
              <Submit className={styles.SubmitButton}>Login</Submit>
            </div>
            <div className={styles.Register}>
              <h2 className={styles.Title}>Create an account</h2>
              <InputContainer name="Name" styleName={styles.Input}>
                <label htmlFor="registerName">Name</label>
                <input
                  value={formData.name}
                  id="registerName"
                  type="text"
                  onChange={handleName}
                />
              </InputContainer>
              <InputContainer name="Email" styleName={styles.Input}>
                <label htmlFor="registerEmail">Email</label>
                <input
                  value={formData.email}
                  id="registerEmail"
                  type="email"
                  onChange={handleEmail}
                />
              </InputContainer>
              <InputContainer name="Password" styleName={styles.Input}>
                <label htmlFor="registerPassword">Password</label>
                <input
                  value={formData.password}
                  id="registerPassword"
                  minLength="3"
                  type="password"
                  onChange={handlePassword}
                />
              </InputContainer>
              <div className={styles.Link} onClick={showLoginPage}>
                Go back to login
              </div>
              <Submit className={styles.SubmitButton}>Register</Submit>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
