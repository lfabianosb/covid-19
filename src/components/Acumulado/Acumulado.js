import React, { useState, useEffect, useRef } from "react";
import Chartjs from "chart.js";
import style from "./style.module.css";

const url =
  "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalCasos";

function Acumulado() {
  const [casos, setCasos] = useState(null);
  const [mortes, setMortes] = useState(null);
  const [labels, setLabels] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setLabels(data.dias.map(({ _id }) => _id));
        setCasos(data.dias.map(({ casosAcumulado }) => casosAcumulado));
        setMortes(data.dias.map(({ obitosAcumulado }) => obitosAcumulado));
      } catch (error) {
        console.error("error", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (chartContainer && chartContainer.current && labels && casos && mortes) {
      new Chartjs(chartContainer.current, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Casos",
              data: casos,
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
            {
              label: "Mortes",
              data: mortes,
              backgroundColor: ["rgba(255, 99, 132, 0.4)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },

        options: {
          animation: {
            duration: 2000,
          },
          responsive: true,
          title: {
            display: true,
            text: "ACUMULADO",
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

export default Acumulado;
