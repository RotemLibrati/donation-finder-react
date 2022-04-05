import React, { useState } from 'react';
import axios from 'axios';
import './AddNewDonationPlace.css';


const AddNewDonationPlace = () => {
  const [creator, setCreator] = useState("");
  const [description, setDescription] = useState("");
  const [typeDonation, setTypeDonation] = useState("");

  const handleChangeCreator = event => {
    setCreator(event.target.value);
  };
  const handleChangeDescription = event => {
    setDescription(event.target.value);
  };
  const handleChangeTypeDonation = event => {
    setTypeDonation(event.target.value);
  };
  const addDonationPlace = async (event) => {
    await event.preventDefault();
    await axios({
      method: 'post',
      url: `http://localhost:5000/api/donation/`,
      headers: {},
      data: {
        donation: {
          creator,
          description,
          typeDonation
        }
      }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    //   <div style={ {display: 'grid', width:"15%",} } >
    //     <input id={"creator"} placeholder='שם יוצר' onChange={(event) => setCreator(event.target.value)}/>
    //     <input id={"description"} placeholder='תיאור' onChange={(event) => setDescription(event.target.value)}/>
    //     <input id={"typeDonation"} placeholder='סוג תרומה' onChange={(event) => setTypeDonation(event.target.value)}/>
    //     <button onClick={()=>{addDonationPlace()}}>הוסף מקום</button>
    // </div>
    <React.Fragment>

      <div className='form__new_donation'>
        <label className='label'>הוסף תרומה חדשה</label>
        <form className="form" onSubmit={addDonationPlace}>
          <input type="text" className="input" placeholder='שם היוצר' onChange={handleChangeCreator}/> <br />
          <input type="text" className="input" placeholder='תיאור' onChange={handleChangeDescription} /> <br />
          <input type="text" className="input" placeholder='סוג התרומה' onChange={handleChangeTypeDonation} /> <br />
          <button type="submit" className="btn">הוסף</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default AddNewDonationPlace;
