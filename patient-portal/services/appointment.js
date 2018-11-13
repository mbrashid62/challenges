import axios from 'axios';

export async function deleteAppointment(params) {
  let response = {};
  try {
    response = await axios.delete(`/api/appointments/${params.id}`, {
      params: {
        ...params,
      },
    });
  } catch (e) {
    response = e;
  }

  return Promise.resolve(response);
}

export async function updateAppointment(params) {
  let response = {};
  try {
    response = await axios.post(`/api/appointments/${params.id}`, {
      params: {
        ...params,
      },
    });
  } catch (e) {
    response = e;
  }

  return Promise.resolve(response);
}

export async function createAppointment(params) {
  let response = {};
  try {
    response = await axios.post('/api/appointments/', {
      params: {
        ...params,
      },
    });
  } catch (e) {
    response = e;
  }

  return Promise.resolve(response);
}
