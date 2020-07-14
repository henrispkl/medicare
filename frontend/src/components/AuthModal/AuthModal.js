import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './AuthModal.module.css';
import InputContainer from '../InputContainer/InputContainer';
import Submit from '../Buttons/PrimaryButton/PrimaryButton';
import { setAuthModal } from '../../store/actions/appActions';
import { register } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';

const AuthModal = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [containerClasses, setContainerClasses] = useState([styles.Container]);
  const bgRef = useRef(null);

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

  const closeModal = () => {
    props.dispatch(setAuthModal(false));

    setTimeout(() => {
      // clear error messages
      setErrorMessage(null);
      props.dispatch(clearErrors());

      // Reset to login page
      showLoginPage();
    }, 500);
  };

  const bgClickHandler = (e) => {
    if (bgRef.current && e.target === bgRef.current) {
      closeModal();
    }
  };

  // Auth handlers
  const registerUser = () => {
    const { name, email, password } = formData;

    // Create user object
    const newUser = {
      name,
      email,
      password,
    };

    // Attempt to register
    props.dispatch(register(newUser));
  };

  // Show error message on props.error changes
  useEffect(() => {
    const error = props.error;
    if (error.id && error.id === 'REGISTER_FAIL') {
      setErrorMessage(error.msg.msg);
    } else {
      setErrorMessage(null);
    }
  }, [props.error]);

  // Close modal on authentication
  useEffect(() => {
    if (props.isAuthenticated) {
      closeModal();
    }
  }, [props.isAuthenticated]);

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
        props.visibility
          ? [styles.Bg, styles.visible].join(' ')
          : [styles.Bg].join(' ')
      }
      ref={bgRef}
      onClick={bgClickHandler}
    >
      <div className={styles.AuthModal}>
        <div className={styles.BoxDetail}></div>
        <div className={styles.Content}>
          <div className={styles.Close} onClick={closeModal}>
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
              <div className={styles.FormInfo}>
                <div className={styles.Link} onClick={showRegisterPage}>
                  Create a new account
                </div>
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
              <div className={styles.FormInfo}>
                <div className={styles.Link} onClick={showLoginPage}>
                  Go back to login
                </div>
                {errorMessage ? (
                  <div className={styles.ErrorMessage}>{errorMessage}</div>
                ) : null}
              </div>

              <Submit className={styles.SubmitButton} onClick={registerUser}>
                Register
              </Submit>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect((store) => ({
  visibility: store.app.authModal,
  isAuthenticated: store.auth.isAuthenticated,
  error: store.err,
}))(AuthModal);
