const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');

module.exports.register = async function(req, res){
  try{
    let doctor = await Doctor.findOne({username: req.body.username});
    if(!doctor){
      doctor = await Doctor.create(req.body);
      if(doctor){
        return res.status(200).json({
          message: "Registration successful"
        });
      }
      else{
        return res.status(503).json({
          message: "Error in creating account, please try again"
        });
      }
    }else{
      return res.status(400).json({
        message: "User already exists"
      });
    }
  }catch(err){
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

module.exports.login = async function(req, res){
  try{
    console.log(req.body);
    let doctor = await Doctor.findOne({username: req.body.username});
    console.log(doctor);
    if(!doctor || doctor.password != req.body.password){
      return res.status(401).json({
        message: "Invalid username or passowrd"
      });
    }

    return res.status(200).json({
      message: "Login successful",
      token: jwt.sign(doctor.toJSON(), 'abc', {expiresIn: '100000'})
    })
  }catch(err){
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}