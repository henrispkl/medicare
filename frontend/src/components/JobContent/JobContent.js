import React from 'react';
import styles from './JobContent.module.css';
import { useHistory } from 'react-router-dom';

const JobContent = props => {
  const history = useHistory();
  const jobData = props.data;

  const viewJobPage = () => {
    history.push(`/job/${jobData._id}`);
  };

  const buttonStyle = {
    marginTop: '20px',
    position: 'relative'
  };

  const descStyle = {
    maxHeight: 'none',
    overflowY: 'none'
  };

  return (
    <div className={styles.Job}>
      <div className={styles.Actions}>
        {!props.full && (
          <div className={styles.CloseButton} onClick={props.hide}>
            <i className="fas fa-times"></i>
          </div>
        )}
      </div>
      <div className={styles.Id}>ID: {jobData._id}</div>
      <div className={styles.Name}>
        <h2 onClick={viewJobPage}>{jobData.name}</h2>
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
        <div className={styles.DescContent} style={props.full ? descStyle : {}}>
          {jobData.description}
        </div>
      </div>
      <div className={styles.Apply} style={props.full ? buttonStyle : {}}>
        Apply
      </div>
    </div>
  );
};

export default JobContent;
