import React, { useState, useEffect, useRef } from "react";
import Map from "../components/GoogleMapComponent/Map";
import axios from 'axios';
import DonationListItem from "../components/DonationListItem";
import API from "../ApiService";
import './SearchDonation.css';
import {
    useJsApiLoader,
    Autocomplete,
} from '@react-google-maps/api'
import Geocode from "react-geocode";
import { getDistance } from 'geolib';
import Select from 'react-select';
import donationOptions from "../globalVariables";
import TypeSelectorFilterListViwer from "../components/TypeSelectorFilterListViwer/TypeSelectorFilterListViwer";


Geocode.setApiKey(`${API.api_key_google_maps}`)

// set response language. Defaults to english.
Geocode.setLanguage("heb");

// import Maps from "../components/Maps/Maps";


const SearchDonation = () => {
    const [donations, setDonations] = useState('')
    const [donationsToView, setDonationsToView] = useState('')
    const [clickedIndex, setClickedIndex] = useState(-1)
    const [chosenSearchDonation, setChosenSearchDonation] = useState('Empty')
    const [filterBy, setFliterBy] = useState('typeDonation')
    const [filterByToShow, setFliterByToShow] = useState('סוג תרומה')
    const [filterOptions] = useState([
        { value: 'typeDonation', label: 'סוג תרומה', checked: true },
        { value: 'address', label: 'כתובת', checked: false },
        { value: 'description', label: 'תיאור', checked: false },
        { value: 'creator', label: 'יוצר', checked: false },
    ]);
    const [typeDonationList, setTypeDonationList] = useState([])
    const searchInputeRef = useRef();
    const originRef = useRef();
    const [libraries] = useState(['places']);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: `${API.api_key_google_maps}`,
        libraries
    });
    const [directionsResponse, setDirectionsResponse] = useState({ lat: 31.2492119, lng: 34.7842072 })
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [userCurLocation, setUserCurLocation] = useState('')
    const [userChosenLocation, setUserChosenLocation] = useState('')

    useEffect(() => {
        getDonationList()
    }, []);

    const setGeolocation = () => {
        var geolocation = navigator.geolocation.watchPosition(
            (position) => {
                setUserCurLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            }, (e) => { console.log() }, {
            enableHighAccuracy: true,
            timeout: 5 * 1000, // 5 seconds
            maximumAge: 250
        })
        setTimeout(() => {
            navigator.geolocation.clearWatch(geolocation)
        },
            5000 //stop checking after 5 seconds
        );
    };
    setGeolocation();
    useEffect(() => {
        if (donations && donationsToView) {
            setDonationsToView(sortByDistance(calculateRoute(donationsToView)))
            setDonations(calculateRoute(donations))
        }
    }, [userCurLocation, userChosenLocation]);

    useEffect(() => {
        filterByFunc(null, "typeDonation")
    }, [typeDonationList]);

    const handleOriginChosen = () => {
        Geocode.fromAddress(originRef.current.value).then(
            async (response) => {
                setUserChosenLocation(response.results[0].geometry.location)
            });
    };

    const getDonationList = async () => {
        await axios({
            method: 'get',
            url: `http://localhost:5000/api/donation/`,
        })
            .then(function (response) {
                setDonationsToView(sortByDistance(calculateRoute(response.data.donations)))
                setDonations(calculateRoute(response.data.donations))
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const renderDonationList = () => ((
        <div style={{ marginTop: 10 }}>
            {donationsToView.map((donation, i) => {
                return (
                    <DonationListItem
                        donation={donation}
                        onClick={() => { setChosenSearchDonation(donation); setClickedIndex(i) }}
                        clickedIndex={clickedIndex}
                        curIndex={i} />
                )
            })}
        </div>));
    const handleCheckBoxChange = (o, i) => {
        setFliterBy(o.value);
        setFliterByToShow(o.label);
        filterByFunc( o.value !== 'typeDonation' && searchInputeRef?.current?.value !== undefined ? searchInputeRef?.current?.value: '', o.value);
        filterOptions.map((o, j) => {
            i === j ? filterOptions[j].checked = true : filterOptions[j].checked = false;
        })
    };
    const filterByFunc = (val, filterBy) => {
        if(filterBy !== "typeDonation")
            setDonationsToView(sortByDistance(donations.filter((donation) => {
                return filterBy === "address" ? donation.location.address.includes(val) : donation[filterBy].includes(val)
            })));
        else{
            if(typeDonationList.length !== 0)
                setDonationsToView(sortByDistance(donations.filter((donation) => {
                    let isIn = false
                    for(let i in typeDonationList){
                        console.log(typeDonationList[i])
                        isIn = donation[filterBy].includes(typeDonationList[i].label)
                        if(isIn) break;
                    }
                    return isIn
                })))
            else if(donations) setDonationsToView(sortByDistance(donations))
        }
    };
    const calculateRoute = (curDonations) => {
        return curDonations.map((d) => {
            const dist = getDistance(
                userChosenLocation ? userChosenLocation : userCurLocation,
                { latitude: d.location.coordinates.lat, longitude: d.location.coordinates.lng },
            )
            return {
                creator: d.creator,
                description: d.description,
                typeDonation: d.typeDonation,
                location: d.location,
                distance: { meter: dist, kilometers: (dist / 10000).toLocaleString() },
                isByUserLocation: userChosenLocation === '' ? true : false,
            }
        });
    };
    const sortByDistance = (curDonations) => {
        return curDonations.sort((a, b) => {
            return a.distance.meter - b.distance.meter
        });
    };
    // async function calculateRoute3(curDonations) {
    //     // if (searchInputeRef.current.value === '' || searchInputeRef.current.value === '') {
    //     //   return
    //     // }
    //     // eslint-disable-next-line no-undef
    //     const directionsService = new google.maps.DirectionsService()
    //     let results = await directionsService.route({
    //         origin: userCurLocation,
    //         destination: searchInputeRef.current.value,
    //         // eslint-disable-next-line no-undef
    //         travelMode: google.maps.TravelMode.DRIVING,
    //     })

    //     console.log({
    //         reator: curDonations[0].creator,
    //         description: curDonations[0].description,
    //         typeDonation: curDonations[0].typeDonation,
    //         location: curDonations[0].location,
    //         directionsResponse: results,
    //         distance: results.routes[0].legs[0].distance.text,
    //         duration: results.routes[0].legs[0].duration.text
    //     })
    //     return [{
    //         reator: curDonations[0].creator,
    //         description: curDonations[0].description,
    //         typeDonation: curDonations[0].typeDonation,
    //         location: curDonations[0].location,
    //         directionsResponse: results,
    //         distance: results.routes[0].legs[0].distance.text,
    //         duration: results.routes[0].legs[0].duration.text
    //     }]
    // }
    async function calculateRoute2(curDonations) {
        // if (searchInputeRef.current.value === '' || searchInputeRef.current.value === '') {
        //   return
        // }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        let tempDonations = []
        curDonations.map(async (d) => {
            await directionsService.route({
                origin: userCurLocation,
                destination: searchInputeRef.current.value,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.DRIVING,
            }).then((results) => {
                return {
                    creator: d.creator,
                    description: d.description,
                    typeDonation: d.typeDonation,
                    location: d.location,
                    directionsResponse: results,
                    distance: results.routes[0].legs[0].distance.text,
                    duration: results.routes[0].legs[0].duration.text
                }
            }
            )
        })
        console.log(tempDonations[3])
        return tempDonations
    };
    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        searchInputeRef.current.value = ''
    };
    
    const renderTypeDonationSelector = () => {
        return (
            <div>
            <Select
                placeholder= 'בחר סוג תרומה'
                // styles={customStyles}
                className='address__input'
                value={typeDonationList}
                onChange={select => setTypeDonationList(curTypeDonationList => [...curTypeDonationList, select])}
                options={donationOptions}
                ref={searchInputeRef}
            />
            { typeDonationList && <TypeSelectorFilterListViwer list={typeDonationList} onRemoveClick={(toRemove)=>{ setTypeDonationList(curTypeDonationList => curTypeDonationList.filter((item) => { return item !== toRemove })) }}/> }
            </div>
        )
    }

    return (
        <div>
            {!isLoaded ? <label>Loading...</label> :
                <div style={{ textAlign: 'right' }}>
                    <h2>חיפוש תרומות</h2>
                    <div className="container">
                        <div className="searching">
                            {filterBy === 'address' ?
                                <div>
                                    <Autocomplete onPlaceChanged={handleOriginChosen}>
                                        <input className="address_input"
                                            type="text"
                                            placeholder={"כתובת יציאה"}
                                            ref={originRef}
                                            onChange={() => { setUserChosenLocation('') }}
                                        />
                                    </Autocomplete>
                                    <Autocomplete onPlaceChanged={() => { filterByFunc(searchInputeRef.current.value, filterBy) }}>
                                        <input className="address_input"
                                            value={searchInputeRef?.current?.value}
                                            type="text"
                                            placeholder={"הכנס " + filterByToShow}
                                            ref={searchInputeRef}
                                            onChange={(event) => { filterByFunc(event.target.value, filterBy) }} />
                                    </Autocomplete>
                                </div>
                                : (filterBy ==='typeDonation' ? renderTypeDonationSelector() : <input className="address_input"
                                    value={searchInputeRef?.current?.value}
                                    type="text"
                                    placeholder={"הכנס " + filterByToShow}
                                    ref={searchInputeRef}
                                    onChange={(event) => { filterByFunc(event.target.value, filterBy) }} />)
                            }
                            <div className="checkbox__input">
                                {filterOptions.map((o, i) => (
                                    <div>{o.label}
                                        <input
                                            type="checkbox"
                                            checked={filterOptions[i].checked}
                                            onChange={() => { handleCheckBoxChange(o, i); }}
                                            value={o.label}
                                        />
                                    </div>
                                )
                                )}
                            </div>
                            {donationsToView && renderDonationList()}
                        </div>
                        <div className="map_view">
                            {(donationsToView && chosenSearchDonation && userCurLocation) && <Map donations={donations} chosenSearchDonation={chosenSearchDonation}
                                userLocation={userChosenLocation ? { lat: userChosenLocation.latitude, lng: userChosenLocation.longitude } : { lat: userCurLocation.latitude, lng: userCurLocation.longitude }} />}
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default SearchDonation;