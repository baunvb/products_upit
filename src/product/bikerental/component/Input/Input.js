import React from 'react'
import "./input.css"
import mobiscroll from '@mobiscroll/react';
mobiscroll.settings = {
  theme: 'ios'
}

export default function Input(props) {
  const { type, value, message, disabled } = props;
  const isDisabled = disabled || type !== "text";
  const onSet = (event, inst) => {
    const time = inst.getVal();
    props.onChange(time)
  }

  return (
    <div>
      <div className="input-container">
        <span className="label">
          <span className="input-label">{props.label}</span>
          {props.labelAlt ? <span className="input-label-alt">{` (${props.labelAlt})`}</span> : null}
        </span>

        <div className="input">
          <img alt="" className="input-icon" src={props.icon} />
          {
            type === "date" ? <mobiscroll.Date value={value} className="mobiscroll" lang="vi" onSet={(event, inst) => onSet(event, inst)} />
              : type === "time" ? <mobiscroll.Time value={value} className="mobiscroll" lang="vi" onSet={(event, inst) => onSet(event, inst)} />
                :
                <input
                  // disabled={isDisabled}
                  value={value}
                  className="input-input"
                  type={props.type}
                  placeholder={props.placeholder}
                  onChange={(e) => props.onChange(e.target.value)}
                  onBlur={(e) => props.onBlur()}
                  onClick={() => props.action()}
                />
          }

          {
            props.actionText ?
              <div
                className="input-right-action"
                onClick={() => props.action()}
              >
                <span>{props.actionText}</span>
              </div> : null
          }
        </div>

      </div>
      {
        Boolean(message) && <div className="warning-message">
          <span>{message}</span>
        </div>
      }
    </div>
  )
}

Input.defaultProps = {
  message: "",
  onBlur: () => {

  },
  action: () => {

  }
}