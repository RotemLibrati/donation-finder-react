import React, {useState} from 'react'
import './DonationListItem.css';
import PopUpDitails from './PopUpViwe.js/PopUpDitails';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

function DonationListItem(props) {
  const [color,setColor] = useState((props.clickedIndex === props.curIndex) ? 'linear-gradient(45deg, white 30%, blue 90%)': 'linear-gradient(45deg, white 30%, lightgrey 90%)')
  const [isOpen,setIsOpen] = useState(false)

  const handleOnMouseOver = () =>{
    setColor('linear-gradient(45deg, white 30%, #A0DABE 90%)')
  }
  const handleOnMouseOut = () =>{
    setColor('linear-gradient(45deg, white 30%, lightgrey 90%)')
  }

  const buttoneDetailes = () => {
    return (
      <div style={{marginTop:10,marginBottom:10,cursor:'pointer'}}  >
          <label style={{ fontWeight:'bold',cursor:'pointer'}}>סוג תרומה: </label><label style={{cursor:'pointer'}}>{props.donation.typeDonation}</label><br/>        
          <label  style={{fontSize:14, fontWeight:'bold',cursor:'pointer'}}>מיקום: </label><label style={{fontSize:14,cursor:'pointer'}}>{props.donation.location.address}</label><br/>        
          {props.donation.isByUserLocation ? <label  style={{fontSize:14, fontWeight:'bold',cursor:'pointer'}}>מרחק ממיקום משוער: </label>
          : <label  style={{fontSize:14, fontWeight:'bold',cursor:'pointer'}}>מרחק ממיקום יציאה: </label>}
          <label style={{fontSize:14, cursor:'pointer'}}>{props.donation.distance.kilometers} קילומטרים</label><br/>        
        </div>
    )
  }
  return (
    <div style={{borderkWidth:5, borderBottomColor:"black",border: `1px solid grey`,
                                background: props.clickedIndex === props.curIndex ? 'linear-gradient(70deg, white 20%, #69C999 100%)' : color
                                 ,textAlign:'right', }} onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}
                        onClick={() => props.onClick()} onDoubleClick={()=>{ }}>
                          {buttoneDetailes()}
                          {props.clickedIndex === props.curIndex && 
                          <div style={{textAlign:'right', align_self:'center', marginBottom:15}}>
                            <div className="devider"/>
                            <label  style={{fontSize:13, fontWeight:'bold',cursor:'pointer'}}>יוצר: </label><label style={{fontSize:13,cursor:'pointer'}}>{props.donation.creator}</label> <br/>      
                            <label  style={{fontSize:13, fontWeight:'bold',cursor:'pointer'}}>תיאור: </label><label style={{fontSize:13,cursor:'pointer'}}>{props.donation.description}</label>        
                          </div>
                          }

        {/* <Popup open={isOpen} position="left center" 
                        onOpen={props.onClick} background={'linear-gradient(70deg, white 20%, #69C999 100%)'}>
          <div style={{height:300,width:300 ,textAlign:'right', alignSelf:'center'}}>
            <label  style={{fontSize:13, fontWeight:'bold',cursor:'pointer'}}>יוצר: </label><label style={{fontSize:13,cursor:'pointer'}}>{props.donation.creator}</label> <br/>      
            <label  style={{fontSize:13, fontWeight:'bold',cursor:'pointer'}}>תיאור: </label><label style={{fontSize:13,cursor:'pointer'}}>{props.donation.description}</label>        
          </div>
        </Popup> */}
    </div>
  )
}

export default DonationListItem

