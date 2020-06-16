import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './App.module.css';

// Components
import RightBar from './components/RightBar/RightBar';
import MobileBar from './components/MobileBar/MobileBar';

// Pages
import NewJobs from './pages/NewJobs/NewJobs';
import Professionals from './pages/Professionals/Professionals';
import AddJob from './pages/AddJob/AddJob';

const App = () => {
  const [viewBar, setViewBar] = useState(false);

  const displayBar = () => {
    setViewBar(true);
  };

  const hideBar = () => {
    setViewBar(false);
  };

  return (
    <BrowserRouter>
      <div className={styles.App}>
        <RightBar viewBar={viewBar} hideBar={hideBar} />
        <MobileBar displayBar={displayBar} />
        <Switch>
          <Route path="/" exact={true} component={NewJobs} />
          <Route path="/professionals" component={Professionals} />
          <Route path="/jobs/add" component={AddJob} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
