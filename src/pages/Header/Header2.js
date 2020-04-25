import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Acumulado } from "../../components/Acumulado";
import { Geral } from "../../components/Geral";
import { PorRegiao } from "../../components/PorRegiao";
import { NovosPorDia } from "../../components/NovosPorDia";

const Header2 = () => {
  return (
    <>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">CONORAVÍRUS // BRASIL</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">GERAL</Nav.Link>
              <Nav.Link href="/por-regiao">POR REGIÃO</Nav.Link>
              <Nav.Link href="/novos-por-dia">NOVOS POR DIA</Nav.Link>
              <Nav.Link href="/acumulado">ACUMULADO</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/">
            <Geral />
          </Route>
          <Route path="/acumulado">
            <Acumulado />
          </Route>
          <Route path="/por-regiao">
            <PorRegiao />
          </Route>
          <Route path="/novos-por-dia">
            <NovosPorDia />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Header2;
