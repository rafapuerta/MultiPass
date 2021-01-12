import { Navbar, Nav } from "react-bootstrap"

const Footer = () => {
    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Nav>
            <Navbar.Text>Copyright © 2020 - Todos los derechos reservados - MultiPass S.L.</Navbar.Text>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Trabajo para <a href="https://www.code4jobs.com/">Code4Jobs</a></Navbar.Text>
          </Navbar.Collapse>
      </Navbar>
      </>
    )
}

export default Footer