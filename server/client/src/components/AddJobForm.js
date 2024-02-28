import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import axios from 'axios'

function AddJobForm() {
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobStatus: '',
        company: '',
        location: '',
        link: ''
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
            jobTitle: formData.jobTitle,
            jobStatus: formData.jobStatus,
            company: formData.company,
            location: formData.location,
            link: formData.link
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/jobs`, jobData);
            console.log("success")
            setFormData({
                jobTitle: '',
                jobStatus: '',
                company: '',
                location: '',
                link: ''
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px', marginBottom:  '1rem'}}>
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
                        <Form.Control
                            required
                            type="text"
                            placeholder="Under Review"
                            name="jobStatus"
                            value={formData.jobStatus}
                            onChange={handleChange}
                        />
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