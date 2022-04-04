import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import AddNewDonationPlace from './screens/AddNewDonationPlace';


function App() {
  return (
    <div className="App" >
      <AddNewDonationPlace/>
    </div>
  );
}

export default App;
