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
	/*
  * Test the /POST route for patients registration
  */
	
	// update token before running test cases
	let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI2ODhiYWRiMjgwMTNhYzA2Y2ExOWQiLCJ1c2VybmFtZSI6ImFydW5zcmlkaGVyMTU4OTAyMDg1ODE5NCIsImNyZWF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsIl9fdiI6MCwiaWF0IjoxNTg5MDI4NDExLCJleHAiOjE1ODkwMjk0MTF9.lqfgEYy4Z6tXAR8mfP-nbxk-lehlK5UJK_TDV9ZfuT4';
	
	let authBearerToken = 'bearer ' + token;
	
	describe('/POST register patient', () => {

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
	
		it('it should not create a patient if mobile field is missing and authorization is valied', (done) => {
			let patient = {}
			chai.request(server)
				.post('/api/v1/patients/register')
				.set('Authorization', authBearerToken)
				.send(patient)
				.end((err, res) => {
					res.should.have.status(500);
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.body.should.have.property('message').eql('Internal Server Error');
					done();
				});
		});
	
		// update authorization before running test cases
		let mobileNum = (Math.floor(Math.random() * 9000000000) + 1000000000).toString();
		it('register a patient if valid authorization and has mobile number', (done) => {
			let patient = {
				mobile: mobileNum
			}
			chai.request(server)
				.post('/api/v1/patients/register')
				.set('Authorization', authBearerToken)
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
	
		// update authorization before running test cases
		it('return patient details if valid authorization and patient already exists with the given number', (done) => {
			let patient = {
				mobile: mobileNum
			}
			chai.request(server)
				.post('/api/v1/patients/register')
				.set('Authorization', authBearerToken)
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
	})


	/*
  * Test the /GET route for patient report creation
  */
	describe('/GET create patient report', () => {

		it('it should return unauthorized if token is wrong or expired', (done) => {
			let patientId = '5eb699b2bb688e4864564bea';
			chai.request(server)
				.get(`/api/v1/patients/${patientId}/create_report`)
				.set('Authorization', 'bearer eyJhbgciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI2ODhiYWRiMjgwMTNhYzA2Y2ExOWQiLCJ1c2VybmFtZSI6ImFydW5zcmlkaGVyMTU4OTAyMDg1ODE5NCIsImNyZWF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsIl9fdiI6MCwiaWF0IjoxNTg5MDI1NjU0LCJleHAiOjE1ODkwMjY2NTR9.AuBrNiKC4TFkmXAuPcFgoB4ct8IeOYcoql_lON-LC2k')
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.be.a('object');
					done();
				});
		});

		it('it should not create a report if patient id is wrong and authorization is valid', (done) => {
			let patientId = '5eb699b2bb6884864564bea';
			chai.request(server)
				.get(`/api/v1/patients/${patientId}/create_report`)
				.set('Authorization', authBearerToken)
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.body.should.have.property('message').eql('Invalid details');
					done();
				});
		});

		it('it should create a report if patient id is valid and authorization is valid', (done) => {
			let patientId = '5eb699b2bb688e4864564bea';
			chai.request(server)
				.get(`/api/v1/patients/${patientId}/create_report`)
				.set('Authorization', authBearerToken)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.body.should.have.property('message').eql('Report created successfully');
					res.body.should.have.property('report');
					res.body.report.should.have.property('patient');
					res.body.report.should.have.property('patient').eql(patientId);
					done();
				});
		});
	});


	/*
  * Test the /GET route for fetching all the reports of a patient
  */
	describe('/GET all reports of a patient', () => {

		it('it should return unauthorized if token is wrong or expired', (done) => {
			let patientId = '5eb699b2bb688e4864564bea';
			chai.request(server)
				.get(`/api/v1/patients/${patientId}/all_reports`)
				.set('Authorization', 'bearer eyJhbgciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI2ODhiYWRiMjgwMTNhYzA2Y2ExOWQiLCJ1c2VybmFtZSI6ImFydW5zcmlkaGVyMTU4OTAyMDg1ODE5NCIsImNyZWF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDUtMDlUMTA6NDA6NTguMjY4WiIsIl9fdiI6MCwiaWF0IjoxNTg5MDI1NjU0LCJleHAiOjE1ODkwMjY2NTR9.AuBrNiKC4TFkmXAuPcFgoB4ct8IeOYcoql_lON-LC2k')
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.be.a('object');
					done();
				});
		});

		it('it should not fetch reports if patient id is wrong and authorization is valid', (done) => {
			let patientId = '5eb699b2bb6884864564bea';
			chai.request(server)
				.get(`/api/v1/patients/${patientId}/all_reports`)
				.set('Authorization', authBearerToken)
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.body.should.have.property('message').eql('Invalid details');
					done();
				});
		});

		it('it should fetch all reports if patient id is valid and authorization is valid', (done) => {
			let patientId = '5eb699b2bb688e4864564bea';
			chai.request(server)
				.get(`/api/v1/patients/${patientId}/all_reports`)
				.set('Authorization', authBearerToken)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('patientMobile');
					res.body.should.have.property('message');
					res.body.should.have.property('message').eql('All Reports of ' + res.body.patientMobile);
					res.body.should.have.property('reports');
					res.body.reports.should.be.a('array');
					done();
				});
		});

	});

 });