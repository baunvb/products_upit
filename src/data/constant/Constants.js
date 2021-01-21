const ROLE = "salepoints";

const Constants = {
  BASE_URL: "https://server.upit.asia/api/",
  API_SIGNOUT: `${ROLE}/signout`,
  API_PATH_LOGIN: `${ROLE}/signin`,
  API_GET_PROFILE: `${ROLE}/getInfo`,
  API_GET_LIST_VEHICLE: `${ROLE}/getListVehicle`,
  API_GET_LIST_HOUSE:  `${ROLE}/getLinkHouses`,
  API_REQUEST_BOOK: `${ROLE}/bookBikeRental`

};

export const HTTPStatus = {
  UNAUTHORIZED: 401
};

export const LocalStorageKey = {
  USER_TOKEN: "TOKEN_ID",
  LANGUAGE: "LANGUAGE"
}

export default Constants;
