import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" style={{ paddingTop: '1em', paddingRight: '0em' }}>
        <Container>
          <Navbar.Brand href="#home" className="mr-auto">Job Application Manager</Navbar.Brand>
          <Nav className="justify-content-end" style={{ gap: '3em' }}>
            <Nav.Link href="#Homepage" style={{ fontWeight: 600, fontSize: '18px', color: 'white' }}>Home</Nav.Link>
            <Nav.Link href="#Jobs" style={{ fontWeight: 600, fontSize: '18px', color: 'white' }}>Jobs</Nav.Link>
            <Nav.Link href="#Analytics" style={{ fontWeight: 600, fontSize: '18px', color: 'white' }}>Analytics</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default ColorSchemesExample;
