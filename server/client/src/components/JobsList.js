import React, { useEffect, useState, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios'

function JobsList() {
    const [jobsArray, setJobsArray] = useState([])
    
    const fetchJobs = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/jobs`);
            console.log(`${process.env.REACT_APP_API_URL}/api/v1/jobs`);
            setJobsArray(response.data.jobs);
        } catch (e) {
            console.log("error fetching data", e);
        }
    }, []);

    useEffect(() => {
        fetchJobs()
    }, [fetchJobs])

    return (
        <div>
            <h4>My Jobs</h4>
            <Button variant="success" type="button" onClick={fetchJobs}>Refresh</Button>
            <Row lg={3}>
                {jobsArray &&
                    jobsArray.map((job) => {
                        const { jobName, jobStatus, company, location, applicationLink, _id } =
                            job;
                        return (
                            <Col key={_id} className="d-flex">
                                <Card border="primary" style={{ width: '18rem', marginBottom: '1rem' }} className="flex-fill">
                                    {/* fix key later */}
                                    <Card.Body>
                                        <Card.Title>{jobName}</Card.Title>
                                        <Card.Link href={applicationLink}>Link to Posting</Card.Link>
                                        <ListGroup className="list-group-flush">
                                            {/* <ListGroup.Item>Applied: {dateApplied}</ListGroup.Item> */}
                                            <ListGroup.Item>{jobStatus}</ListGroup.Item>
                                            <ListGroup.Item>{company}</ListGroup.Item>
                                            <ListGroup.Item>{location}</ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
            </Row>
        </div>
    )


}

export default JobsList;