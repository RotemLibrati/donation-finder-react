import React, { useState } from 'react'
import './DonationListItem.css';

const DonationListItem = (props) => {
  const [color, setColor] = useState((props.clickedIndex === props.curIndex) ? 'linear-gradient(45deg, white 30%, blue 90%)' : 'linear-gradient(45deg, white 30%, lightgrey 90%)');

  const handleOnMouseOver = () => {
    setColor('linear-gradient(45deg, white 30%, #A0DABE 90%)');
  }
  const handleOnMouseOut = () => {
    setColor('linear-gradient(45deg, white 30%, lightgrey 90%)');
  }

  const buttoneDetailes = () => {
    return (
      <div style={{marginTop: 5, marginBottom: 5}}>
          <label className='title'>סוג תרומה: </label><label className='param'>{props.donation.typeDonation}</label><br />
          <label className='title'>מיקום: </label><label className='param'>{props.donation.location.address}</label><br />
          {props.donation.isByUserLocation ? <label className='title'>מרחק ממיקוך המשוער: </label>
            : <label className='title'>מרחק ממיקום יציאה: </label>}
          <label className='param'>{props.donation.distance.kilometers} קילומטרים</label>
      </div>
    );
  };
  return (
    <div style={{
      borderkWidth: 5, borderBottomColor: "black", border: `1px solid grey`,
      background: props.clickedIndex === props.curIndex ? 'linear-gradient(70deg, white 20%, #69C999 100%)' : color
      , textAlign: 'right'
    }} onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}
      onClick={() => props.onClick()}>
      {buttoneDetailes()}
      {props.clickedIndex === props.curIndex &&
        <div className='container_subDetails'>
          <div className="devider" />
          <label className='subDetails'>איש קשר: </label><label className='subDetails__param'>{props.donation.creator}</label> <br />
          <label className='subDetails'>תיאור: </label><label className='subDetails__param'>{props.donation.description}</label>
        </div>
      }
    </div>
  );
};

export default DonationListItem;

