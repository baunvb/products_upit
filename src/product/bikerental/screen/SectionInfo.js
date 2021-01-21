import React, { useState, useEffect, useCallback } from 'react'
import Section from '../component/Section/Section';
import { withTranslation } from 'react-i18next'
import Input from '../component/Input/Input';
import "./section-info.css"
import { validateDuration, getDurationHour } from "../../../util/Utils"
import IconLocation from "../../../assest/icon/ic_location.svg";
import IconDate from "../../../assest/icon/ic_date.svg";
import IconTime from "../../../assest/icon/ic_time.svg";
import { useSelector, useDispatch, useStore } from 'react-redux'
import * as BikeRentalAction from "../BikeRentalAction"
import FullScreenPopup from '../component/popup/FullScreenPopup';
import MapApi from '../component/Map/MapApi';

function House(props) {
  return (
    <div className="section-info-house"
      onClick={() => props.onClick()}
    >
      <span className="name">{props.name}</span>
      <span className="address">{props.address}</span>
    </div>
  )
}

function SectionInfo(props) {
  const { t } = props;
  const [displayLocationPopup, setDisplayLocationPopup] = useState(false)
  const [message, setMessage] = useState("")

  const dispatch = useDispatch()
  const store = useStore();
  const BikeRentalState = useSelector(state => state.BikeRentalReducer)
  const { startDate, startTime, endDate, endTime } = BikeRentalState
  useEffect(() => {
    var durationHours = getDurationHour(startDate, startTime, endDate, endTime)
    if (!validateDuration(durationHours)) {
      setMessage(t('BikeRental.booking.date_time_warning'))
    } else {
      setMessage("")
    }
  }, [BikeRentalState])


  return (
    <Section
      title={t('BikeRental.booking.section_info')}
    >
      <div className="section-info">
        <div>
          <Input
            value={BikeRentalState.location.address}
            disabled={true}
            label={t('BikeRental.booking.address_label')}
            type="text"
            placeholder={t('BikeRental.booking.address_placeholder')}
            icon={IconLocation}
            actionText={t('BikeRental.booking.choose')}
            action={() => setDisplayLocationPopup(true)}
          />
        </div>
        <div className="date-time">
          <div className="date">
            <Input
              value={BikeRentalState.startDate}
              label={t('BikeRental.booking.start_date_label')}
              type="date"
              placeholder={t('BikeRental.booking.date_placeholder')}
              icon={IconDate}
              onChange={(value) => dispatch({
                type: BikeRentalAction.ACTION_SET_START_DATE.NAME,
                data: value
              })}
            />
          </div>
          <div className="time">
            <Input
              value={BikeRentalState.startTime}
              label={t('BikeRental.booking.start_time_label')}
              type="time"
              placeholder={t('BikeRental.booking.time_placeholder')}
              icon={IconTime}
              onChange={(value) => dispatch({
                type: BikeRentalAction.ACTION_SET_START_TIME.NAME,
                data: value
              })}
            />
          </div>
        </div>

        <div className="date-time">
          <div className="date">
            <Input
              value={BikeRentalState.endDate}
              label={t('BikeRental.booking.end_date_label')}
              type="date"
              placeholder={t('BikeRental.booking.date_placeholder')}
              icon={IconDate}
              onChange={(value) => dispatch({
                type: BikeRentalAction.ACTION_SET_END_DATE.NAME,
                data: value
              })}
            />
          </div>
          <div className="time">
            <Input
              value={BikeRentalState.endTime}
              label={t('BikeRental.booking.end_time_label')}
              type="time"
              placeholder={t('BikeRental.booking.time_placeholder')}
              icon={IconTime}
              onChange={(value) => dispatch({
                type: BikeRentalAction.ACTION_SET_END_TIME.NAME,
                data: value
              })}
            />
          </div>
        </div>

        {
          Boolean(message) && <div className="warning-message">
            <span>{message}</span>
          </div>
        }

      </div>
      <FullScreenPopup
        title={t('BikeRental.booking.choose_location')}
        onClose={() => setDisplayLocationPopup(false)}
        display={displayLocationPopup}
      >
        <div className="booking-section-price">
          <span className="section-title">{t('BikeRental.booking.choose_location')}</span>
          <input
            id="search-place"
            className="section-info-searchbox"
            placeholder={t('BikeRental.booking.fill_address')}
          />
          <MapApi
            id="myMap"
            options={{
              center: { lat: 21.024441, lng: 105.788869 },
              zoom: 8
            }}
            onMapLoad={map => {
              var input = document.getElementById('search-place')
              var searchBox = new window.google.maps.places.Autocomplete(input, { componentRestrictions: { country: "VN" } });
              searchBox.addListener('place_changed', () => {
                var places = searchBox.getPlace();
                console.log("Places", places);

                if (places.length == 0) {
                  return;
                }
                console.log(places)
                dispatch({
                  type: BikeRentalAction.ACTION_SET_LOCATION.NAME,
                  data: { address: places.formatted_address, name: places.name, location: places.geometry.location }
                })
              });
            }
            }
          />
        </div>
        {
          BikeRentalState.listHouse.length > 0 &&
          <Section
            title={`Danh sách nhà của tôi`}
          >
            <div className="section-info-list-house">
              {
                BikeRentalState.listHouse.map((house, index) => {
                  return (
                    <House
                      onClick={() => {
                        dispatch({
                          type: BikeRentalAction.ACTION_SET_LOCATION.NAME,
                          data: house
                        })
                        setDisplayLocationPopup(false)
                      }}
                      key={index}
                      {...house}
                    />
                  )
                })
              }

            </div>


          </Section>
        }


      </FullScreenPopup>
    </Section>
  )
}

export default withTranslation()(SectionInfo)