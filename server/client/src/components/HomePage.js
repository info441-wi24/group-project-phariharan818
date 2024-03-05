import React from 'react';
import JobsList from './JobsList';
import AddJobForm from './AddJobForm';
import SearchFilter from './SearchFilter';
import Button from 'react-bootstrap/Button'


function HomePage() {


    return (
        <div>
            <div className='pb-3'>
                <h1>Job Application Manager</h1>
                <h2>Track the stages of job applications, interview status, and outcomes</h2>
            </div>
            <AddJobForm />
            <SearchFilter />
            <h4>My Jobs</h4>
            <JobsList />

        </div>
    )
}

export default HomePage;