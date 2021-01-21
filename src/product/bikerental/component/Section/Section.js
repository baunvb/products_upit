import React from 'react'
import "./section.css"
export default function Section(props) {
  return (
    <div>
      <span className="section-title">{props.title}</span>
      <div className="section-content">
        {props.children}
      </div>
    </div>
  )
}