import React, { useRef, useState } from 'react';
import axios from 'axios';
import './AddNewDonationPlace.css';
import API from '../ApiService'

import {
    useJsApiLoader,
    Autocomplete,
  } from '@react-google-maps/api'
import Geocode from "react-geocode";
import ReCAPTCHA from "react-google-recaptcha";


Geocode.setApiKey(`${API.api_key_google_maps}`)

// set response language. Defaults to english.
Geocode.setLanguage("heb");

const AddNewDonationPlace = () => {
  const [creator, setCreator] = useState("");
  const [description, setDescription] = useState("");
  const [typeDonation, setTypeDonation] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const chosenLoactionRef = useRef()
  const [ libraries ] = useState(['places']);

  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: `${API.api_key_google_maps}`,
    libraries
})

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
    Geocode.fromAddress(chosenLoactionRef.current.value).then(
      async (response) => {
    
          await axios({
            method: 'post',
            url: `http://localhost:5000/api/donation/`,
            headers: {},
            data: {
              donation: {
                creator,
                description,
                typeDonation,
                location: {"address":chosenLoactionRef.current.value, "coordinates": response.results[0].geometry.location}
              }
            }
          })
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.log(error);
            });
          },
          (error) => {
            alert("Sorry, location not found !");
            console.error("Location Not Found!");
          }
        );
  };

  if(!isLoaded){
      return <label>Loading...</label>
  } 
  function onReCAPTCHAChange(value) {
    console.log("Captcha value:", value);
  }
  
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
          <Autocomplete>
            <input type="text" className="input" placeholder='מיקום' ref={chosenLoactionRef}/>
        </Autocomplete>
        <button type="submit" className="btn">הוסף</button>
        <ReCAPTCHA
          sitekey= "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKh"
          SecretKey="6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
          onChange={onReCAPTCHAChange}
          className='recapcha'
        />
        </form>
      </div>
    </React.Fragment>
  );
}

export default AddNewDonationPlace;
