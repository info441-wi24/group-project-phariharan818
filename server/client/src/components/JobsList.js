import React, { useEffect, useState, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios'

function JobsList() {
    const [jobsArray, setJobsArray] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [filterKeyword, setFilterKeyword] = useState({
        dateBegin: '',
        dateEnd: '',
        jobStatus: ''
    })

    async function deleteJob(jobId) {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/jobs`, {
                params: { jobId: jobId }
            })
        } catch (e) {
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

    async function handleSearchAndFilter() {
        console.log(filterKeyword)
        console.log(searchTerm)
    }

    return (
        <div>
            <h4>My Jobs</h4>
            <Row className="mb-3">
                <Col md={6}>
                <Form className="d-flex" onSubmit={handleSearchAndFilter}>
                    <Form.Group as={Col} controlId="searchAndFilterGrid" >
                        <FormControl onChange={(e) => setSearchTerm(e.target.value)}
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form.Group>
                    <Form.Group controlId="filterGridJobStatus">
                        <Form.Select
                            aria-label="Select job status"
                            name="jobStatus"
                            onChange={(e) => setFilterKeyword(e.target.value)}
                        >
                            <option>Application Status</option>
                            <option value="Applied">Applied</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Online Assessment">Online Assessment</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="outline-success">Search</Button>
                </Form>
                </Col>
            </Row>
            <Button variant="success" type="button" style={{ margin: '1rem' }} onClick={fetchJobs}>Refresh</Button>
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
                                    <Card.Body>
                                        <Card.Title>{jobName}</Card.Title>
                                        <Card.Link href={applicationLink}>Link to Posting</Card.Link>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>{jobStatus}</ListGroup.Item>
                                            <ListGroup.Item>Applied on {formattedDate}</ListGroup.Item>
                                            <ListGroup.Item>{company}</ListGroup.Item>
                                            <ListGroup.Item>{location}</ListGroup.Item>
                                        </ListGroup>
                                        <Button style={{ margin: '1rem' }} variant="outline-primary">Edit</Button>
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