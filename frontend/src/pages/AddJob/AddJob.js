import React, { useState } from 'react';
import Page from '../../components/Page/Page';
import axios from 'axios';
import styles from './AddJob.module.css';
import InputContainer from '../../components/InputContainer/InputContainer';
import SubmitButton from '../../components/Buttons/PrimaryButton/PrimaryButton';

const NewJob = () => {
  const [formData, setFormData] = useState({});

  const formInputChange = e => {
    const inputId = e.target.id;
    const content = e.target.value;
    setFormData({ ...formData, [inputId]: content });
  };

  const submitForm = () => {
    axios
      .post('http://localhost:4000/jobs/add', formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Page>
      <h1>Add job</h1>
      <form className={styles.Form}>
        <div className={styles.FormRow}>
          <InputContainer name="Job name" styleName={styles.Input100}>
            <label htmlFor="jobName"></label>
            <input
              id="jobName"
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
        <SubmitButton className={styles.SubmitButton} click={submitForm}>
          Submit
        </SubmitButton>
      </form>
    </Page>
  );
};

export default NewJob;
