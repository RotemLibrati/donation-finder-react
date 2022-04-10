import React, { Component, useState } from "react";
import API from '../../ApiService';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';

// export class MapContainer extends Component {  state = {
//     showingInfoWindow: false,
//     activeMarker: {},
//     selectedPlace: {},
//   };

//   onMarkerClick = (props, marker, e) =>
// //   console.log(e.latLng.lat());
//   console.log(e.latLng.lng());
//     //this.setState({
//     //   selectedPlace: props,
//     //   activeMarker: marker,
//     //   showingInfoWindow: true

//     // });

//   onMapClicked = (props, e) => {
//       console.log(e);
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       })
//     }
//   };

//   render() {
//     return (
//       <Map google={this.props.google}
//           onClick={this.onMapClicked}>
//         <Marker onClick={this.onMarkerClick}
//                 name={'Current location'} />

//         <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}>
//             <div>
//               <h1>{this.state.selectedPlace.name}</h1>
//             </div>
//         </InfoWindow>
//       </Map>
//     )
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAXSiRDMKr_6o0PKJs7WGnG-38MeD7G5Po"
// })(MapContainer)





//import { Map, GoogleApiWrapper } from "google-maps-react";
const Maps = props => {
    const initialLocation = {
        lat: 32.085300,
        lng: 34.781769
    }
    const [position, setPosition] = useState(initialLocation);
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState({});
    const [activeMarker, setActiveMarker] = useState({});

    const onMapClicked = (props, marker, event) => {
        let location = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setPosition(location);
        if (showingInfoWindow) {
            setShowingInfoWindow(false);
            setActiveMarker(null);
        };
    };
    const onMarkerClicked = (props, marker, event) => {
        console.log(event);
        setSelectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true);

    }
    return (
        <React.Fragment>
            <Map
                google={window.google}
                style={{ width: "100%", height: '100%' }}
                zoom={15}
                initialCenter={position}
                onClick={onMapClicked}
            >
                <Marker
                    position={position}
                    onClick={onMarkerClicked}
                />
                <InfoWindow
                    marker={activeMarker}
                    visible={showingInfoWindow}
                >
                    <div>
                        <h1>{selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        </React.Fragment >
    );
};

export default GoogleApiWrapper({
    apiKey: `${API.api_key_google_maps}`
})(Maps)