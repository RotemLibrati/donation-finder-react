import { IconButton } from '@mui/material';
import React from 'react'
import './TypeSelectorFilterListViwer.css';
import { Close } from '@mui/icons-material'

function TypeSelectorFilterListViwer(props) {
    const listItem = (item) => {
        return (
            <div className='item_container' >
                <IconButton aria-label="delete" color="primary" onClick={ () => props?.onRemoveClick(item) }><Close fontSize="small"/></IconButton>
                <label>{item.label}</label>
                <img className='image' src={item.icon.url}/>
            </div>
        )
    }

  return (
    <div className='container'>
        {
            props.list.map((item) => listItem(item))
        }
    </div>
  )
}

export default TypeSelectorFilterListViwer