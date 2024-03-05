import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" style={{ paddingTop: '1em', paddingRight: '0em' }}>
        <Container>
          <Navbar.Brand href="#home" className="mr-auto">Job Application Manager</Navbar.Brand>
          <Nav className="justify-content-end" style={{ gap: '3em' }}>
            <NavLink to="/HomePage" style={{ fontWeight: 600, fontSize: '18px', color: 'white' }}>Home</NavLink>
            <NavLink to="/Jobs" style={{ fontWeight: 600, fontSize: '18px', color: 'white' }}>Jobs</NavLink>
            <NavLink to="/signin" style={{ fontWeight: 600, fontSize: '18px', color: 'white' }}>Sign In</NavLink>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default NavigationBar;
