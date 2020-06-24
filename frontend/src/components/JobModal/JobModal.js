import React, { useState } from 'react';
import styles from './JobModal.module.css';
import Spinner from '../Spinner/Spinner';
import API from '../../utils/API';
import { useHistory } from 'react-router-dom';

const JobModal = props => {
  const history = useHistory();
  let jobData;
  const [deleting, setDeleting] = useState(false);

  if (props.data) {
    jobData = { ...props.data };
  } else {
    jobData = {
      id: '',
      name: '',
      jobType: '',
      institution: '',
      location: '',
      dates: '',
      workingHours: '',
      workingDays: '',
      contractType: '',
      shiftType: '',
      description: ''
    };
  }

  const deleteJob = () => {
    setDeleting(true);
    API.delete('/jobs/' + jobData._id)
      .then(res => {
        setDeleting(false);
        history.go();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className={props.viewState ? '' : styles.Hidden}>
      <div className={styles.Bg} onClick={props.hide}></div>
      <div className={styles.Window}>
        <div className={styles.Frame}>
          <div className={styles.Actions}>
            <div className={styles.DeleteButton} onClick={deleteJob}>
              {deleting ? (
                <Spinner spinner2 />
              ) : (
                <i className="fas fa-trash-alt"></i>
              )}
            </div>
            <div className={styles.CloseButton} onClick={props.hide}>
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div className={styles.Id}>ID: {jobData._id}</div>
          <div className={styles.Name}>
            <h2>{jobData.name}</h2>
            <div className={styles.JobType}>{jobData.jobType}</div>
          </div>

          <div className={styles.Info}>
            <div className={styles.InfoRow}>
              <div className={styles.Label}>
                <div className={styles.LabelName}>Institution</div>
              </div>
              <div className={styles.LabelValue}>
                <i className="fas fa-university"></i> {jobData.institution}
              </div>
            </div>
            <div className={styles.InfoRow}>
              <div className={styles.Label}>
                <div className={styles.LabelName}>Location</div>
              </div>
              <div className={styles.LabelValue}>
                <i className="fas fa-map-marker-alt"></i> {jobData.location}
              </div>
            </div>
            <div className={styles.InfoRow}>
              <div className={styles.Label}>
                <div className={styles.LabelName}>Dates</div>
              </div>
              <div className={styles.LabelValue}>
                <i className="far fa-calendar-alt"></i> {jobData.dates}
              </div>
            </div>
            <div className={styles.InfoRow}>
              <div className={styles.Label}>
                <div className={styles.LabelName}>Working Hours</div>
              </div>
              <div className={styles.LabelValue}>
                <i className="far fa-clock"></i>
                {jobData.workingHours}
              </div>
            </div>
            <div className={styles.InfoRow}>
              <div className={styles.Label}>
                <div className={styles.LabelName}>Working Days</div>
              </div>
              <div className={styles.LabelValue}>
                <i className="fas fa-calendar-day"></i> {jobData.workingDays}
              </div>
            </div>
            <div className={styles.InfoRow}>
              <div className={styles.Label}>
                <div className={styles.LabelName}>Type of Contract</div>
              </div>
              <div className={styles.LabelValue}>
                <i className="fas fa-file-contract"></i> {jobData.contractType}
              </div>
            </div>
            <div className={styles.InfoRow}>
              <div className={styles.Label}>
                <div className={styles.LabelName}>Type of shifts</div>
              </div>
              <div className={styles.LabelValue}>
                <i className="fas fa-user-clock"></i> {jobData.shiftType}
              </div>
            </div>
            <div className={styles.DescName}>Description</div>
            <div className={styles.DescContent}>{jobData.description}</div>
          </div>
          <div className={styles.Apply}>Apply</div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
