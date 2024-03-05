import React, { useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

function SearchFilter() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterKeyword, setFilterKeyword] = useState({
        dateBegin: '',
        dateEnd: '',
        jobStatus: ''
    })

    async function handleSearchAndFilter(event) {
        event.preventDefault()

    }

    return (
        <Row className="mb-3">
            <Col md={6}>
                <Form className="d-flex" onSubmit={handleSearchAndFilter}>
                    <Form.Group as={Col} controlId="searchAndFilterGrid" className="me-2">
                        <FormControl onChange={(e) => setSearchTerm(e.target.value)}
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form.Group>
                    <Form.Group controlId="filterGridJobStatus" className="me-2">
                        <Form.Select
                            aria-label="Select job status"
                            name="jobStatus"
                            onChange={(e) => setFilterKeyword(e.target.value)}
                        >
                            <option>Filter by Application Status</option>
                            <option value="Applied">Applied</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Online Assessment">Online Assessment</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="outline-success" type='submit'>Search</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default SearchFilter;