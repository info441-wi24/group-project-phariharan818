import React, { useEffect, useState, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios'

function JobsList() {
    const [jobsArray, setJobsArray] = useState([])

    async function deleteJob(jobId) {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/jobs`, {
                params: { jobId: jobId }
            })
        } catch(e) {
            console.log("error deleting job", e)
        }
    }    
    const fetchJobs = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/jobs`);
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
            <Button variant="success" type="button" style={{margin: '1rem'}} onClick={fetchJobs}>Refresh</Button>
            <Row lg={3}>
                {jobsArray &&
                    jobsArray.map((job) => {
                        const { jobName, jobStatus, company, location, applicationLink, _id, dateApplied } =
                            job;
                        const dateObj = new Date(dateApplied)
                        const formattedDate = dateObj.toLocaleDateString('en-US', {
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          });

                        return (
                            <Col key={_id} className="d-flex">
                                <Card border="primary" style={{ width: '18rem', marginBottom: '1rem' }} className="flex-fill">
                                    {/* fix key later */}
                                    <Card.Body>
                                        <Card.Title>{jobName}</Card.Title>
                                        <Card.Link href={applicationLink}>Link to Posting</Card.Link>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>{jobStatus}</ListGroup.Item>
                                            <ListGroup.Item>Applied on {formattedDate}</ListGroup.Item>
                                            <ListGroup.Item>{company}</ListGroup.Item>
                                            <ListGroup.Item>{location}</ListGroup.Item>
                                        </ListGroup>
                                        <Button style={{ margin: '1rem'}} variant="outline-primary">Edit</Button>
                                        <Button variant="danger" onClick={() => deleteJob(_id)}>Delete</Button>
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