import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Acumulado } from "../../components/Acumulado";
import { Geral } from "../../components/Geral";
import { PorRegiao } from "../../components/PorRegiao";
import { NovosPorDia } from "../../components/NovosPorDia";
import { PorEstado } from "../../components/PorEstado";

const Body = () => {
  return (
    <Router>
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
        <Route path="/por-estado">
          <PorEstado />
        </Route>
      </Switch>
    </Router>
  );
};

export default Body;
