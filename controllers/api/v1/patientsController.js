const Patient = require('../../../models/patient');
const Doctor = require('../../../models/doctor');
const Report = require('../../../models/report');

module.exports.registerPatient = async function(req, res){
  try{
    console.log("inside registerPatient ", req.user);
    let patient = await Patient.findOne({mobile: req.body.mobile});
    if(patient){
      return res.status(200).json({
        message: "Patient details",
        patient: patient
      })
    }
    else{
      await Patient.create({
        mobile: req.body.mobile
      });
      return res.status(200).json({
        message: "Patient registered successfully"
      })
    }
  }catch(err){
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

module.exports.createReport = async function(req, res){
  try{
    let doctor = await Doctor.findById(req.user.id);
    let patient = await Patient.findById(req.params.id);
    if(doctor && patient){
      let statusArray = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];
      let status = statusArray[Math.floor(Math.random() * statusArray.length)];
      let date = new Date().toJSON().slice(0,10).toString();
      let report = await Report.create({
        doctor: doctor._id,
        patient: patient._id,
        status: status,
        date: date
      });

      patient.reports.push(report.id);
      patient.save();

      return res.status(200).json({
        message: "Report created successfully",
        report: report
      });
    }else{
      return res.status(401).json({
        message: "Invalid details"
      });
    }
  }catch(err){
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

module.exports.allReports = async function(req, res){
  try{
    let reports = await Patient.findById(req.params.id)
    .sort('-createdAt')
    .populate('reports');

    return res.status(200).json({
      message: "Reports retrieved successfully",
        reports: reports.reports
    });
  }catch(err){
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}