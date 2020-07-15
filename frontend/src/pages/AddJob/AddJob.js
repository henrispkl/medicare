import React, { useState } from 'react';
import Page from '../../components/Page/Page';
import API from '../../utils/API';
import styles from './AddJob.module.css';
import InputContainer from '../../components/InputContainer/InputContainer';
import SubmitButton from '../../components/Buttons/PrimaryButton/PrimaryButton';
import Spinner from '../../components/Spinner/Spinner';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { tokenConfig } from '../../store/actions/authActions';

const NewJob = (props) => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  const formInputChange = (e) => {
    const inputId = e.target.id;
    const content = e.target.value;
    setFormData({ ...formData, [inputId]: content });
  };

  const submitForm = () => {
    setUploading(true);

    API.post('/jobs/add', formData, tokenConfig(props.auth))
      .then((res) => {
        setUploading(false);
        history.push(`/job/${res.data.result._id}`);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Page>
      <h1>Add job</h1>
      <div className={styles.Form}>
        {uploading && (
          <div className={styles.SpinnerContainer}>
            <Spinner />
          </div>
        )}
        <div>
          <div className={styles.FormRow}>
            <InputContainer name="Job name" styleName={styles.Input100}>
              <label htmlFor="name"></label>
              <input
                id="name"
                minLength="3"
                type="text"
                onChange={formInputChange}
              />
            </InputContainer>
            <InputContainer name="Type" styleName={styles.Input25}>
              <label htmlFor="jobType"></label>
              <input
                id="jobType"
                minLength="3"
                type="text"
                onChange={formInputChange}
              />
            </InputContainer>
          </div>
          <div className={styles.FormRow}>
            <InputContainer name="Institution" styleName={styles.Input50}>
              <label htmlFor="institution"></label>
              <input
                id="institution"
                minLength="3"
                type="text"
                onChange={formInputChange}
              />
            </InputContainer>
            <InputContainer name="Location" styleName={styles.Input100}>
              <label htmlFor="location"></label>
              <input
                id="location"
                minLength="3"
                type="text"
                onChange={formInputChange}
              />
            </InputContainer>
            <InputContainer name="Dates" styleName={styles.Input50}>
              <label htmlFor="dates"></label>
              <input
                id="dates"
                minLength="3"
                type="text"
                onChange={formInputChange}
              />
            </InputContainer>
          </div>
          <div className={styles.FormRow}>
            <InputContainer name="Working hours" styleName={styles.Input100}>
              <label htmlFor="workingHours"></label>
              <input
                id="workingHours"
                minLength="3"
                type="text"
                onChange={formInputChange}
              />
            </InputContainer>
            <InputContainer name="Working days" styleName={styles.Input100}>
              <label htmlFor="workingDays"></label>
              <input
                id="workingDays"
                minLength="3"
                type="text"
                onChange={formInputChange}
              />
            </InputContainer>
            <InputContainer name="Type of contract" styleName={styles.Input100}>
              <label htmlFor="contractType"></label>
              <input
                id="contractType"
                minLength="3"
                type="text"
                onChange={formInputChange}
              />
            </InputContainer>
            <InputContainer name="Type of shifts" styleName={styles.Input100}>
              <label htmlFor="shiftType"></label>
              <input
                id="shiftType"
                minLength="3"
                type="text"
                onChange={formInputChange}
              />
            </InputContainer>
          </div>
          <div className={styles.FormRow}>
            <InputContainer name="Description" styleName={styles.Input100}>
              <label htmlFor="description"></label>
              <textarea
                id="description"
                className={styles.Textarea}
                minLength="3"
                onChange={formInputChange}
                rows="8"
              ></textarea>
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
}))(NewJob);
