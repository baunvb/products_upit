import React, { useState } from 'react'
import Section from '../component/Section/Section';
import { withTranslation } from 'react-i18next'
import Input from '../component/Input/Input';
// import "./section-customer.css"
import IconUser from "../../../assest/icon/ic_user.svg";
import IconPhone from "../../../assest/icon/ic_phone.svg";
import IconEmail from "../../../assest/icon/ic_email.svg";
import IconNote from "../../../assest/icon/ic_note.svg";
import { useSelector, useDispatch } from 'react-redux'
import * as BikeRentalAction from "../BikeRentalAction"
import { validateEmail, validatePhonenumber } from "../../../util/Utils"

function SectionCustomer(props) {
  const { t } = props
  const dispatch = useDispatch()
  const BikeRentalState = useSelector(state => state.BikeRentalReducer)
  const [messageUsername, setMessageUsername] = useState("")
  const [messageEmail, setMessageEmail] = useState("")
  const [messagePhone, setMessagePhone] = useState("")
  return (
    <Section
      title={t('BikeRental.booking.section_customer_info')}
    >
      <div className="booking-input-row">
        <Input
          value={BikeRentalState.username}
          message={messageUsername}
          label={t('BikeRental.booking.name_label')}
          type="text"
          placeholder={t('BikeRental.booking.name_placeholder')}
          icon={IconUser}
          onChange={(value) => dispatch({
            type: BikeRentalAction.ACTION_SET_USERNAME.NAME,
            data: value
          })}
          onBlur={() => {
            if (BikeRentalState.username == "") {
              setMessageUsername(t('BikeRental.booking.name_warning'))
            } else {
              setMessageUsername("")
            }
          }}
        />
      </div>
      <div className="booking-input-row">
        <Input
          value={BikeRentalState.phoneNumber}
          label={t('BikeRental.booking.phone_label')}
          type="text"
          placeholder={t('BikeRental.booking.phone_placeholder')}
          icon={IconPhone}
          message={messagePhone}
          onChange={(value) => dispatch({
            type: BikeRentalAction.ACTION_SET_PHONENUMBER.NAME,
            data: value
          })}
          onBlur={() => {
            if (!validatePhonenumber(BikeRentalState.phoneNumber)) {
              setMessagePhone(t('BikeRental.booking.phone_warning'))
            } else {
              setMessagePhone("")
            }
          }}
        />
      </div>
      <div className="booking-input-row">
        <Input
          value={BikeRentalState.email}
          message={messageEmail}
          label={t('BikeRental.booking.email_label')}
          type="text"
          placeholder={t('BikeRental.booking.email_placeholder')}
          icon={IconEmail}
          onChange={(value) => dispatch({
            type: BikeRentalAction.ACTION_SET_EMAIL.NAME,
            data: value
          })}
          onBlur={() => {
            if (!validateEmail(BikeRentalState.email)) {
              setMessageEmail(t('BikeRental.booking.email_warning'))
            } else {
              setMessageEmail("")
            }
          }}
        />
      </div>
      <div className="booking-input-row">
        <Input
          value={BikeRentalState.note}
          label={t('BikeRental.booking.note_label')}
          labelAlt={t('BikeRental.booking.note_label_alt')}
          type="text"
          placeholder={t('BikeRental.booking.note_placeholder')}
          icon={IconNote}
          onChange={(value) => dispatch({
            type: BikeRentalAction.ACTION_SET_NOTE.NAME,
            data: value
          })}
        />
      </div>
    </Section>
  )
}

export default withTranslation()(SectionCustomer)