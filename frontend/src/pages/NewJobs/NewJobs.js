import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './NewJobs.module.css';
import Job from '../../components/Job/Job';
import Page from '../../components/Page/Page';
import JobModal from '../../components/JobModal/JobModal';
import Spinner from '../../components/Spinner/Spinner';

const NewJobs = () => {
  const [jobData, setJobData] = useState(null);
  const [jobModalView, setJobModalView] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:4000/jobs')
      .then(res => {
        setJobs(res.data);
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const jobClick = data => {
    setJobData(data);
    setJobModalView(true);
  };

  const hideJobModal = () => {
    setJobModalView(false);
  };

  return (
    <Page>
      <JobModal data={jobData} viewState={jobModalView} hide={hideJobModal} />
      <h1>New Jobs</h1>
      {!loaded && (
        <div className={styles.SpinnerContainer}>
          <Spinner />
        </div>
      )}

      <div>
        {jobs.map(job => (
          <Job data={job} click={jobClick} key={job._id} />
        ))}
      </div>
    </Page>
  );
};

export default NewJobs;
