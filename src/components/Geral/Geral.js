import React, { useState, useEffect } from "react";
import style from "./style.module.css";

const url =
  "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalGeral?X-Parse-Application-Id=unAFkcaNDeXajurGB7LChj8SgQYS2ptm";

const Geral = () => {
  const [geral, setGeral] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("data", data.results);

        setGeral({
          total: data.results[0].total_confirmado,
          obitos: data.results[0].total_obitos,
          letalidade: data.results[0].total_letalidade,
        });
      } catch (error) {
        console.error("error", error);
      }
    };
    getData();
  }, []);

  if (!geral) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={style.container}>
      <h1>Total: {geral.total}</h1>
      <h1>Óbitos: {geral.obitos}</h1>
      <h1>Letalidade: {geral.letalidade}</h1>
    </div>
  );
};

export default Geral;
