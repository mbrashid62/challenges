
export const PATIENT_ACTION_TYPES = {
  SET_ACTIVE_PATIENT: 'SET_ACTIVE_PATIENT',
};

export function dispatchSetActivePatient(patient) {
  return {
    type: PATIENT_ACTION_TYPES.SET_ACTIVE_PATIENT,
    payload: {
      patient,
    },
  };
}
