import React, { useState } from 'react';
import axios from 'axios';


function AddNewDonationPlace() {
  const [creator, setCreator] = useState("");
  const [description, setDescription] = useState("");
  const [typeDonation, setTypeDonation] = useState("");

    const addDonationPlace = async () => {
      await axios({
        method: 'post',
        url: `http://localhost:5000/api/donation/`,
        headers: { },
        data:{
          donation:{
          creator,
          description,
          typeDonation
        }}
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
  return (
      <div style={ {display: 'grid', width:"15%",} } >
        <input id={"creator"} placeholder='שם יוצר' onChange={(event) => setCreator(event.target.value)}/>
        <input id={"description"} placeholder='תיאור' onChange={(event) => setDescription(event.target.value)}/>
        <input id={"typeDonation"} placeholder='סוג תרומה' onChange={(event) => setTypeDonation(event.target.value)}/>
        <button onClick={()=>{addDonationPlace()}}>הוסף מקום</button>
    </div>
  );
}

export default AddNewDonationPlace;
