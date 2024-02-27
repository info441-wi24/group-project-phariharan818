import React from 'react';
import JobsList from './JobsList';
import AddJobForm from './AddJobForm';

function HomePage() {


    return (
        <div>
            <h1>Job Application Manager</h1>
            <h2>Track the stages of job applications, interview status, and outcomes</h2>
            <h3>My Jobs</h3>
            <AddJobForm />
            <JobsList />

        </div>
    )
}

export default HomePage;