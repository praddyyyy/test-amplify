import React from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

const NavBarComponent = () => {
    return (
        <Navbar bg="dark" variant={'dark'} expand="lg" style={{height: '60px', position: 'fixed', width: '100%', top: 0, zIndex:10}}>
            <Container fluid>
                <Navbar.Brand href="#home">DreamikAI</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"  >
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Media Synthesis</Nav.Link>
                        <Nav.Link href="#comics">Comics</Nav.Link>
                        <Nav.Link href="#animation">Animation</Nav.Link>
                        <Nav.Link href="#apis">APIs</Nav.Link>
                        <Nav.Link href="#royalty">Royalty</Nav.Link>
                        <Nav.Link href="#docs">Docs</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Button variant="outline-success">Create Free Account</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBarComponent