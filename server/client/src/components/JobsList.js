import React, { useEffect, useState, useCallback } from 'react';
import { Card, Row, Col, Button, ListGroup, Form } from 'react-bootstrap';
import axios from 'axios';

function JobsList() {
    const [jobsArray, setJobsArray] = useState([]);
    const [editingJobId, setEditingJobId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterKeyword, setFilterKeyword] = useState({
        startDate: '',
        endDate: '',
        jobStatus: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearchAndFilter = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
            searchTerm: searchTerm,
            startDate: filterKeyword.startDate,
            endDate: filterKeyword.endDate,
            jobStatus: filterKeyword.jobStatus
        }).toString();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/jobs?${params}`);
            setJobsArray(response.data.jobs);
        } catch (e) {
            console.log("error fetching filtered data", e);
            setError("Failed to fetch jobs based on filters.");
        } finally {
            setIsLoading(false);
        }
    };

    async function deleteJob(jobId) {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/jobs/${jobId}`);
            setJobsArray(currentJobs => currentJobs.filter(job => job._id !== jobId));
        } catch (e) {
            console.log("error deleting job", e);
            setError("Failed to delete the job.");
        }
    }

    const fetchJobs = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/jobs`);
            setJobsArray(response.data.jobs);
        } catch (e) {
            console.log("error fetching data", e);
            setError("Failed to fetch jobs.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    async function updateJobStatus(jobId, newStatus) {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/jobs/${jobId}`, { jobStatus: newStatus });
            setJobsArray(currentJobs =>
                currentJobs.map(job =>
                    job._id === jobId ? { ...job, jobStatus: newStatus } : job
                )
            );
            setEditingJobId(null);
        } catch (error) {
            console.error("Error updating job status:", error);
        }
    }

    return (
        <div>
            <Row className="mb-3">
                <Col md={12}>
                    <Form className="d-flex" onSubmit={handleSearchAndFilter}>
                        <Form.Control
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Form.Control
                            type="date"
                            value={filterKeyword.startDate}
                            onChange={(e) => setFilterKeyword({ ...filterKeyword, startDate: e.target.value })}
                        />
                        <Form.Control
                            type="date"
                            value={filterKeyword.endDate}
                            onChange={(e) => setFilterKeyword({ ...filterKeyword, endDate: e.target.value })}
                        />
                        <Form.Select
                            value={filterKeyword.jobStatus}
                            onChange={(e) => setFilterKeyword({ ...filterKeyword, jobStatus: e.target.value })}
                        >
                            <option value="">Filter by Application Status</option>
                            <option value="Applied">Applied</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Online Assessment">Online Assessment</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Select>
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                </Col>
            </Row>
            <Button variant="success" type="button" style={{ marginBottom: '1rem' }} onClick={fetchJobs}>Refresh</Button>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <Row lg={3}>
                    {jobsArray.map((job) => {
                        const { jobName, jobStatus, company, location, applicationLink, _id, dateApplied } = job;
                        const dateObj = new Date(dateApplied);
                        const formattedDate = dateObj.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });

                        return (
                            <Col key={_id} className="d-flex">
                                <Card border="primary" style={{ width: '18rem', marginBottom: '1rem' }} className="flex-fill">
                                    <Card.Body>
                                        <Card.Title>{jobName}</Card.Title>
                                        <Card.Link href={applicationLink}>Link to Posting</Card.Link>
                                        <ListGroup className="list-group-flush">
                                            {editingJobId === _id ? (
                                                <ListGroup.Item>
                                                    <Form.Select
                                                        aria-label="Select job status"
                                                        value={jobStatus}
                                                        onChange={(e) => updateJobStatus(_id, e.target.value)}
                                                    >
                                                        <option value="Applied">Applied</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Interviewing">Interviewing</option>
                                                        <option value="Online Assessment">Online Assessment</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </Form.Select>
                                                </ListGroup.Item>
                                            ) : (
                                                <ListGroup.Item>Job Status: {jobStatus}</ListGroup.Item>
                                            )}
                                            <ListGroup.Item>Applied on {formattedDate}</ListGroup.Item>
                                            <ListGroup.Item>{company}</ListGroup.Item>
                                            <ListGroup.Item>{location}</ListGroup.Item>
                                        </ListGroup>
                                        <Button style={{ margin: '1rem' }} variant="outline-primary" onClick={() => setEditingJobId(_id)}>Edit</Button>
                                        <Button variant="danger" onClick={() => deleteJob(_id)}>Delete</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            )}
        </div>
    );
}

export default JobsList;
