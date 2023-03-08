//  token
const storeToken = (value) => {
  localStorage.setItem("token", value);
};

const getToken = () => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  return token;
};

const removeToken = (value) => {
  localStorage.removeItem(value);
};

export { storeToken, getToken, removeToken };
