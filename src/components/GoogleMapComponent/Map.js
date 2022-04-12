import React, { useEffect } from 'react'
import API from '../../ApiService';

import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useRef, useState } from 'react'
  import Geocode from "react-geocode";

  var center = { lat: 48.8584, lng: 2.2945 }
  Geocode.setApiKey(`${API.api_key_google_maps}`)

  // set response language. Defaults to english.
    Geocode.setLanguage("heb");

function Map(props) {
    const [ libraries ] = useState(['places']);
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: `${API.api_key_google_maps}`,
        libraries
    })

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState({ lat: 31.2492119, lng: 34.7842072 })
    const [markerLocation, setMarkerLocation] = useState({ lat: 31.2492119, lng: 34.7842072 })
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
                    
    useEffect(() => {
      if(props?.chosenSearchDonation != 'Empty')  
        setMarkerLocation(props.chosenSearchDonation.location.coordinates)
      else { setMarkerLocation(props.userLocation)}
    },[props])

    useEffect(()=>{
      if (isLoaded && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setMarkerLocation({lat:position.coords.latitude, lng: position.coords.longitude} )
            }, (e) => {console.log(e.message)} , {
                      enableHighAccuracy: true,
                      timeout: 5 * 1000, // 5 seconds
                      maximumAge: 0
            } )
          }
    },[navigator])
    
      // const handleSetMarkerLocation = () => {
      //   Geocode.fromAddress(originRef.current.value).then(
      //       (response) => {
      //           const { lat, lng } = response.results[0].geometry.location;
      //           setMarkerLocation(response.results[0].geometry.location);
      //       },
      //       (error) => {
      //         console.error(error);
      //       }
      //     );
      // }

    return (
      <div>
      { !isLoaded ? <label>Loading...</label> : <div style={{width:"100%",height:1000}}>
          {/* <Autocomplete onPlaceChanged={()=>{handleSetMarkerLocation()}} >
              <input type="text" className="input" placeholder='מיקום' ref={originRef}/>
          </Autocomplete> */}
          <button onClick={() => {
                map.panTo(markerLocation)
                map.setZoom(15)
              }}>Locate</button>

              <GoogleMap
              center={markerLocation}
              zoom={15}
              mapContainerStyle={{ width: '100%', height: '100%', }}
              options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
              }}
              onLoad={map => setMap(map)}
              >
                  <Marker position={markerLocation}/>
                  { // pin 10 first locations in the list (green) - https://www.freecodecamp.org/news/how-to-change-javascript-google-map-marker-color-8a72131d1207/
                      props.donations.map((d,i)=>(
                          (i<10 && d?.location?.coordinates.lat !== markerLocation.lat) && d?.location?.coordinates.lng !== markerLocation.lng &&
                          <Marker position={d.location.coordinates} icon={ {url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"} }/>
                      ))
                  }
              </GoogleMap>
      </div>}
    </div>
    )
}

export default Map


// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


// // const center = { lat: 48.8584, lng: 2.2945 }
// const position = [51.505, -0.09]

// const markerIcone = L.icon({
//     iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
//     iconSize:[25, 41],
//     iconeAnchor: [12.5, 41],
//     popupAnchor: [0, -41]
// })

// function Maps() {
//     return (
//     <div style={{marginRight:10,marginLeft:10}}>
//         <div style={{display: 'flex',flexDirection:'row',width:"100%",height:1000, borderWidth:4}}>
//         <div src="https://www.govmap.gov.il/govmap/api/govmap.api.js"></div>

//             <div style={{width:"80%",borderkWidth:5, borderColor:"black",border: `2px solid grey`, }}>
//                     <MapContainer style={{height:"100%"}} center={position} zoom={13} scrollWheelZoom={false}>
//                         <TileLayer
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         />
//                         <Marker position={position} icon={markerIcone}>
//                             <Popup>
//                                 A pretty CSS3 popup. <br /> Easily customizable.
//                             </Popup>
//                         </Marker>
//                     </MapContainer>
//               </div>
//             <div style={{width:"20%", backgroundColor:'lightgrey',borderkWidth:5, borderColor:"black",border: `2px solid grey`,
//                                 background: 'linear-gradient(45deg, white 30%, lightgrey 90%)', }}>
//                 <input type="text" placeholder='מיקום'  style={{width:"80%", marginTop: "5%", marginLeft:"10%",textAlign:'center'}} onChange={()=>{}}/>
//             </div>
//         </div>
//     </div>
//     )
// }