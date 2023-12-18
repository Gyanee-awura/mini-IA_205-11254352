const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/medicalRecordSystem', {useNewUrlParser: true, useUnifiedTopology: true});

const patientSchema = new mongoose.Schema({
  patientID: String,
  surname: String,
  otherNames: String,
  gender: String,
  phoneNumber: String,
  residentialAddress: String,
  emergencyName: String,
  contact: String,
  relationshipWithPatient: String
});

const encounterSchema = new mongoose.Schema({
  patientID: String,
  dateTime: Date,
  typeOfEncounter: String
});

const vitalsSchema = new mongoose.Schema({
  patientID: String,
  bloodPressure: Number,
  temperature: Number,
  pulse: Number,
  spO2: Number
});

const Patient = mongoose.model('Patient', patientSchema);
const Encounter = mongoose.model('Encounter', encounterSchema);
const Vitals = mongoose.model('Vitals', vitalsSchema);

app.post('/patients', async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.send(patient);
});

app.post('/encounters', async (req, res) => {
  const encounter = new Encounter(req.body);
  await encounter.save();
  res.send(encounter);
});

app.post('/vitals', async (req, res) => {
  const vitals = new Vitals(req.body);
  await vitals.save();
  res.send(vitals);
});

app.get('/patients', async (req, res) => {
  const patients = await Patient.find();
  res.send(patients);
});

app.get('/patients/:patientID', async (req, res) => {
  const patient = await Patient.findOne({ patientID: req.params.patientID });
  res.send(patient);
});

app.listen(3000, () => console.log('Server started'));