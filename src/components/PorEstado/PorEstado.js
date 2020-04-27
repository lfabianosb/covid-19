import React, { useState, useEffect, useRef } from "react";
import Chartjs from "chart.js";
import style from "./style.module.css";

const url =
  "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalMapa?X-Parse-Application-Id=unAFkcaNDeXajurGB7LChj8SgQYS2ptm";

function PorEstado() {
  const [labels, setLabels] = useState(null);
  const [casos, setCasos] = useState(null);
  const [mortes, setMortes] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setLabels(data.results.map((result) => result.nome));
        setCasos(data.results.map((result) => result.qtd_confirmado));
        setMortes(data.results.map((result) => result.qtd_obito));
      } catch (error) {
        console.error("error", error);
      }
    };
    getData();
  }, []);

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
      <canvas id="myChartPorEstado" ref={chartContainer} />
    </div>
  );
}

export default PorEstado;
