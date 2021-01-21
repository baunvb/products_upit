export const getValue = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) {
      return "";
    }
    return value;
  } catch (err) {
    return "";
  }
};

export const setValue = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.err(e)
  }
}  