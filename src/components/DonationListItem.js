import React from 'react'
import './DonationListItem.css';

function DonationListItem(props) {
  return (
    <div style={{borderkWidth:5, borderBottomColor:"black",border: `1px solid grey`,
                                background: 'linear-gradient(45deg, white 30%, lightgrey 90%)' ,textAlign:'right', scale:0, cursor:'pointer'}}
                        onClick={props.onClick} onDoubleClick={()=>{}}>
        <div style={{marginTop:10,marginBottom:10,cursor:'pointer'}} >
          <label style={{ fontWeight:'bold'}}>סוג תרומה: </label><label>{props.donation.typeDonation}</label><br/>        
          <label  style={{fontSize:14, fontWeight:'bold'}}>מיקום: </label><label style={{fontSize:14}}>{props.donation.location.address}</label><br/>        
          {props.donation.isByUserLocation ? <label  style={{fontSize:14, fontWeight:'bold'}}>מרחק ממיקום משוער: </label>
          : <label  style={{fontSize:14, fontWeight:'bold'}}>מרחק ממיקום יציאה: </label>}
          <label style={{fontSize:14}}>{props.donation.distance.kilometers} קילומטרים</label><br/>        
          <label  style={{fontSize:13, fontWeight:'bold'}}>תיאור: </label><label style={{fontSize:13}}>{props.donation.description}</label>        
        </div>
    </div>
  )
}

export default DonationListItem

