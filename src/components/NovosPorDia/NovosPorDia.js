import React, { useState, useEffect, useRef } from "react";
import Chartjs from "chart.js";
import style from "./style.module.css";

const url =
  "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalDias?X-Parse-Application-Id=unAFkcaNDeXajurGB7LChj8SgQYS2ptm";

function NovosPorDia() {
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setLabels(data.results.map((result) => result.label));
        setData(data.results.map((result) => result.qtd_confirmado));
      } catch (error) {
        console.error("error", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (chartContainer && chartContainer.current && labels && data) {
      new Chartjs(chartContainer.current, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Novos Casos",
              data: data,
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
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
            text: "CASOS NOVOS POR DIA",
          },
        },
      });
    }
  }, [chartContainer, labels, data]);

  return (
    <div className={style.container}>
      <canvas id="myChart" ref={chartContainer} />
    </div>
  );
}

export default NovosPorDia;
