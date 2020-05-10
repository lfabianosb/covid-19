import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Acumulado } from "../../components/Acumulado";
import { Geral } from "../../components/Geral";
import { PorRegiao } from "../../components/PorRegiao";
import { NovosPorDia } from "../../components/NovosPorDia";
import { PorEstado } from "../../components/PorEstado";
import { PorDia } from "../../components/PorDia";
import { MortePorMilhao } from "../../components/MortePorMilhao";

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
        <Route path="/por-dia">
          <PorDia />
        </Route>
        <Route path="/morte-habitantes">
          <MortePorMilhao />
        </Route>
      </Switch>
    </Router>
  );
};

export default Body;
