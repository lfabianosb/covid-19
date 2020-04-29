import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
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
    return (
      <div className={style.container}>
        <div className={style.item}>
          <Spinner animation="grow" />
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.item}>
        <div className={style.number}>{geral.total}</div> Casos Confirmados
      </div>
      <div className={style.item}>
        <div className={style.number}>{geral.obitos}</div> Óbitos
      </div>
      <div className={style.item}>
        <div className={style.number}>{geral.letalidade}</div> Letalidade
      </div>
    </div>
  );
};

export default Geral;
