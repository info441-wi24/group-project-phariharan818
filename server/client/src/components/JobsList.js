import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup';

function JobsList() {
    const jobsArray = [
        {
            jobName: "Software Engineer",
            dateApplied: new Date().toLocaleDateString(),
            jobStatus: "Under Review",
            company: "Epic",
            location: "Verona, WI",
            applicationLink: "https://epic.avature.net/Careers/FolderDetail/Software-Developer/740"
        },
        {
            jobName: "Software Developer",
            dateApplied: new Date().toLocaleDateString(),
            jobStatus: "No Longer Under Consideration",
            company: "Datadog",
            location: "Seattle, WA",
            applicationLink: "https://careers.datadoghq.com/detail/5744656/?gh_jid=5744656"
        },
        {
            jobName: "Sales Engineer",
            dateApplied: new Date().toLocaleDateString(),
            jobStatus: "Under Review",
            company: "Lutron",
            location: "Coopersburg, PA",
            applicationLink: "https://careers.lutron.com/jobs/3318?lang=en-us"
        }
    ]

    return (
        <div>
            <Row lg={3}>
                {jobsArray &&
                    jobsArray.map((job) => {
                        const { jobName, dateApplied, jobStatus, company, location, applicationLink } =
                            job;
                        return (
                            <Col className="d-flex">
                                <Card border="primary" style={{ width: '18rem' }} className="flex-fill" key={applicationLink}>
                                    {/* fix key later */}
                                    <Card.Body>
                                        <Card.Title>{jobName}</Card.Title>
                                        <Card.Link href={applicationLink}>Link to Posting</Card.Link>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>Applied: {dateApplied}</ListGroup.Item>
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