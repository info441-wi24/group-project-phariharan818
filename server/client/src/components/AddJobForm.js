import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col'
import axios from 'axios'

function AddJobForm({userSessionInfo}) {
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobStatus: '',
        company: '',
        location: '',
        link: '',
        dateApplied: '',
        user: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const jobData = {
            ...formData,
            user: userSessionInfo.userInfo.username
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/jobs`, jobData);
            console.log("success")
            setFormData({
                jobTitle: '',
                jobStatus: '',
                company: '',
                location: '',
                link: '',
                dateApplied: '',
                user: ''
            })
        } catch (e) {
            console.log(e.response.data)
        }
    }

    return (
        <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px', marginBottom: '1rem' }}>
            <h4>Enter information about a job you've applied to below</h4>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridJobTitle">
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="QA Engineer"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPortalLink">
                        <Form.Label>Application Portal Link or Job Posting</Form.Label>
                        <Form.Control
                            type="url"
                            placeholder="https://company.com/careers/jobPosting"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="formGridDateApplied">
                        <Form.Label>
                            Date Applied
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="date"
                                name="dateApplied"
                                value={formData.dateApplied}
                                onChange={handleChange}
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                </Row>

                <Row className='mb-3'>
                    <Form.Group as={Col} controlId="formGridCompany">
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Amazon"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridJobStatus">
                        <Form.Label>Job Status</Form.Label>
                        <Form.Select 
                            aria-label="Select job status"
                            name="jobStatus"
                            value={formData.jobStatus} 
                            onChange={handleChange}
                        >
                            <option>Application Status</option>
                            <option value="Applied">Applied</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Online Assessment">Online Assessment</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Seattle, WA"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </Form.Group>



                </Row>

                <Button variant="primary" type="submit" className='mb-3'>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AddJobForm;