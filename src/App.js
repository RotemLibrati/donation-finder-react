import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import AddNewDonationPlace from './pages/AddNewDonationPlace';
import SearchDonation from './pages/SearchDonation';
import MainNavigation from './components/Navigation/MainNavigation';


const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <SearchDonation />
          </Route>
          <Route path="/donation/addDonation" exact>
            <AddNewDonationPlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;


/* exact - יפעיל את הקומפוננטה רק כאשר הדף יהיה בלינק המתאים */
/* Redirect - דף ברירת מחדל */