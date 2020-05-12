import React, { useState, useEffect, useRef } from "react";
import Chartjs from "chart.js";
import { Spinner } from "react-bootstrap";
import style from "./style.module.css";

const urlCasos =
  "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalMapa?X-Parse-Application-Id=unAFkcaNDeXajurGB7LChj8SgQYS2ptm";

const urlEstados =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

const urlPopulacao =
  "https://servicodados.ibge.gov.br/api/v1/projecoes/populacao";

function PercentualPopulacao() {
  const [labels, setLabels] = useState(null);
  const [mortes, setMortes] = useState(null);
  const [estados, setEstados] = useState(null);
  const [data, setData] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    const getMortes = async () => {
      try {
        const response = await fetch(urlCasos);
        const data = await response.json();
        setMortes(
          data.results.map(({ nome, qtd_obito }) => ({ nome, qtd_obito }))
        );
      } catch (error) {
        console.error("error", error);
      }
    };

    const getPopulacao = async (id) => {
      try {
        const response = await fetch(`${urlPopulacao}/${id}`);
        const data = await response.json();
        return data.projecao.populacao;
      } catch (error) {
        console.error("error", error);
      }
    };

    const getEstados = async () => {
      try {
        const response = await fetch(urlEstados);
        const data = await response.json();

        const ufs = Promise.all(
          data.map(async ({ id, sigla, nome }) => {
            const populacao = await getPopulacao(id);
            return { id, sigla, nome, populacao };
          })
        );
        ufs.then((data) => setEstados(data));
      } catch (error) {
        console.error("error", error);
      }
    };

    getMortes();
    getEstados();
  }, []);

  useEffect(() => {
    if (mortes && estados) {
      estados.forEach((estado) => {
        mortes.forEach((morte) => {
          if (estado.nome === morte.nome) {
            estado.obitos = morte.qtd_obito;
          }
        });
      });

      // Sort desc
      estados.sort((a, b) => {
        if (a.obitos / a.populacao < b.obitos / b.populacao) {
          return 1;
        }
        if (a.obitos / a.populacao > b.obitos / b.populacao) {
          return -1;
        }
        return 0;
      });

      setLabels(estados.map((estado) => estado.sigla));
      setData(
        estados.map((estado) =>
          parseFloat((estado.obitos / estado.populacao) * 1000000).toFixed(2)
        )
      );
    }
  }, [mortes, estados]);

  useEffect(() => {
    if (chartContainer && chartContainer.current && labels && data) {
      new Chartjs(chartContainer.current, {
        type: "horizontalBar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Mortes",
              data: data,
              backgroundColor: "rgba(235, 54, 54, 0.5)",
              borderWidth: 1,
            },
          ],
        },

        options: {
          maintainAspectRatio: false,
          animation: {
            duration: 2000, // general animation time
          },
          responsive: true,
          title: {
            display: true,
            text: "MORTES POR MILHÃO DE HABITANTES",
          },
          scales: {
            xAxes: [
              {
                stacked: true,
              },
            ],
            yAxes: [
              {
                stacked: true,
              },
            ],
          },
        },
      });
    }
  }, [chartContainer, labels, data]);

  if (!data) {
    return (
      <div className={style.container}>
        <div className={style.item}>
          <Spinner animation="grow" />
          <br />
          <span>Consultando dados...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <canvas id="myChart" ref={chartContainer} />
    </div>
  );
}

export default PercentualPopulacao;
