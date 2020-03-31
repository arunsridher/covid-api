# covid-api
An API for the doctors of a Hospital for creating and retriving patients affected with covid

# Set up and execution

1. Clone the repository from https://github.com/arunsridher/covid-api.git
2. Move to the cloned folder
3. Install all the necessary dependencies (your system should have node and npm)
4. Run the application using the command "npm start"

# Request routes - Base url: http://localhost:8000/api/v1

1. /doctors/register -> register a new doctor
  Method : POST
  Request parameters: username and password
  Response : Message indication request status success/failure

2. /doctors/login -> doctors login
  Method : POST
  Request parameters: username and password
  Response : On successful login a JWT token which has to be used for further queries

3. /register_patient -> register a patient
  Method : POST
  Request parameters: mobile
  Request Header :    Key: Authorization    Value: bearer <token>
  Response: if the patient already exists, just return the patient info

4. /patients/:id/create_report -> creates a new report for the given patient
  Method : GET
  Request parameters: patient id in the url
  Request Header :    Key: Authorization    Value: bearer <token>
  Response: If report created success message and report otherwise failure message

5. /patients/:id/all_reports → List all the reports of a patient oldest to latest
  Method : GET
  Request parameters: patient id in the url
  Request Header :    Key: Authorization    Value: bearer <token>
  Response: all reports of the patient if exists otherwise failure message

6. /reports/:status  → List all the reports of all the patients filtered by a specific status
  Method : GET
  Request Header :    Key: Authorization    Value: bearer <token>
  Response: all reports that match the status if exists otherwise failure message
  
