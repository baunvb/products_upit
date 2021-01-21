import React, { useState } from 'react'
import "./popup.css"
import IconClose from "../../../../assest/icon/ic_close.svg"
export default function FullScreenPopup(props) {
  return (
    props.display ?
      <div className="popup">
        <div className="popup-header">
          <img className="popup-icon-close" src={IconClose} onClick={() => props.onClose()}/>
          <span className="popup-title">{props.title}</span>
        </div>
        <div className="popup-content">
          {props.children}
        </div>
      </div> : null
  )
}