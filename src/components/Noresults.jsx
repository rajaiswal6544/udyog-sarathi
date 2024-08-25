//Done

import React from 'react'
import not from '../assets/notfound.png'
import './Noresults.css'
export default function Noresults() {
  return (
    <div style={{paddingRight:'90px'}}>
        <div className='headingmatchingneeds03'>
            <img src={not} alt="not found" />
        </div>
      <h3 className='sorrymatchingneeds03'>Sorry! no result found</h3>
      <p>Please modify your search criteria and you will find results <br />
      <span className='matchingneeds03'>matching your needs</span>
      </p>
    </div>
  )
}