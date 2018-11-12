import { PATIENT_ACTION_TYPES } from '../actions/patients';

const PATIENTS_STATE = {
  activePatient: {},
};

const patientsReducer = (state = PATIENTS_STATE, action) => {
  switch (action.type) {
    case PATIENT_ACTION_TYPES.SET_ACTIVE_PATIENT:
      return {
        ...state,
        activePatient: action.payload.patient,
      };
    default:
      return state;
  }
};

export default patientsReducer;
