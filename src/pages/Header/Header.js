import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Acumulado } from "../../components/Acumulado";
import { Geral } from "../../components/Geral";
import { Home } from "../../pages/Home";

import style from "./style.module.css";

const Header = () => {
  return (
    <Router>
      <header class={style.header}>
        <nav>
          <ul class={style.nav_links}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/geral">Geral</Link>
            </li>
            <li>
              <Link to="/por-regiao">Casos por região</Link>
            </li>
            <li>
              <Link to="/novos-por-dia">Casos novos por dia</Link>
            </li>
            <li>
              <Link to="/acumulado">Acumulado</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/acumulado">
          <Acumulado />
        </Route>
        <Route path="/geral">
          <Geral />
        </Route>
      </Switch>
    </Router>
  );
};

export default Header;
