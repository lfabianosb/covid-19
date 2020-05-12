import React, { useState, useEffect, useRef } from "react";
import Chartjs from "chart.js";
import style from "./style.module.css";

const url =
  "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalAcumulo?X-Parse-Application-Id=unAFkcaNDeXajurGB7LChj8SgQYS2ptm";

function Acumulado() {
  const [casos, setCasos] = useState(null);
  const [mortes, setMortes] = useState(null);
  const [labels, setLabels] = useState(null);
  const [data, setData] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(
          data.results.map(({ label, qtd_confirmado, qtd_obito }) => ({
            label,
            data: "2020-" + label.substring(3, 5) + "-" + label.substring(0, 2),
            confirmados: qtd_confirmado,
            obitos: qtd_obito,
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
      // Sort asc
      data.sort((a, b) => {
        if (Date.parse(a.data) > Date.parse(b.data)) {
          return 1;
        }
        if (Date.parse(a.data) < Date.parse(b.data)) {
          return -1;
        }
        return 0;
      });
      setLabels(data.map(({ label }) => label));
      setCasos(data.map(({ confirmados }) => confirmados));
      setMortes(data.map(({ obitos }) => obitos));
    }
  }, [data]);

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
