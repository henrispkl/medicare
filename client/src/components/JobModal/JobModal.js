import React from 'react';
import styles from './JobModal.module.css';
import JobContent from '../JobContent/JobContent';

const JobModal = props => {
  let jobData;

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

  return (
    <div className={props.viewState ? '' : styles.Hidden}>
      <div className={styles.Bg} onClick={props.hide}></div>
      <div className={styles.Window}>
        <div className={styles.Frame}>
          <JobContent data={jobData} hide={props.hide}/>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
