import {ApiHelper} from "./ApiHelper"
import Constants from "../constant/Constants"

export const fetchListVehicle = async () => {
  return ApiHelper.get(Constants.API_GET_LIST_VEHICLE)
}

export const fetchListHouse = async () => {
  return ApiHelper.post(Constants.API_GET_LIST_HOUSE)
}

export const requestBook = async (data) => {
  return ApiHelper.post(Constants.API_REQUEST_BOOK, data)
}