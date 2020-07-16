import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import styles from './NewJobs.module.css';
import Job from '../../components/Job/Job';
import Page from '../../components/Page/Page';
import JobModal from '../../components/JobModal/JobModal';
import Spinner from '../../components/Spinner/Spinner';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton';
import { connect } from 'react-redux';

const NewJobs = (props) => {
  const [jobData, setJobData] = useState(null);
  const [jobModalView, setJobModalView] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    API.get('/jobs')
      .then((res) => {
        setJobs(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const jobClick = (data) => {
    setJobData(data);
    setJobModalView(true);
  };

  const hideJobModal = () => {
    setJobModalView(false);
  };

  return (
    <Page>
      <JobModal data={jobData} viewState={jobModalView} hide={hideJobModal} />
      <div className={styles.TitleBar}>
        <h1>New Jobs</h1>
        <Link className={styles.AddJobButton} to="/jobs/add">
          {props.isAuthenticated && (
            <PrimaryButton>
              <i className="fas fa-plus-square"></i> Create a new job
            </PrimaryButton>
          )}
        </Link>
      </div>
      {!loaded && (
        <div className={styles.SpinnerContainer}>
          <Spinner />
        </div>
      )}

      <div>
        {jobs.map((job) => (
          <Job data={job} click={jobClick} key={job._id} />
        ))}
      </div>
    </Page>
  );
};

export default connect((store) => ({
  isAuthenticated: store.auth.isAuthenticated,
}))(NewJobs);
