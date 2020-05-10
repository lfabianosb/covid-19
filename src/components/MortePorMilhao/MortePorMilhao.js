import React, { useState, useEffect, useRef } from "react";
import Chartjs from "chart.js";
import { Spinner } from "react-bootstrap";
import style from "./style.module.css";

const urlCasos =
  "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalMapa?X-Parse-Application-Id=unAFkcaNDeXajurGB7LChj8SgQYS2ptm";

const urlEstados =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

function MortePorMilhao() {
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
          data.results.map(({ nome, letalidade }) => ({
            nome,
            letalidade: parseFloat(letalidade),
          }))
        );
      } catch (error) {
        console.error("error", error);
      }
    };

    const getEstados = async () => {
      try {
        const response = await fetch(urlEstados);
        const data = await response.json();
        setEstados(data.map(({ sigla, nome }) => ({ sigla, nome })));
      } catch (error) {
        console.error("error", error);
      }
    };

    getMortes();
    getEstados();
  }, []);

  useEffect(() => {
    if (mortes && estados) {
      mortes.forEach((morte) => {
        estados.forEach((estado) => {
          if (estado.nome === morte.nome) {
            morte.sigla = estado.sigla;
          }
        });
      });

      // Sort desc
      mortes.sort((a, b) => {
        if (a.letalidade < b.letalidade) {
          return 1;
        }
        if (a.letalidade > b.letalidade) {
          return -1;
        }
        return 0;
      });

      setLabels(mortes.map((morte) => morte.sigla));
      setData(mortes.map((morte) => morte.letalidade));
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

export default MortePorMilhao;
