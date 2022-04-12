import React from 'react'

function DonationListItem(props) {
  return (
    <div style={{borderkWidth:5, borderBottomColor:"black",border: `1px solid grey`,
                                background: 'linear-gradient(45deg, white 30%, lightgrey 90%)' ,textAlign:'right',}}
                        onClick={props.onClick} onDoubleClick={()=>{}}>
        <div style={{marginTop:10,marginBottom:10}}>
        <label style={{ fontWeight:'bold'}}>סוג תרומה: </label><label>{props.donation.typeDonation}</label><br/>        
        <label  style={{fontSize:14, fontWeight:'bold'}}>מיקום: </label><label style={{fontSize:14}}>{props.donation.location.address}</label><br/>        
        <label  style={{fontSize:13, fontWeight:'bold'}}>תיאור: </label><label style={{fontSize:13}}>{props.donation.description}</label>        
        </div>
    </div>
  )
}

export default DonationListItem