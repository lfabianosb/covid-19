import React, { useState, useEffect, useRef } from "react";
import Chartjs from "chart.js";
import style from "./style.module.css";

const url =
  "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalEstado";

function PorEstado() {
  const [labels, setLabels] = useState(null);
  const [casos, setCasos] = useState(null);
  const [mortes, setMortes] = useState(null);
  const [data, setData] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(
          data.map(({ nome, casosAcumulado, obitosAcumulado }) => ({
            estado: nome,
            confirmado: casosAcumulado,
            obito: obitosAcumulado,
          }))
        );
      } catch (error) {
        console.error("error", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      // Sort desc
      data.sort((a, b) => {
        if (a.confirmado < b.confirmado) {
          return 1;
        }
        if (a.confirmado > b.confirmado) {
          return -1;
        }
        return 0;
      });

      setLabels(data.map(({ estado }) => estado));
      setCasos(data.map(({ confirmado }) => confirmado));
      setMortes(data.map(({ obito }) => obito));
    }
  }, [data]);

  useEffect(() => {
    if (chartContainer && chartContainer.current && labels && casos && mortes) {
      new Chartjs(chartContainer.current, {
        type: "horizontalBar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Mortes",
              data: mortes,
              backgroundColor: "rgba(255, 99, 132, 0.7)",
              borderWidth: 1,
            },
            {
              label: "Casos",
              data: casos,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
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
            text: "CASOS POR ESTADO",
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
  }, [chartContainer, labels, casos, mortes]);

  return (
    <div className={style.container}>
      <canvas id="myChart" ref={chartContainer} />
    </div>
  );
}

export default PorEstado;
