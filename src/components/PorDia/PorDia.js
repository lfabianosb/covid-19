import React, { useState, useEffect, useRef } from "react";
import Chartjs from "chart.js";
import style from "./style.module.css";

const url =
  "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalAcumulo?X-Parse-Application-Id=unAFkcaNDeXajurGB7LChj8SgQYS2ptm";

function PorDia() {
  const [casos, setCasos] = useState(null);
  const [mortes, setMortes] = useState(null);
  const [labels, setLabels] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setLabels(data.results.map((result) => result.label).slice(1));
        setCasos(
          data.results
            .map((result, index) => {
              if (index > 0) {
                return (
                  result.qtd_confirmado - data.results[index - 1].qtd_confirmado
                );
              }
              return null;
            })
            .slice(1)
        );
        setMortes(
          data.results
            .map((result, index) => {
              if (index > 0) {
                return result.qtd_obito - data.results[index - 1].qtd_obito;
              }
              return null;
            })
            .slice(1)
        );
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
          //Bring in data
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
            duration: 2000, // general animation time
          },
          responsive: true,
          title: {
            display: true,
            text: "CASOS E MORTES POR DIA",
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

export default PorDia;
