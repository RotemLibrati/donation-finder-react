import React, {useState} from 'react'
import './MarkerInfoView.css'

function MarkerInfoView(props) {

  return (
    <div className='InfoViewContainer'>
        {props.donation?.organization && <><label className='info_title'>ארגון: </label><label className='info_param'>{props.donation.organization}</label><br /><br /></>}

        <label className='info_title'>סוג תרומה: </label><label className='info_param'>{props.donation.typeDonation}</label><br />
        <label className='info_title'>מיקום: </label><label className='info_param'>{props.donation.location.address}</label><br />
        {props.donation.isByUserLocation ? <label className='info_title'>מרחק ממיקום משוער: </label>
        : <label className='info_title'>מרחק ממיקום יציאה: </label>}
        <label className='info_param'>{props.donation.distance.kilometers} קילומטרים</label><br />
        
        <label className='info_title'>יוצר: </label><label className='info_param'>{props.donation.creator}</label><br />
        {props.donation?.phone && <><label className='info_title'>מספר טלפון: </label><label className='info_param'>{props.donation.phone}</label><br /></>}
        {props.donation?.website && <><label className='info_title'>ארגון: </label><a href='{props.donation.website}' className='info_param'>{props.donation.website}</a><br /></>}
        <label className='info_title'>תיאור: </label><label className='info_param'>{props.donation.description}</label><br/>
    </div>
  )
}

export default MarkerInfoView