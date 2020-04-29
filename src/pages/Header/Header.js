import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import style from "./style.module.css";

const Header = () => {
  return (
    <>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">CONORAVÍRUS // BRASIL</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link className={style.navLink} href="/">
                GERAL
              </Nav.Link>
              <Nav.Link className={style.navLink} href="/por-regiao">
                POR REGIÃO
              </Nav.Link>
              <Nav.Link className={style.navLink} href="/por-estado">
                POR ESTADO
              </Nav.Link>
              <Nav.Link className={style.navLink} href="/por-dia">
                POR DIA
              </Nav.Link>
              <Nav.Link className={style.navLink} href="/acumulado">
                ACUMULADO
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Router>
    </>
  );
};

export default Header;
