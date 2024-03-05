import React from 'react';
import JobsList from './JobsList';
import AddJobForm from './AddJobForm';

function HomePage() {


    return (
        <div>
            <div className='pb-3'>
                <h1>Job Application Manager</h1>
                <h2>Track the stages of job applications, interview status, and outcomes</h2>
            </div>
            <AddJobForm />
            <JobsList />

        </div>
    )
}

export default HomePage;