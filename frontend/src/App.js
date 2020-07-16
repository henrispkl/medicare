import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './App.module.css';

// Components
import RightBar from './components/RightBar/RightBar';
import MobileBar from './components/MobileBar/MobileBar';

// Redux
import { connect } from 'react-redux';
import { loadUser } from './store/actions/authActions';

// Pages
import NewJobs from './pages/NewJobs/NewJobs';
import Professionals from './pages/Professionals/Professionals';
import JobForm from './pages/JobForm/JobForm';
import AddProfessional from './pages/AddProfessional/AddProfessional';
import Job from './pages/Job/Job';
import AuthModal from './components/AuthModal/AuthModal';

const App = (props) => {
  useEffect(() => {
    props.dispatch(loadUser());
  }, [props]);

  return (
    <BrowserRouter>
      <div className={styles.App}>
        <AuthModal />
        <RightBar />
        <MobileBar />
        <Switch>
          <Route path="/" exact={true} component={NewJobs} />
          <Route path="/jobs/add" component={JobForm} />
          <Route
            path="/jobs/edit"
            component={(props) => <JobForm {...props} edit={true} />}
          />
          <Route path="/job/:jobId" component={Job} />
          <Route path="/professionals/add" component={AddProfessional} />
          <Route path="/professionals" component={Professionals} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default connect()(App);
