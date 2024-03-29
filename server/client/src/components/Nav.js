import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function NavigationBar({ userSessionInfo }) {
  const isLoggedIn = userSessionInfo.status
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" style={{ paddingTop: '1em', paddingRight: '0em' }}>
        <Container>
          <Navbar.Brand href="#home" className="mr-auto">JobQuest</Navbar.Brand>
          <Nav className="justify-content-end" style={{ gap: '3em' }}>
            <NavLink to="/HomePage" style={{ fontWeight: 600, fontSize: '18px', color: 'white' }}>Home</NavLink>
            <NavLink to="/Jobs" style={{ fontWeight: 600, fontSize: '18px', color: 'white' }}>Jobs</NavLink>
            {isLoggedIn === 'loggedin' ? (
              <a href="/signout" style={{ fontWeight: 600, fontSize: '18px', color: 'white' }}>Sign Out</a>
            ) : (
              <a href="/signin" style={{ fontWeight: 600, fontSize: '18px', color: 'white' }}>Sign In</a>
            )}
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default NavigationBar;
