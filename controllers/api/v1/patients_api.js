const Patient = require('../../../models/patient');

module.exports.registerPatient = async function(req, res){
  try{
    console.log("registerPatient ", req.doctor);
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
    // if(req.doctor){
    //   let patient = await Patient.findOne({mobile: req.body.mobile});
    //   if(patient){
    //     return res.status(200).json({
    //       message: "Patient details",
    //       patient: patient
    //     })
    //   }
    //   else{
    //     await Patient.create({
    //       mobile: req.body.mobile
    //     });
    //     return res.status(200).json({
    //       message: "Patient registered successfully"
    //     })
    //   }
    // }
    // else{
    //   return res.status(401).json({
    //     message: "Unauthorized request"
    //   });
    // }
  }catch(err){
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}