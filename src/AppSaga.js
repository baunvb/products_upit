import watchBikeRentalBookingData from "./product/bikerental/BikeRentalSaga"
import {all} from 'redux-saga/effects';

export default function* AppSaga() {
  yield all([watchBikeRentalBookingData()]);
}