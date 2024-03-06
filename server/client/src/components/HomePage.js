import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

function HomePage({ userSessionInfo }) {
    console.log(userSessionInfo)
    const isLoggedIn = userSessionInfo.status
    return (
        <div>
            <Container fluid style={{ backgroundColor: '#f8f9fa', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Container>
                    <h1 className="text-center">Welcome to JobQuest</h1>
                    <p className="lead text-center">
                        Track the stages of job applications, interview status, and outcomes.
                    </p>
                </Container>
            </Container>

            <Container style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                <h2 className="text-center" style={{ textDecoration: 'underline' }}>About</h2>
                <p className="lead text-center">
                    JobQuest is a web application designed to help students organize and manage their job search process efficiently.
                    Whether you're actively looking for a new job or just exploring opportunities, our platform provides tools to keep track of
                    your applications, monitor interview progress, and analyze outcomes.
                </p>
            </Container>

            <Container style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                <h2 className='text-center' style={{ paddingBottom: '2rem', textDecoration: 'underline' }} >Key Features</h2>
                <Row>
                    <Col md={4}>
                        <p className="text-center" style={{ fontSize: '20px', fontWeight: '600' }}>Track Applications</p>
                        <div style={{ maxWidth: '150px', margin: '0 auto' }}>
                            <Image src="track.png" fluid />
                        </div>
                        <p className="text-center" style={{ fontSize: '16px', paddingTop: '2em' }}>
                            Keep track of all your job applications in one place. Add job names and fields like status, update application statuses, and delete entries as needed.
                        </p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center" style={{ fontSize: '20px', fontWeight: '600' }}>Monitor Interview Progress</p>
                        <div style={{ maxWidth: '150px', margin: '0 auto' }}>
                            <Image src="interview.png" fluid />
                        </div>
                        <p className="text-center" style={{ fontSize: '16px', paddingTop: '2em' }}>
                            Monitor the progress of your interviews and follow-ups. Stay organized by updating interview statuses and recording important details.
                        </p>
                    </Col>
                    <Col md={4}>
                        <p className="text-center" style={{ fontSize: '20px', fontWeight: '600' }}>Analyze Outcomes</p>
                        <div style={{ maxWidth: '150px', margin: '0 auto' }}>
                            <Image src="graph.jpg" fluid />
                        </div>
                        <p className="text-center" style={{ fontSize: '16px', paddingTop: '2em' }}>
                            Analyze the outcomes of your job applications and interviews to improve your job search strategy. Gain insights into your successes and areas for improvement.
                        </p>
                    </Col>
                </Row>
            </Container>

            <Container fluid style={{ backgroundColor: '#2c313c', color: 'white', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Container>
                    <h2 className="text-center">Get Started Today</h2>
                    <p className="lead text-center">
                        Sign up now to start organizing your job search and land your dream job!
                    </p>
                    <div className="text-center">
                        {isLoggedIn === 'loggedin' ? (
                            <a href="/signout" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                                <Button variant="light">Sign Out</Button>
                            </a>
                        ) : (
                            <a href="/signin" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                                <Button variant="light">Sign In</Button>
                            </a>
                        )}
                    </div>
                </Container>
            </Container>
        </div>
    )
}

export default HomePage;
