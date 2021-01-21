import axios from "axios";
import Constants, { HTTPStatus, LocalStorageKey } from "../constant/Constants";
import i18n from "../../i18n"
import {getValue, setValue} from "../../util/LocalStorage"

/**
 * parse response
 */
function parseBody(response) {
  console.log("CheckResponse: ", response);
  const headerStatus = response.status;
  if (headerStatus >= 200 && headerStatus < 300) {
    return response.data.data;
  } else {
    return Promise.reject({ message: i18n.t("message.execute_err") });
  }

}


/**
 * axios instance
 */
let instance = axios.create({
  baseURL: Constants.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});

// request header
instance.interceptors.request.use(async (config) => {
  let accessToken = getValue(LocalStorageKey.USER_TOKEN);
  // accessToken = "5gZfUCGTDhyUMZlIdNphdYXX5RmkUCfr2NCTzfbdKQiMcq74DpbNFrB2sveqGs24"
  if (accessToken) {
    config.headers = {
      ...config.headers,
      "access_token": accessToken
    };
  }

  console.log("Starting Request", config);
  return config;
}, error => {
  return Promise.reject(error);
});

// response parse
instance.interceptors.response.use((response) => {
  return parseBody(response);
}, error => {
  console.log("Error status", error.response);
  if (error.response) {
    if (error.response.status >= 500) {
      return Promise.reject({ message: i18n.t("message.server_err") });
    } else {
      if (error.response.status === HTTPStatus.UNAUTHORIZED) {
        if (error.response.config.url !== `${Constants.BASE_URL}${Constants.API_PATH_LOGIN}`) {
          return Promise.reject({ message: i18n.t("message.server_err") });
        }
        return Promise.reject({ message: i18n.t("message.login_fail") });
      } else {
        var message = error.response.data.message;
        if (message === undefined) message = i18n.t("message.execute_err")
        return Promise.reject({ message: message });
      }

    }

  } else {
    return Promise.reject({ message: i18n.t("message.nework_err") });
  }
});

export const ApiHelper = instance;
