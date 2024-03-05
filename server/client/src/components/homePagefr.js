import React from 'react';
import JobsList from './JobsList';
import AddJobForm from './AddJobForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function HomePage() {
    return (
        <div>
            <Container fluid style={{ backgroundColor: '#f8f9fa', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Container>
                    <h1 className="text-center">Job Application Manager</h1>
                    <p className="lead text-center">
                        Track the stages of job applications, interview status, and outcomes.
                    </p>
                </Container>
            </Container>
            <Container>
                <Row className="mb-5">
                    <Col md={6}>
                        <AddJobForm />
                    </Col>
                    <Col md={6}>
                        <Image src="/images/job-search.jpg" fluid />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <JobsList />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;
