# covid-api

## Requirements
You can find the task requirements [here](https://docs.google.com/document/d/1z3PhoPuouGzGQxp9kTms47ctYMeUq2xHwdJKWivj3wA/edit)

## Description
An API for the doctors of a Hospital for creating and retriving patient details affected with covid

## Prerequisites
  * Node
  * MongoDB

## Set up and execution
* Clone the repository from [here](https://github.com/arunsridher/covid-api.git)
* Move to the cloned folder
* Install all the necessary dependencies using the command npm install
* Use services like postman for getting the bearer token
* Add bearer token in the patient and reports test files in the specified variable
* Add patient id at specified places in the aptient test file
* Run the application using the command "npm test"

## Request routes
[Base url](http://localhost:8000/api/v1)

### Register a new doctor
  * [Route](http://localhost:8000/api/v1/doctors/register)
  * Method : POST
  * Request parameters: username and password
  * Response : Message stating success or failure

### Doctor's Login
  * [Route](http://localhost:8000/api/v1/doctors/login)
  * Method : POST
  * Request parameters: username and password
  * Response : On successful login a JWT token which has to be used for further queries

### Register a patient
  * [Route](http://localhost:8000/api/v1/patients/register)
  * Method : POST
  * Request parameters: mobile
  * Request Header :    
    - Key: Authorization    
    - Value: bearer <token>
  * Response: Returns newly created patient or patient info if patient already exists or failure message

### Create a new report for the given patient
  * [Route](http://localhost:8000/api/v1/patients/:id/create_report)
  * Method : GET
  * Request Header :    
    - Key: Authorization    
    - Value: bearer <token>
  * Request parameters: patient id in the url
  * Response: Newly created report if request successful or failure message

### List all the reports of a patient oldest to latest
  * [Route](http://localhost:8000/api/v1/patients/:id/all_reports)
  * Method : GET
  * Request Header :    
    - Key: Authorization    
    - Value: bearer <token>
  * Request parameters: patient id in the url
  * Response: Returns all reports of the patient if request successful otherwise failure message

### List all the reports of all the patients filtered by a specific status
  * [Route](http://localhost:8000/api/v1/reports/:status)
  * Method : GET
  * Request Header :    
    - Key: Authorization    
    - Value: bearer <token>
  * Response: all reports that match the status if request successful otherwise failure message
  
