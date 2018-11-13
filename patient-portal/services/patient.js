import axios from 'axios';

export async function fetchPatient(params) {
  let response = {};
  try {
    response = await axios.get('/api/patients', {
      params: {
        ...params,
      },
    });
  } catch (e) {
    response = e;
  }

  return Promise.resolve(response);
}
