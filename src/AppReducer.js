import { combineReducers } from 'redux'
import BikeRentalReducer from "./product/bikerental/BikeRentalReducer"
const AppReducer = combineReducers({
  BikeRentalReducer: BikeRentalReducer
})

export default AppReducer
