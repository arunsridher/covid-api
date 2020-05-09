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
  // beforeEach((done) => { //Before each test we empty the database
	// 	Patient.remove({}, (err) => { 
	// 	   done();		   
	// 	});		
  // });
	
	it('it should return authorized if token is wrong or expired', (done) => {
		let patient = {
			mobile: "7569514776"
		}
		chai.request(server)
			.post('/api/v1/patients/register')
			.set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI2ODhiYWRiMjgwMTNhYzA2Y2ExOWQiLCJ1c2VybmFtZSI6ImFydW5zcmlkaGVyMTU4OTAyMDg1ODE5NCIsImNyZWF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsIl9fdiI6MCwiaWF0IjoxNTg5MDIzNTE1LCJleHAiOjE1ODkwMjM2MTV9.CfXXebq2AOCWsUWph2fED0FD-d179pZbB4aXwFonbzS')
			.send(patient)
			.end((err, res) => {
				res.should.have.status(401);
				res.body.should.be.a('object');
				done();
			});
	});

	it('it should not create a patient if mobile field is missing', (done) => {
		let patient = {}
		chai.request(server)
			.post('/api/v1/patients/register')
			.set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI2ODhiYWRiMjgwMTNhYzA2Y2ExOWQiLCJ1c2VybmFtZSI6ImFydW5zcmlkaGVyMTU4OTAyMDg1ODE5NCIsImNyZWF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsIl9fdiI6MCwiaWF0IjoxNTg5MDIzNzQyLCJleHAiOjE1ODkwMjQ3NDJ9.yxpGrpK-DGGjRvsH8vQDlNLBiNUrwfYYLIrKBjZ4ucw')
			.send(patient)
			.end((err, res) => {
				res.should.have.status(500);
				res.body.should.be.a('object');
				res.body.should.have.property('message');
				res.body.should.have.property('message').eql('Internal Server Error');
				done();
			});
	});

	let mobileNum = (Math.floor(Math.random() * 9000000000) + 1000000000).toString();
	it('register a patient if valid authorization and has mobile number', (done) => {
		let patient = {
			mobile: mobileNum
		}
		chai.request(server)
			.post('/api/v1/patients/register')
			.set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI2ODhiYWRiMjgwMTNhYzA2Y2ExOWQiLCJ1c2VybmFtZSI6ImFydW5zcmlkaGVyMTU4OTAyMDg1ODE5NCIsImNyZWF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsIl9fdiI6MCwiaWF0IjoxNTg5MDI0NjUwLCJleHAiOjE1ODkwMjU2NTB9.8WLMTtKT2lcMurz8SfIgW99vJTNfpR5PJV7f2EwRA4E')
			.send(patient)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message');
				res.body.should.have.property('message').eql('Patient registered successfully');
				res.body.should.have.property('patient');
				res.body.patient.should.have.property('mobile');
				res.body.patient.should.have.property('mobile').eql(mobileNum);
				done();
			});
	});

	it('return patient details if valid authorization and patient already exists with the given number', (done) => {
		let patient = {
			mobile: mobileNum
		}
		chai.request(server)
			.post('/api/v1/patients/register')
			.set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI2ODhiYWRiMjgwMTNhYzA2Y2ExOWQiLCJ1c2VybmFtZSI6ImFydW5zcmlkaGVyMTU4OTAyMDg1ODE5NCIsImNyZWF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsIl9fdiI6MCwiaWF0IjoxNTg5MDI0NjUwLCJleHAiOjE1ODkwMjU2NTB9.8WLMTtKT2lcMurz8SfIgW99vJTNfpR5PJV7f2EwRA4E')
			.send(patient)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message');
				res.body.should.have.property('message').eql('Patient details');
				res.body.should.have.property('patient');
				res.body.patient.should.have.property('mobile');
				res.body.patient.should.have.property('mobile').eql(mobileNum);
				done();
			});
	});

 });