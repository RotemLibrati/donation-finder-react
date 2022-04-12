import React, { useState, useEffect, useRef } from "react";
import Map from "../components/GoogleMapComponent/Map";
import axios from 'axios';
import Select from 'react-select'
import DonationListItem from "../components/DonationListItem";
import API from '../ApiService'

import {
    useJsApiLoader,
    Autocomplete,
  } from '@react-google-maps/api'
import Geocode from "react-geocode";


Geocode.setApiKey(`${API.api_key_google_maps}`)

// set response language. Defaults to english.
Geocode.setLanguage("heb");

// import Maps from "../components/Maps/Maps";


const SearchDonation = () => {
    const [donations, setDonations] = useState('')
    const [donationsToView, setDonationsToView] = useState('')

    const [chosenSearchDonation, setChosenSearchDonation] = useState('Empty')
    const [filterBy, setFliterBy] = useState('typeDonation')
    const [filterByToShow, setFliterByToShow] = useState('סוג תרומה')
    const [filterOptions, setFilterOptions] = useState([
        { value: 'address', label: 'כתובת' ,checked: true},
        { value: 'typeDonation', label: 'סוג תרומה' ,checked: false},
        { value: 'description', label: 'תיאור' ,checked: false},
        { value: 'creator', label: 'יוצר',checked: false},
      ])

    /** @type React.MutableRefObject<HTMLInputElement> */
    const searchInputeRef = useRef()
      useEffect(() => {
        getDonationList()
    },[])
    
    const getDonationList = async() =>{
        await axios({
        method: 'get',
        url: `http://localhost:5000/api/donation/`,
        })
        .then(function (response) {
            setDonationsToView(response.data.donations)
            setDonations(response.data.donations)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    const renderDonationList = () => (
        (
        <div style={{marginTop:10}}>
           {donationsToView.map((donation) => {
                return (
                    <DonationListItem donation={donation} onClick={()=>{setChosenSearchDonation(donation)}}/>
                )
            })}
        </div>
        )
    )

  

    const handleCheckBoxChange=(o)=>{
        setFliterBy(o.value);
        setFliterByToShow(o.label);
    }

    const filterByFunc = (val, filterBy) => {
        setDonationsToView(donations.filter((donation) => { return filterBy == "address" ? donation.location.address.includes(val) : donation[filterBy].includes(val) })); 
      }

    return (
        <div>
            <h2>Search Donation</h2>
            <div style={{display:'flex', flexDirection:'row-reverse',marginRight:10,marginLeft:10,}}>
                <div style={{width:"25%",height:1000, marginTop:23,marginLeft:5, backgroundColor:'lightgrey',borderkWidth:5, borderColor:"black",border: `2px solid grey`,
                                background: 'linear-gradient(45deg, white 30%, lightgrey 90%)', overflowY: 'scroll' }}>
                    
                    {filterBy === 'address' ?
                        <Autocomplete onPlaceChanged={()=>{filterByFunc(searchInputeRef.current.value,filterBy)}}>
                        <input value={searchInputeRef?.current?.value} type="text" placeholder={"הכנס " + filterByToShow}  style={{width:"80%", marginTop: "5%", marginLeft:"10%",textAlign:'center'}}  ref={searchInputeRef}
                            onChange={(event)=>{filterByFunc(event.target.value,filterBy)}}/>
                        </Autocomplete> 
                        : <input value={searchInputeRef?.current?.value} type="text" placeholder={"הכנס " + filterByToShow}  style={{width:"80%", marginTop: "5%", marginLeft:"10%",textAlign:'center'}}  ref={searchInputeRef}
                            onChange={(event)=>{filterByFunc(event.target.value,filterBy)}}/>
                    }
                
                <div style={{display:'flex', flexDirection:'row-reverse', marginTop:5}}>
                    { filterOptions.map((o,i) =>(
                        <div>{o.label}
                            <input
                                type="checkbox"
                                    checked={filterOptions[i].checked}
                                    onChange={() => {handleCheckBoxChange(o); filterByFunc(searchInputeRef.current.value, o.value); filterOptions.map((o,j) => { i===j ? filterOptions[j].checked = true : filterOptions[j].checked = false;})}}
                                    value={o.label}
                                    />
                                    </div>
                        )
                    )}

                    </div>
                    {donationsToView && renderDonationList()}
                </div>
                <div style={{width:"80%"}}>
                    {(donationsToView && chosenSearchDonation) && <Map donations={donations} chosenSearchDonation={chosenSearchDonation}/>}
                </div>
            </div>
        </div>
    );
};

export default SearchDonation;