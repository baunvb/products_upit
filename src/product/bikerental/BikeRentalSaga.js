import { FETCH_LIST_VEHICLE, FETCH_LIST_HOUSE, REQUEST_BOOK } from "./BikeRentalAction"
import { put, takeLatest } from 'redux-saga/effects'
import * as Api from "../../data/remote/Api"

function* fetchListHouse() {
  try {
    yield put({ type: FETCH_LIST_HOUSE.LOADING });
    let data = yield Api.fetchListHouse();
    console.log(FETCH_LIST_HOUSE.SUCCESS, data);
    yield put({ type: FETCH_LIST_HOUSE.SUCCESS, data: data });
  } catch (e) {
    console.log(FETCH_LIST_HOUSE.ERROR, e);
    yield put({ type: FETCH_LIST_HOUSE.ERROR, data: e.messages });
  }
}

function* requestBook(action) {
  try {
    yield put({ type: REQUEST_BOOK.LOADING });
    let data = yield Api.requestBook(action.data);
    console.log(REQUEST_BOOK.SUCCESS, data);
    yield put({ type: REQUEST_BOOK.SUCCESS, data: data });
  } catch (e) {
    console.log(REQUEST_BOOK.ERROR, e);
    yield put({ type: REQUEST_BOOK.ERROR, data: e.messages });
  }
}

function* watchBikeRentalBookingData() {
  yield takeLatest(FETCH_LIST_HOUSE.NAME, fetchListHouse);
  yield takeLatest(REQUEST_BOOK.NAME, requestBook);
}

export default watchBikeRentalBookingData