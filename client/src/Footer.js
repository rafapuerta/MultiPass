import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

const Footer = () => {
    return (
        <>
        <Navbar fixed="bottom" bg="dark" variant="dark">
            <Nav className="w-100 clearfix">
            <p className="float-left">Copyright © 2020 - Todos los derechos reservados - MultiPass S.L.</p>
            <p className="float-right">Trabajo para Code4Jobs</p>
            </Nav>
      </Navbar>
      </>
    )
}

export default Footer