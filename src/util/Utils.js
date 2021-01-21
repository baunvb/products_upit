
export const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export const formatConcurrency = (vnd) => {
  if (vnd === undefined || vnd === "" || vnd === null) {
    return 0;
  }
  return vnd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export const getDurationHour = (startDate, startTime, endDate, endTime) => {
  var start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes())
  var end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes())

  console.log("Data book::::", start, end)

  return (end.getTime() - start.getTime()) / 3600000;

}

export const validateDuration = (duration) => {
  return duration >= 0;
}

export const validatePhonenumber = number => {
  var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  return regex.test(String(number));
}