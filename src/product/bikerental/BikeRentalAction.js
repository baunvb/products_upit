import { createAction } from "../../util/ActionHelper"

export const ACTION_SET_LOCATION = createAction("ACTION_SET_LOCATION")
export const ACTION_SET_START_DATE = createAction("ACTION_SET_START_DATE")
export const ACTION_SET_START_TIME = createAction("ACTION_SET_START_TIME")
export const ACTION_SET_END_DATE = createAction("ACTION_SET_END_DATE")
export const ACTION_SET_END_TIME = createAction("ACTION_SET_END_TIME")
export const ACTION_SET_VEHICLE = createAction("ACTION_SET_VEHICLE")
export const ACTION_SET_USERNAME = createAction("ACTION_SET_USERNAME")
export const ACTION_SET_EMAIL = createAction("ACTION_SET_EMAIL")
export const ACTION_SET_PHONENUMBER = createAction("ACTION_SET_PHONENUMBER")
export const ACTION_SET_NOTE = createAction("ACTION_SET_NOTE")

export const FETCH_LIST_VEHICLE = createAction("FETCH_LIST_VEHICLE")
export const FETCH_LIST_HOUSE = createAction("FETCH_LIST_HOUSE")

export const REQUEST_BOOK = createAction("REQUEST_BOOK")

export const fetchListHouse = () => ({
  type: FETCH_LIST_HOUSE.NAME
})

export const requestBook = (data) => ({
  type: REQUEST_BOOK.NAME,
  data
})