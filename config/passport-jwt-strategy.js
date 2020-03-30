const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctor');

let opts = {
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'abc'
};

passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    Doctor.findById(jwt_payload._id, function(err, doctor) {
        if (err) {
            console.log("Error ", err);
            return done(err, false);
        }
        if (doctor) {
            console.log("doctor ", doctor);
            return done(null, doctor);
        } else {
            console.log("doctor not found");
            return done(null, false);
        }
    });
}));

module.exports = passport;