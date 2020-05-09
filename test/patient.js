//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Patient = require('../models/patient');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Patients', () => {
  beforeEach((done) => { //Before each test we empty the database
		Patient.remove({}, (err) => { 
		   done();		   
		});		
  });
	
	it('register a patient if valid authorization and has mobile number', (done) => {
		let patient = {
			mobile: "9492136642"
		}
		chai.request(server)
			.post('/api/v1/patients/register')
			.set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI2ODhiYWRiMjgwMTNhYzA2Y2ExOWQiLCJ1c2VybmFtZSI6ImFydW5zcmlkaGVyMTU4OTAyMDg1ODE5NCIsImNyZWF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsIl9fdiI6MCwiaWF0IjoxNTg5MDIzMzk2LCJleHAiOjE1ODkwMjM0OTZ9.3c72WY8jkU2nrvmmtvMCiih7_Qa0QaiFsvc7zvS0TD0')
			.send(patient)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message');
				res.body.should.have.property('message').eql('Patient registered successfully');
				done();
			});
	});

 });