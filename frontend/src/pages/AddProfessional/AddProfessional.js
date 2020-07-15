import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../../components/Page/Page';
import API from '../../utils/API';
import styles from './AddProfessional.module.css';
import InputContainer from '../../components/InputContainer/InputContainer';
import SubmitButton from '../../components/Buttons/PrimaryButton/PrimaryButton';
import Spinner from '../../components/Spinner/Spinner';
import { connect } from 'react-redux';
import { tokenConfig } from '../../store/actions/authActions';

const AddProfessional = (props) => {
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [professionalType, setProfessionalType] = useState('doctor');
  const doctorButtonRef = useRef(null);
  const nurseButtonRef = useRef(null);
  const history = useHistory();

  const formInputChange = (e) => {
    const inputId = e.target.id;
    const content = e.target.value;
    setFormData({ ...formData, [inputId]: content });
  };

  useEffect(() => {
    if (props.location.hash === '#nurse') {
      setProfessionalType('nurse');
      resetTypeStyles();
      nurseButtonRef.current.classList.add(styles.Active);
    }
  }, [props.location.hash]);

  const submitForm = () => {
    let url = '';
    setUploading(true);

    if (professionalType === 'doctor') {
      url = '/doctors/add';
    } else if (professionalType === 'nurse') {
      url = '/nurses/add';
    }

    API.post(url, formData, tokenConfig(props.auth))
      .then((res) => {
        setUploading(false);

        history.push('/professionals');
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const resetTypeStyles = () => {
    doctorButtonRef.current.classList.remove(styles.Active);
    nurseButtonRef.current.classList.remove(styles.Active);
  };

  const selectType = (e) => {
    let element = null;

    // Set element
    if (e.target.classList.contains(styles.Type)) {
      element = e.target;
    } else {
      element = e.target.closest('.' + styles.Type);
    }

    let id = element.id;
    resetTypeStyles();

    element.classList.add(styles.Active);
    setProfessionalType(id);
    // console.log(professionalType);
  };

  return (
    <Page>
      <h1>Add a professional</h1>
      <div className={styles.Form}>
        {uploading && (
          <div className={styles.SpinnerContainer}>
            <Spinner />
          </div>
        )}
        <div>
          <div className={styles.FormRow}>
            <div className={styles.TypeSelect}>
              <div
                id="doctor"
                className={[styles.Type, styles.Active].join(' ')}
                onClick={selectType}
                ref={doctorButtonRef}
              >
                <div className={styles.Icon}>
                  <i className="fas fa-user-md"></i>
                </div>
                <div className={styles.TypeText}>Doctor</div>
              </div>
              <div
                id="nurse"
                className={styles.Type}
                onClick={selectType}
                ref={nurseButtonRef}
              >
                <div className={styles.Icon}>
                  <i className="fas fa-user-nurse"></i>
                </div>
                <div className={styles.TypeText}>Nurse</div>
              </div>
            </div>
          </div>
          <div className={styles.FormRow}>
            <InputContainer name="Name" styleName={styles.Input100}>
              <label htmlFor="name"></label>
              <input
                id="name"
                minLength="3"
                type="text"
                onChange={formInputChange}
              />
            </InputContainer>
            <InputContainer name="Country" styleName={styles.Input50}>
              <label htmlFor="country"></label>
              <input
                id="country"
                minLength="3"
                type="text"
                onChange={formInputChange}
              />
            </InputContainer>
            <InputContainer name="Company" styleName={styles.Input50}>
              <label htmlFor="company"></label>
              <input
                id="company"
                minLength="3"
                type="text"
                onChange={formInputChange}
              />
            </InputContainer>
          </div>
          <SubmitButton className={styles.SubmitButton} onClick={submitForm}>
            <i className="fas fa-check"></i> Submit
          </SubmitButton>
        </div>
      </div>
    </Page>
  );
};

export default connect((store) => ({
  auth: store.auth,
}))(AddProfessional);
