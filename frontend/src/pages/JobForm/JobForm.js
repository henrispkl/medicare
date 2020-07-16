import React, { useState, useEffect } from 'react';
import Page from '../../components/Page/Page';
import API from '../../utils/API';
import styles from './JobForm.module.css';
import InputContainer from '../../components/InputContainer/InputContainer';
import SubmitButton from '../../components/Buttons/PrimaryButton/PrimaryButton';
import Spinner from '../../components/Spinner/Spinner';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { tokenConfig } from '../../store/actions/authActions';

const JobForm = (props) => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (props.edit && props.location.state.job) {
      setFormData({ ...props.location.state.job });
    }
  }, [props.edit, props.location.state]);

  const formInputChange = (e) => {
    const inputId = e.target.id;
    const content = e.target.value;
    setFormData({ ...formData, [inputId]: content });
  };

  const addJob = () => {
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

  const updateJob = () => {
    setUploading(true);

    API.post('/jobs/update', formData, tokenConfig(props.auth))
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
      <h1>{props.edit ? 'Edit job' : 'Add job'}</h1>
      <div className={styles.Form}>
        {uploading && (
          <div className={styles.SpinnerContainer}>
            <Spinner />
          </div>
        )}
        <div>
          <div className={styles.FormRow}>
            <InputContainer
              name="Job name"
              styleName={styles.Input100}
              setActiveOnMount={formData.name && true}
            >
              <label htmlFor="name"></label>
              <input
                id="name"
                minLength="3"
                type="text"
                onChange={formInputChange}
                value={formData.name ? formData.name : ''}
              />
            </InputContainer>
            <InputContainer
              name="Type"
              styleName={styles.Input25}
              setActiveOnMount={formData.jobType && true}
            >
              <label htmlFor="jobType"></label>
              <input
                id="jobType"
                minLength="3"
                type="text"
                onChange={formInputChange}
                value={formData.jobType ? formData.jobType : ''}
              />
            </InputContainer>
          </div>
          <div className={styles.FormRow}>
            <InputContainer
              name="Institution"
              styleName={styles.Input50}
              setActiveOnMount={formData.institution && true}
            >
              <label htmlFor="institution"></label>
              <input
                id="institution"
                minLength="3"
                type="text"
                onChange={formInputChange}
                value={formData.institution ? formData.institution : ''}
              />
            </InputContainer>
            <InputContainer
              name="Location"
              styleName={styles.Input100}
              setActiveOnMount={formData.location && true}
            >
              <label htmlFor="location"></label>
              <input
                id="location"
                minLength="3"
                type="text"
                onChange={formInputChange}
                value={formData.location ? formData.location : ''}
              />
            </InputContainer>
            <InputContainer
              name="Dates"
              styleName={styles.Input50}
              setActiveOnMount={formData.dates && true}
            >
              <label htmlFor="dates"></label>
              <input
                id="dates"
                minLength="3"
                type="text"
                onChange={formInputChange}
                value={formData.dates ? formData.dates : ''}
              />
            </InputContainer>
          </div>
          <div className={styles.FormRow}>
            <InputContainer
              name="Working hours"
              styleName={styles.Input100}
              setActiveOnMount={formData.workingHours && true}
            >
              <label htmlFor="workingHours"></label>
              <input
                id="workingHours"
                minLength="3"
                type="text"
                onChange={formInputChange}
                value={formData.workingHours ? formData.workingHours : ''}
              />
            </InputContainer>
            <InputContainer
              name="Working days"
              styleName={styles.Input100}
              setActiveOnMount={formData.workingDays && true}
            >
              <label htmlFor="workingDays"></label>
              <input
                id="workingDays"
                minLength="3"
                type="text"
                onChange={formInputChange}
                value={formData.workingDays ? formData.workingDays : ''}
              />
            </InputContainer>
            <InputContainer
              name="Type of contract"
              styleName={styles.Input100}
              setActiveOnMount={formData.contractType && true}
            >
              <label htmlFor="contractType"></label>
              <input
                id="contractType"
                minLength="3"
                type="text"
                onChange={formInputChange}
                value={formData.contractType ? formData.contractType : ''}
              />
            </InputContainer>
            <InputContainer
              name="Type of shifts"
              styleName={styles.Input100}
              setActiveOnMount={formData.shiftType && true}
            >
              <label htmlFor="shiftType"></label>
              <input
                id="shiftType"
                minLength="3"
                type="text"
                onChange={formInputChange}
                value={formData.shiftType ? formData.shiftType : ''}
              />
            </InputContainer>
          </div>
          <div className={styles.FormRow}>
            <InputContainer
              name="Description"
              styleName={styles.Input100}
              setActiveOnMount={formData.description && true}
            >
              <label htmlFor="description"></label>
              <textarea
                id="description"
                className={styles.Textarea}
                minLength="3"
                onChange={formInputChange}
                value={formData.description ? formData.description : ''}
                rows="8"
              ></textarea>
            </InputContainer>
          </div>
          <SubmitButton
            className={styles.SubmitButton}
            onClick={props.edit ? updateJob : addJob}
          >
            <i className="fas fa-check"></i> Submit
          </SubmitButton>
        </div>
      </div>
    </Page>
  );
};

export default connect((store) => ({
  auth: store.auth,
}))(JobForm);
