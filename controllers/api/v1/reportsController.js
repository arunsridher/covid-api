const Report = require('../../../models/report');

module.exports.status = async function(req, res){
  try{
    let reports = await Report.find({status: req.params.status});
    return res.status(200).json({
      message: "All reports whose status is " + req.params.status,
      reports: reports
    });
  }catch(err){
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}