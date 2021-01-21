import * as BikeRentalAction from "./BikeRentalAction"
var initState = {
  location: {
    name: "",
    address: "",
    location: {}
  },
  startDate: new Date(),
  startTime: new Date(),
  endDate: new Date((new Date()).getTime() + 2 * 60 * 60 * 1000),
  endTime: new Date((new Date()).getTime() + 2 * 60 * 60 * 1000),
  vehicle: [
    {
      id: "1",
      name: "Xe tay ga - Airblade 2019 125cc",
      price: 200000,
      quanlity: 0
    },
    {
      id: "2",
      name: "Xe số - Yamaha 2018 110cc",
      price: 120000,
      quanlity: 0
    }
  ],
  username: "",
  phoneNumber: "",
  email: "",
  note: "",
  loadingHouse: false,
  listHouse: [],

  loadingPrice: false,
  loadingVehicle: false,

}

function BikeRentalReducer(state = initState, action) {
  console.log("BikeRentalReducer", action)
  switch (action.type) {
    case BikeRentalAction.ACTION_SET_LOCATION.NAME:
      return {
        ...state,
        location: action.data
      }

    case BikeRentalAction.ACTION_SET_START_DATE.NAME:
      return {
        ...state,
        startDate: action.data
      }

    case BikeRentalAction.ACTION_SET_START_TIME.NAME:
      return {
        ...state,
        startTime: action.data
      }

    case BikeRentalAction.ACTION_SET_END_DATE.NAME:
      return {
        ...state,
        endDate: action.data
      }

    case BikeRentalAction.ACTION_SET_END_TIME.NAME:
      return {
        ...state,
        endTime: action.data
      }

    case BikeRentalAction.ACTION_SET_USERNAME.NAME:
      return {
        ...state,
        username: action.data
      }

    case BikeRentalAction.ACTION_SET_PHONENUMBER.NAME:
      return {
        ...state,
        phoneNumber: action.data
      }
    case BikeRentalAction.ACTION_SET_EMAIL.NAME:
      return {
        ...state,
        email: action.data
      }

    case BikeRentalAction.ACTION_SET_NOTE.NAME:
      return {
        ...state,
        note: action.data
      }
    case BikeRentalAction.ACTION_SET_VEHICLE.NAME:
      var {id, quanlity} = action.data;
      if(quanlity < 0) {
        quanlity = 0;
      }
      var listVehicle = state.vehicle;
      var newVehicle = listVehicle.find(element => element.id == id);
      newVehicle.quanlity = quanlity;
      var index = listVehicle.findIndex(element => element.id == id);
      listVehicle.splice(index, 1, newVehicle)
      return {
        ...state,
        vehicle: [...listVehicle]
      }

    case BikeRentalAction.FETCH_LIST_HOUSE.LOADING:
      return {
        ...state,
        loadingHouse: true
      }
    case BikeRentalAction.FETCH_LIST_HOUSE.SUCCESS:
      return {
        ...state,
        loadingHouse: false,
        listHouse: action.data.data
      }
    default:
      return state;
  }
}

export default BikeRentalReducer