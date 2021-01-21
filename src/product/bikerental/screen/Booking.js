import "./booking.css"
import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import SectionInfo from "./SectionInfo";
import SectionSelectVehicle from "./SectionSelectVehicle";
import { formatConcurrency, getDurationHour, validateDuration, validateEmail, validatePhonenumber } from "../../../util/Utils"
import SectionCustomer from "./SectionCustomer";
import { useSelector, useDispatch } from 'react-redux'
import * as BikeRentalAction from "../BikeRentalAction"
import Dialog from '@material-ui/core/Dialog';
import IconError from "../../../assest/icon/ic_error.svg"
import IconSuccess from "../../../assest/icon/ic_success.svg"
import { setValue, getValue } from "../../../util/LocalStorage"
import { LocalStorageKey } from "../../../data/constant/Constants"
import i18n from "../../../i18n"
import Section from "../component/Section/Section";
function Booking(props) {
    const { t } = props;
    const dispatch = useDispatch();
    const BikeRentalState = useSelector(state => state.BikeRentalReducer)
    const [openDialogConfirm, setOpenConfirm] = useState(false);
    const [openDialogWarning, setOpenDialogWarning] = useState(false);
    const [openDialogSuccess, setOpenDialogSuccess] = useState(false);

    useEffect(() => {
        var params = new URLSearchParams(window.location.search);
        var token = params.get('access_token')
        var lang = params.get('lang')
        console.log("Token:::", token, typeof (token))
        if (Boolean(token)) {
            setValue(LocalStorageKey.USER_TOKEN, token)
        }
        if (Boolean(lang)) {
            setValue(LocalStorageKey.LANGUAGE, lang)
            i18n.changeLanguage(lang)
        }
        dispatch(BikeRentalAction.fetchListHouse())
    }, [])

    const { vehicle, startDate, startTime, endDate, endTime, username, phoneNumber, email, note, location } = BikeRentalState
    var totalPrice = 0;

    var durationHours = getDurationHour(startDate, startTime, endDate, endTime)
    console.log("duration::::", durationHours)
    if (validateDuration(durationHours)) {
        vehicle.forEach(element => {
            if (element.quanlity > 0) {
                totalPrice += element.quanlity * element.price
            }
        });
        totalPrice = totalPrice * durationHours;
    }

    const confirmBook = () => {
        if (!Boolean(username) || !Boolean(totalPrice) || !validateEmail(email) || !validatePhonenumber(phoneNumber)) {
            setOpenDialogWarning(true)
        } else {
            setOpenConfirm(true)
        }
    }

    const requestBook = () => {
        const data = {

        }
        //dispatch(BikeRentalAction.requestBook(data))
        setOpenDialogSuccess(true)
    }

    return (
        <div className="booking-container">
            <div className="booking-header">
                <span>{t('BikeRental.booking.description')}</span>
            </div>

            <div className="booking-content">
                <Section
                    title="Test url"
                >
                    <span>TOKEN: {new URLSearchParams(window.location.search).get("access_token")}</span> <br />

                </Section>

                <Section
                    title="Test local storage"
                >
                    <span>TOKEN: {getValue(LocalStorageKey.USER_TOKEN)}</span> <br />
                    <span>LANG: {getValue(LocalStorageKey.LANGUAGE)}</span>
                </Section>

                <SectionInfo />
                <SectionSelectVehicle />

                {/* section total price */}
                <div className="booking-section-price">
                    <span className="section-title">{t('BikeRental.booking.estimated_price')}</span>
                    <span className="booking-total-price">{`${formatConcurrency(totalPrice)} VNĐ`}</span>
                </div>

                <SectionCustomer />

                <div className="booking-btn-book"
                    onClick={() => confirmBook()}
                >
                    <span>{t('BikeRental.booking.book')}</span>
                </div>
            </div>

            {/* dialog warning */}
            <Dialog
                open={openDialogWarning}
                onClose={() => {

                }}
            >
                <div className="booking-dialog-confirm">
                    <img className="image" src={IconError} alt="" />
                    <span className="title-err">{t('BikeRental.booking.title_warning_input')}</span>
                    <span className="message">{t('BikeRental.booking.des_warning_input')}</span>
                    <div className="button"
                        onClick={() => setOpenDialogWarning(false)}
                    >
                        <span>{t('BikeRental.booking.accept')}</span>
                    </div>
                </div>
            </Dialog>

            {/* dialog confirm */}
            <Dialog
                open={openDialogConfirm}
                onClose={() => {

                }}
            >
                <div className="booking-dialog-confirm">
                    <span className="title-confirm">{t('BikeRental.booking.confirm_book')}</span>
                    <div className="button"
                        onClick={() => {
                            //request book
                            requestBook()
                            setOpenConfirm(false)
                        }}
                    >
                        <span>{t('BikeRental.booking.accept')}</span>
                    </div>

                    <div className="button-cancel"
                        onClick={() => setOpenConfirm(false)}
                    >
                        <span>{t('BikeRental.booking.cancel')}</span>
                    </div>
                </div>
            </Dialog>

            {/* dialog success */}
            <Dialog
                open={openDialogSuccess}
                onClose={() => {

                }}
            >
                <div className="booking-dialog-confirm">
                    <img className="image" src={IconSuccess} alt="" />
                    <span className="title-err">{t('BikeRental.booking.book_success')}</span>
                    <span className="message">{t('BikeRental.booking.book_success_des')}</span>
                    <div className="button"
                        onClick={() => setOpenDialogSuccess(false)}
                    >
                        <span>{t('BikeRental.booking.accept')}</span>
                    </div>
                </div>
            </Dialog>
        </div>
    )

}
export default withTranslation()(Booking);