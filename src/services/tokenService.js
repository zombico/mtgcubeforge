export const setToken = token => {
  // set an item in local storage called "token" and set it equal to any value we pass to it
  localStorage.setItem('token', token)
};

export const getToken = () => {
  // retrieve our token from local storage
  return localStorage.getItem('token')
};
export const removeToken = () => {
  // remove our token from local storage
  localStorage.removeItem('token')
};
