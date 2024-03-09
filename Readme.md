# Job Application Manager

## Install
1. To run the application locally, first navigate to the `client` directory, install dependencies with `npm install`, and then build the client-side code using `npm run build`.
2. After that, return to the root directory, navigate to the `server` directory, install server dependencies with `npm install`, and finally start the server with `npm start`.
3. 3. Once the server is running, you can access the application locally at [http://localhost:3001](http://localhost:3001).


## Non-Technical Description: 

Our job application tracker is designed to cater to individuals actively seeking employment opportunities regardless of their current career status or industry. Our application is tailored to streamline the job application process for users of all backgrounds. 

Applying for jobs and navigating the job market can be daunting, but our application is a valuable tool for students as they start on their professional journey to secure internships and jobs. Our centralized job application management system would allow for students to track and organize their applications and monitor their progress. Additionally, our features that we are implementing would empower and motivate students to continue applying and working towards their goal.

Many students, including us, have used traditional methods of job application tracking like using spreadsheets but as we continue to apply, we started to see a lack of sophistication and efficiency required to manage job applications effectively. Spreadsheets suffice for basic tracking, but fall short when an applicant would want to see their comprehensive insights regarding their job search progress. Our application aims to address these limitations by offering advanced features such as analytics, filtering, and status updates to provide users with an improved application tracking experience. 

As developers, we are motivated to build this application based on our personal experiences and challenges that we have encountered while applying and tracking our job applications. These basic methods of spreadsheets or note-taking, often lead to disorganization and missed opportunities which hinder the applicant's job search process. We understand the frustrations that come with the process as well what is needed to better the procedure. We are envisioning a platform that simplifies job application tracking and also provides insights and tools to support its users throughout their job search journey.

## Technical Description:

| Priority | User Story | Technical Implementation |
|----------|------------|--------------------------|
| P0       | As a user who is interested in using the job application tracker web application, I want to create an account to access the features of the application. | Utilize React Form Component for the front-end to create a user-friendly registration form. Use Azure Authentication to allow users to sign in with their Microsoft accounts. |
| P0       | As a user of the job application tracker web application, I want to input details of a new job application that they submitted including job title, company, application status, date and application link. | Create a form interface using React components to capture job application details. Develop an endpoint on the Node.js backend to receive and process the form data, then store the application details in MongoDB. Ensure that all the data is inputted and is valid. Implement data validation. |
| P1       | As a user of the job application tracker web application, I want to update the application of the job I have applied to such that it aligns with the status of it on the job application portal. | Updating the elements that we want to change by accessing MongoDB element identifiers that correlate to the field that is being changed. Adding a router to the Node.js endpoint that performs these CRUD operations and sending information to the user that the operation was successful. |
| P0       | As a user of the job application tracker web application, I want to view the application of a job I have applied to such that I can visually see the jobs I have already applied for. | Retrieving the user input fields in MongoDB and displaying them on the website using React, implementing a clean and easy to use interface that users can navigate. Implementing a view endpoint with Node.js that will handle the posting of all job applications added by the user. |
| P1       | As a user of the job application tracker web application, I want to filter for a job I have applied for on the website by date or title such that I can easily find jobs that fit the criteria I am filtering for. | Filtering through the elements that we want to filter for by accessing user input fields in MongoDB and adding a filter endpoint with Node.js that processes the user input and returns the filtered values. Implementing React to create a user-friendly interface that includes a filter icon and different criteria that users can filter on (i.e. date, job title, status etc.) |
| P1       | As a user of the job application tracker web application, I want to search for a job I have applied for on the website by name such that I can easily find jobs that fit the criteria I am searching for. | Filtering through the elements that we want to search for by accessing user input fields in MongoDB and adding a search endpoint with Node.js that processes the user input and returns the filtered values. Implementing React to create a user-friendly interface that includes a filter icon and different criteria that users can search by (i.e. name) |
| P1       | As a user of the job application tracker web application, I want to be able to securely log out of the application such that my user session ends when I am not using the website actively. | Implementing an endpoint with Node.js that implements the functionality of logging out using the Microsoft-identity express package. Tracking middleware of the user sessions to store relevant information when a user tries to login. Handling logout requests in the backend such that the frontend will reflect these changes. |
| P2       | As a user of the job application tracker web application, I want to view aggregated analytics of the jobs I have applied for such that I can see an analysis of the jobs I applied for this week compared to last week. | Aggregating the information of specific fields from MongoDB and returning that information to the website. Implementing an endpoint with Node.js that will handle the calculation of these statistics that will be shown on the frontend through React. |
| P3       | As a user of the job application tracker web application, I want to receive email notifications for job interviews or deadlines for applications such that I can be on track and manage my time better. | Integrating an email service (such as SendGrid or NodeMailer) triggered by MongoDB event listeners when interview dates or deadlines are set or updated in job applications. Scheduled tasks which are managed by a Node.js scheduler will send personalized email alerts at the appropriate times. |


## API Endpoints

### User Authentication API (using Azure?)

- **GET /users/register**
  - Description: Register a new user.
- **GET /users/login**
  - Description: Log in an existing user.
- **GET /users/logout**
  - Description: Log out the current user.

### Job Application Management API

- **GET /users/{id}/applications**
  - Description: Displays a list of all applications associated with the user's ID.
- **GET /users/{id}/applications/{appId}**
  - Description: Returns information about a specific application corresponding to the user.
- **PUT /users/{id}/applications/{appId}**
  - Description: Updates a specific job application.
- **DELETE /users/{id}/applications/{appId}**
  - Description: Deletes a specific job application.
- **POST /users/{id}/applications**
  - Description: Creates a new job application and its information.

### Analytics API

- **GET /users/users/{id}/analytics/overview**
  - Description: Shows some brief statistics about jobs applied to so far.
- **GET /users/{id}/analytics/daily**
  - Description: Breaks down the number of applications applied to by day.

### Searching/Filtering API

- **GET /users/{id}/applications/search**
  - Description: Search for job applications.
- **GET /users/{id}/applications/filter**
  - Description: Filter job applications based on certain criteria.


### Database Schemas:

#### Users

| Field     | Description                                      |
|-----------|--------------------------------------------------|
| _id       | Automatically generated unique identifier.       |
| username  | User's chosen username for the account.         |
| email     | User's email address used for account registration and communication.     |
| password  | Hashed password for authentication.             |

#### Job Collection

| Field             | Description                                         |
|-------------------|-----------------------------------------------------|
| _id               | Automatically generated unique identifier.          |
| userId            | References the user who added the job entry.        |
| jobName           | Title of the job being applied for.                 |
| dateApplied       | Date when the job application was submitted.        |
| jobStatus         | Current status of the job application.              |
| applicationLink   | Link to the job posting/application.               |
| interviewStatus   | Status of the interview process.                    |
| company           | Name of the company for the job application.        |
| location          | Location of the job (city, state, country).        |
| jobDescription    | Description of the job role and responsibilities.   |
| notes             | Additional notes or comments related to the job application. |
| applicationDeadline | Deadline for submitting the job application.      |
| salary            | Expected salary/salary range for the job position.  |
| experienceRequired | Required experience level for the job.             |
| skillsRequired    | Required skills or qualifications for the job.      |

#### Analytics Collection

| Field             | Description                                         |
|-------------------|-----------------------------------------------------|
| _id               | MongoDB's default unique identifier.                |
| userId            | Reference to the User's _id this analytics data belongs to |
| date              | Date for the analytics data.                        |
| applicationsCount | Number of applications made on this date.           |
| statusBreakdown   | Breakdown of application statuses on this date.




