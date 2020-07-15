import React, { useState, useEffect } from 'react';
import styles from './Job.module.css';
import Page from '../../components/Page/Page';
import JobContent from '../../components/JobContent/JobContent';
import Spinner from '../../components/Spinner/Spinner';
import API from '../../utils/API';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { tokenConfig } from '../../store/actions/authActions';

const Job = (props) => {
  const { jobId } = useParams();
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [jobData, setJobData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    API.get(`/jobs/${jobId}`).then((res) => {
      setJobData(res.data);
      setLoading(false);
    });
  }, [jobId]);

  const deleteJob = () => {
    setDeleting(true);
    API.delete(`/jobs/${jobId}`, tokenConfig(props.auth))
      .then((res) => {
        setDeleting(false);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Page>
      {loading ? (
        <div className={styles.SpinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.Container}>
          <div className={styles.Job}>
            <JobContent data={jobData} full />
          </div>
          <div className={styles.Actions}>
            <b>Actions</b>
            <div className={styles.DeleteJob} onClick={deleteJob}>
              {deleting ? (
                <Spinner spinner2 />
              ) : (
                <span>
                  <i className="fas fa-trash-alt"></i> Delete job
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

export default connect((store) => ({
  auth: store.auth,
}))(Job);
