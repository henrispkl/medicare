import React from 'react';
import styles from './Job.module.css';

const Job = (props) => {
  return (
    <div className={styles.Job}>
      <div className={styles.Info}>
        <a
          className={styles.JobName}
          href={`/job/${props.data._id}`}
          onClick={(e) => {
            e.preventDefault();
            props.click(props.data);
          }}
        >
          {props.data.name}
        </a>
        <div className={styles.JobType}>{props.data.jobType}</div>
      </div>
      <div className={styles.SecondInfo}>
        <div className={styles.Row}>
          <div className={styles.InfoTitle}>TYPE OF SHIFTS</div>
          <div className={styles.ShiftType}>{props.data.shiftType}</div>
        </div>
        <div className={styles.Row}>
          <div className={styles.InfoTitle}>DATES</div>
          <div className={styles.Dates}>{props.data.dates}</div>
        </div>
      </div>
      <div className={styles.Actions}>
        <div className={styles.Buttons}>
          <div
            className={styles.DetailsButton}
            onClick={() => {
              props.click(props.data);
            }}
          >
            Details
          </div>
          <div
            className={styles.ApplyButton}
            onClick={() => {
              props.click(props.data);
            }}
          >
            Apply
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
