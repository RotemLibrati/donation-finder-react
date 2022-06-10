import React, { useRef, useState } from 'react';
import axios from 'axios';
import './AddNewDonationPlace.css';
import API from '../ApiService';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api'
import Geocode from "react-geocode";
import ReCAPTCHA from "react-google-recaptcha";
import Select from 'react-select';
import Switch from '@mui/material/Switch';
import {donationOptions} from '../globalVariables'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

Geocode.setApiKey(`${API.api_key_google_maps}`)
Geocode.setLanguage("heb");

const AddNewDonationPlace = () => {
  const [switchToggle, setSwitchToggle] = useState(false);
  const [creator, setCreator] = useState("");
  const [description, setDescription] = useState("");

  const [website, setWebsite] = useState("");
  const [phone, setphone] = useState("");
  const [organization, setOrganization] = useState("");

  const [typeDonation, setTypeDonation] = useState("");
  const [loc, setLoc] = useState();

  
  const chosenLoactionRef = useRef()
  const [libraries] = useState(['places']);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${API.api_key_google_maps}`,
    libraries
  });

  const handleChangeCreator = event => {
    setCreator(event.target.value);
  };

  const handleChangeDescription = event => {
    setDescription(event.target.value);
  };

  const handleChangeOrganization = event => {
    setOrganization(event.target.value);
  };

  const handleChangePhone = newPhone => {
    setphone("+" + newPhone);
  };

  const handleChangeWebsite = event => {
    setWebsite(event.target.value);
  };

  const handleChangeSwitch = (eve, val) => {
    setSwitchToggle(val);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setLoc(pos);
      });
      console.log(loc);
  }

  const addDonationPlace = async (event) => {
    await event.preventDefault();
    if (!switchToggle) {
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
                typeDonation: typeDonation.value,
                location: { "address": chosenLoactionRef.current.value, "coordinates": response.results[0].geometry.location },
                website, 
                organization, 
                phone
              }
            }
          })
            .then(function (response) {
              console.log(response);
              window.location.href = '/';
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
    } else {
      Geocode.fromLatLng(loc.lat, loc.lng).then(
        async (response) => {
          await axios({
            method: 'post',
            url: `http://localhost:5000/api/donation/`,
            headers: {},
            data: {
              donation: {
                creator,
                description,
                typeDonation: typeDonation.value,
                location: { "address": response.results[0].formatted_address, "coordinates": loc }, 
                website, 
                organization, 
                phone
              }
            }
          })
            .then(function (response) {
              console.log(response);
              window.location.href = '/';
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
    }

  };

  if (!isLoaded) {
    return <label>Loading...</label>
  }
  function onReCAPTCHAChange(value) {
    console.log("Captcha value:", value);
  };
  const customStyles = {
    option: (provided, state) => ({
      ...state,
      padding: 20,


    }),
    control: base => ({
      ...base,
      width: '431px',
      height: '63px',
      border: '2px solid black',

      // boxShadow: 'none'
    }),


    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    }
  }

  return (
    <React.Fragment>
      <div className='form__new_donation'>
        <label className='label'>הוסף תרומה חדשה</label>
        <form className="form" onSubmit={addDonationPlace} >
          <input type="text" className="input" placeholder='איש קשר*' onChange={handleChangeCreator} /> <br />
          <input type="text" className="input" placeholder='תיאור*' onChange={handleChangeDescription} /> <br />
          <input type="text" className="input" placeholder='ארגון' onChange={handleChangeOrganization} /> <br />
          <input type="text" className="input" placeholder='קישור לאתר' onChange={handleChangeWebsite} /> <br />

          <PhoneInput
            containerStyle={phoneInputStyle.containerStyle}
            buttonStyle={phoneInputStyle.buttonStyle}
            inputStyle={phoneInputStyle.inputStyle}
            enableSearch
            placeholder="מספר טלפון"
            country={'il'}
            value={phone}
            onChange={handleChangePhone}
            countryCodeEditable={false}
            />
          <Select
            placeholder='בחר סוג תרומה*'
            styles={customStyles}
            className='input'
            value={typeDonation}
            onChange={select => setTypeDonation(select)}
            options={donationOptions}
          />
          <div>
            <Autocomplete>
              <input type="text" className="input" placeholder='מיקום*' ref={chosenLoactionRef} disabled={switchToggle === false ? false : true} />
            </Autocomplete>
            <Switch onChange={handleChangeSwitch} /><label>השתמש במיקומך נוכחי</label>
          </div>
          <button type="submit" className="btn">הוסף</button>
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKh"
            SecretKey="6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
            onChange={onReCAPTCHAChange}
            className='recapcha'
          />
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddNewDonationPlace;
const phoneInputStyle = {
  containerStyle: { marginBottom: "0.2rem"},
  buttonStyle: {
      height: "63px",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      borderColor: 'black',
      borderRightColor: 'lightgrey',
      borderWidth: 2,
    },
  inputStyle: {
    width: "100%",
    height: "63px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    lineHeight: 1,
    boxSizing: 'border-box',
    borderColor: 'black',
    borderWidth: 2,
    outline: "none",
    font: "normal normal normal 22px/32px Heebo",
    letterSpacing: "0px",
    color: "#363636",
  }
}