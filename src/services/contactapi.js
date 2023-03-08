import axios from "axios";

// const serverUrl = "http://localhost:8000/api/contact";
const serverUrl = "https://auth-crud-contact-api.onrender.com/api/contact";

// get, add, edit, delete (CRUD) apis for contact

export const getContact = async (token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return await axios.get(`${serverUrl}/getcontact`, config);
};

export const addContact = async (data, token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return await axios.post(`${serverUrl}/addcontact`, data, config);
};

export const editContact = async (id, data, token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return await axios.put(`${serverUrl}/editcontact/${id}`, data, config);
};

export const deleteContact = async (id, token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return await axios.delete(`${serverUrl}/deletecontact/${id}`, config);
};

export const getContactById = async (id, token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return await axios.get(`${serverUrl}/getcontact/${id}`, config);
};
