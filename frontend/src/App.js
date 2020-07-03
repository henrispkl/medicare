import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './App.module.css';

// Components
import RightBar from './components/RightBar/RightBar';
import MobileBar from './components/MobileBar/MobileBar';

// Pages
import NewJobs from './pages/NewJobs/NewJobs';
import Professionals from './pages/Professionals/Professionals';
import AddJob from './pages/AddJob/AddJob';
import AddProfessional from './pages/AddProfessional/AddProfessional';
import Job from './pages/Job/Job';

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <RightBar />
        <MobileBar />
        <Switch>
          <Route path="/" exact={true} component={NewJobs} />
          <Route path="/jobs/add" component={AddJob} />
          <Route path="/job/:jobId" component={Job} />
          <Route path="/professionals/add" component={AddProfessional} />
          <Route path="/professionals" component={Professionals} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
