import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Acumulado } from "../../components/Acumulado";
import { Geral } from "../../components/Geral";
import { PorRegiao } from "../../components/PorRegiao";
import { NovosPorDia } from "../../components/NovosPorDia";

import style from "./style.module.css";

const Header = () => {
  return (
    <Router>
      <header className={style.header}>
        <img
          className={style.logo}
          src="images/logo-app.png"
          width="300"
          alt="Logo"
        />
        <nav>
          <ul className={style.nav_links}>
            <li>
              <Link to="/">Geral</Link>
            </li>
            <li>
              <Link to="/por-regiao">Por região</Link>
            </li>
            <li>
              <Link to="/novos-por-dia">Novos por dia</Link>
            </li>
            <li>
              <Link to="/acumulado">Acumulado</Link>
            </li>
          </ul>
        </nav>
      </header>
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
  );
};

export default Header;
