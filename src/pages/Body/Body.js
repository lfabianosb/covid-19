import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Acumulado } from "../../components/Acumulado";
import { Geral } from "../../components/Geral";
import { PorRegiao } from "../../components/PorRegiao";
import { PorEstado } from "../../components/PorEstado";
import { PorDia } from "../../components/PorDia";
import { Habitantes } from "../../components/Habitantes";

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
        <Route path="/por-estado">
          <PorEstado />
        </Route>
        <Route path="/por-dia">
          <PorDia />
        </Route>
        <Route path="/morte-habitantes">
          <Habitantes />
        </Route>
      </Switch>
    </Router>
  );
};

export default Body;
