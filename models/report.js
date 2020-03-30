const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor'
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient'
  },
  status: {
    type: String,
    required: true,
    enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']
  },
  date :{
    type: Date,
    required: true
  }
},{
  timestamps: true
});

const Report = mongoose.Schema('Report', reportSchema);
module.exports = Report;