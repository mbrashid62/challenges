import { Router } from 'express';
import db from '../db';
import { MODELS } from '../db/db-constants';
import Api from '../db/db-api';

const userProperties = ['firstName', 'lastName', 'email'];

function hydratePatientData(patient) {
  return {
    ...patient,
    ...db
      .get(MODELS.USER)
      .find({ id: patient.user_id })
      .pick(userProperties)
      .value(),
    appointments: Api.Appointment.get({ patient_id: patient.id }),
    address: Api.Address.get({ id: patient.address_id }),
  };
}

/**
 * Filters out all patients that do not have an appointment record with the given doctor
 * @param patients
 * @param doctorId
 * @return {Array}
 */
function getOnlyDoctorsPatients(patients, doctorId) {
  const result = [];
  patients.forEach((p) => {
    const { appointments } = p;
    for (let i = 0; i < appointments.length; i++) {
      if (appointments[i].doctor_id === doctorId) {
        result.push(p);
        break;
      }
    }
  });
  return result;
}
export default Router()
  .get('/', (req, res) => {
    const allPatients = Api.Patient.get();
    const allHydratedPatients = allPatients.map(hydratePatientData);

    // doctor's patients
    if (req.query.doctor_id) {
      res.status(200).send(getOnlyDoctorsPatients(allHydratedPatients, req.query.doctor_id));
      return;
    }

    // single patient
    if (req.query.patient_id) {
      let patient = Api.Patient.get(req.query.patient_id);
      patient = {
        ...patient,
        user_id: req.query.patient_id,
      };
      res.status(200).send(hydratePatientData(patient));
      return;
    }

    // all patients
    res.status(200).send(allHydratedPatients);
  })
  .get('/:id', (req, res) => {
    const patient = Api.Patient.get(req.params.id);
    res.status(200).send(hydratePatientData(patient));
  });
