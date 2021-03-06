import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import style from "./style.module.css";

const url =
  "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalGeralApi";

const Geral = () => {
  const [geral, setGeral] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setGeral({
          confirmados: parseInt(data.confirmados.total).toLocaleString(),
          recuperados: parseInt(data.confirmados.recuperados).toLocaleString(),
          obitos: parseInt(data.obitos.total).toLocaleString(),
          letalidade: data.obitos.letalidade,
          dt_atualizacao: new Date(data.dt_updated).toLocaleString(),
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
        <div className={style.number}>{geral.confirmados}</div> Casos
        Confirmados
      </div>
      <div className={style.item}>
        <div className={style.number}>{geral.recuperados}</div> Recuperados
      </div>
      <div className={style.item}>
        <div className={style.number}>{geral.obitos}</div> Óbitos
      </div>
      <div className={style.item}>
        <div className={style.number}>{geral.letalidade}%</div> Letalidade
      </div>
      <div className={style.atualizacao}>
        Atualizado em {geral.dt_atualizacao}
      </div>
    </div>
  );
};

export default Geral;
