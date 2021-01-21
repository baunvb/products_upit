import React, { useState } from 'react'
import "./section-vehicle.css"
import { withTranslation } from 'react-i18next'
import IconAdd from "../../../assest/icon/ic_add.svg"
import { formatConcurrency } from "../../../util/Utils"
import FullScreenPopup from '../component/popup/FullScreenPopup';
import { useSelector, useDispatch } from 'react-redux'
import * as BikeRentalAction from "../BikeRentalAction"

function ItemVehicleSelected(props) {
  const { name, quanlity, price, t } = props;
  return (
    <div className="item-vehicle-selected">
      <span className="name">{name}</span>
      <span className="quanlity">{quanlity}</span>
      <span className="item-vehicle-price">{`${formatConcurrency(price)} ${t('BikeRental.booking.price_per_day')}`}</span>
    </div>
  )
}

function ItemVehicle(props) {
  const { id, name, quanlity, price, t } = props;
  const dispatch = useDispatch();
  return (
    <div className="item-vehicle">
      <div>
        <span className="name">{name}</span>
        <span className="price">{`${formatConcurrency(price)} ${t('BikeRental.booking.price_per_day')}`}</span>
      </div>

      <div>
        <span className="name">{t('BikeRental.booking.quanlity')}</span>
        <input
          type="number"
          value={quanlity}
          onChange={(e) => dispatch({
            type: BikeRentalAction.ACTION_SET_VEHICLE.NAME,
            data: { id: id, quanlity: parseInt(e.target.value) }
          })}
        />
      </div>
    </div>
  )
}

function SectionSelectVehicle(props) {
  const { t } = props;
  const [displayVehiclePopup, setDisplayVehiclePopup] = useState(false)
  const dispatch = useDispatch();
  const ListVehicle = useSelector(state => state.BikeRentalReducer.vehicle);

  var isEmpty = true;
  ListVehicle.forEach(element => {
    if (element.quanlity > 0) {
      isEmpty = false;
      return;
    }
  });

  return (
    <div className="section-vehicle">

      <div>
        <span className="section-title">{t('BikeRental.booking.vehicle_info')}</span>
        {
          isEmpty ?
            <div className="button"
              onClick={() => setDisplayVehiclePopup(true)}
            >
              <img className="" src={IconAdd} alt="" />
              <span>{t('BikeRental.booking.add_vehicle')}</span>
            </div> :
            <div>
              {
                ListVehicle.map((element, index) => {
                  if (element.quanlity > 0)
                    return (
                      <ItemVehicleSelected
                        t={t}
                        key={index}
                        {...element}
                      />
                    )
                })
              }

              <div className="btn-edit-vehicle"
                onClick={() => setDisplayVehiclePopup(true)}
              >
                <span>{t('BikeRental.booking.update')}</span>
              </div>
            </div>
        }

      </div>

      {/* popup select vehicle */}

      <FullScreenPopup
        title="Chọn xe"
        onClose={() => setDisplayVehiclePopup(false)}
        display={displayVehiclePopup}
      >
        <span className="section-vehicle-select-note">
          <span className="highlight">{t('BikeRental.booking.notice')}</span>
          <span>{t('BikeRental.booking.color_different')}</span> <br />
          <span>{t('BikeRental.booking.vehicle_include')}</span> <br />
          <span>{t('BikeRental.booking.ensurance')}</span> <br />
          <span>{t('BikeRental.booking.license')}</span> <br />
          <span>{t('BikeRental.booking.helmet')}</span>
        </span>
        <div>
          {
            ListVehicle.map((element, index) => {
              return (
                <ItemVehicle
                  t={t}
                  {...element}
                />
              )
            })
          }

        </div>
        <div className="booking-btn-book"
          onClick={() => setDisplayVehiclePopup(false)}
        >
          <span>{t('BikeRental.booking.accept')}</span>
        </div>
      </FullScreenPopup>


    </div>
  )
}

export default withTranslation()(SectionSelectVehicle)