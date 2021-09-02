/* eslint-disable no-console */
import axios from 'axios';

export const apiLogin = (user, action, redirect, setErrors) => {
  axios
    .post({ user })
    .then(response => {
      if (response.data.logged_in) {
        action(response.data);
        redirect();
      } else {
        setErrors(response.data.errors);
      }
    })
    .catch(error => console.log('api errors:', error.response.data));
};

export const apiSignUp = (user, action, redirect, setErrors) => {
  axios
    .post({ user })
    .then(response => {
      if (response.data.status === 'created') {
        action(response.data);
        redirect();
      } else {
        setErrors(response.data.errors);
      }
    })
    .catch(error => console.log('api errors:', error.response.data));
};

export const apiAddRent = (rent, userId, action) => {
  axios
    .post(rent)
    .then(response => {
      if (response.data.status === 'created') {
        action(rent);
      }
    })
    .catch(error => console.log('api errors:', error.response.data));
};

export const apiRemoveRent = (id, action) => {
  axios
    .delete()
    .then(response => {
      if (response.data.status === 'deleted') {
        action(id);
      }
    })
    .catch(error => console.log('api errors:', error));
};

export const apiChangeRentStatus = (id, rent, status, action) => {
  const modifiedRent = { ...rent, status };
  axios
    .patch(modifiedRent)
    .then(response => {
      if (response.data.status === 'updated') {
        action(id, status);
      }
    })
    .catch(error => console.log('api errors:', error));
};

export const apiGetRents = action => {
  axios
    .get()
    .then(response => {
      action(response.data);
    })
    .catch(error => console.log('api errors:', error));
};

export const apiGetUserRents = (id, action) => {
  axios
    .get()
    .then(response => {
      action(response.data);
    })
    .catch(error => console.log('api errors:', error.response.data));
};

export const apiGetItems = action => {
  axios
    .get()
    .then(response => {
      if (response.status === 200) {
        action(response.data);
      }
    })
    .catch(error => console.log('api errors:', error.response.data));
};

export const apiAddItem = (itemData, action) => {
  axios
    .post(itemData, {
      headers: { 'content-type': 'multipart/form-data' },
    })
    .then(response => {
      if (response.statusText === 'Created') {
        action(response.data);
      }
    })
    .catch(error => console.log('api errors:', error.response.data));
};

export const apiRemoveItem = (id, action) => {
  axios
    .delete()
    .then(response => {
      if (response.data.status === 'deleted') {
        action(id);
      }
    })
    .catch(error => console.log('api errors:', error));
};

export const apiEditItem = (id, itemData, action) => {
  axios
    .patch(itemData)
    .then(response => {
      if (response.statusText === 'Accepted') {
        action(response.data);
      }
    })
    .catch(error => console.log('api errors:', error));
};
