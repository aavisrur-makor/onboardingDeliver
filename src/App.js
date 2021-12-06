import { Container, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import StepperFormComplex from './components/StepperFormComplex';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimpleForm from './components/SimpleForm';
import FinaleBox from './components/FinaleBox';
import useEventListener from './hooks/useEventListener';

const useStyles = makeStyles({
  container: {
    width: '50%',
    backgroundColor: 'white',
  },
});

const App = () => {
  const classes = useStyles();
  const appRef = useEventListener('copy', (e) => {
    e.preventDefault();
  });

  useEffect(() => {
    console.log('PROCESS< PORT', process.env.REACT_APP_APP_PORT);
  });

  return (
    <Container xs={12} md={6} className={classes.container} ref={appRef}>
      <Router>
        <Routes>
          <Route path='/' element={<SimpleForm />}></Route>
          <Route path='/:uuid' element={<StepperFormComplex />}></Route>
          <Route path='/finale' element={<FinaleBox />}></Route>
        </Routes>
      </Router>
      <FinaleBox />
    </Container>
  );
};

export default App;
