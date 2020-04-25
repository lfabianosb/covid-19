import React, { useState, useEffect, useRef } from "react";
import Chartjs from "chart.js";

const url =
  "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalAcumulo?X-Parse-Application-Id=unAFkcaNDeXajurGB7LChj8SgQYS2ptm";

function Acumulado() {
  const [casos, setCasos] = useState(null);
  const [mortes, setMortes] = useState(null);
  const [datas, setDatas] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setDatas(data.results.map((result) => result.label));
        setCasos(data.results.map((result) => result.qtd_confirmado));
        setMortes(data.results.map((result) => result.qtd_obito));
      } catch (error) {
        console.error("error", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (chartContainer && chartContainer.current && datas && casos && mortes) {
      new Chartjs(chartContainer.current, {
        type: "line",
        data: {
          //Bring in data
          labels: datas,
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
            text: "COVID-19",
          },
        },
      });
    }
  }, [chartContainer, datas, casos, mortes]);

  return (
    <div>
      <canvas id="myChart" ref={chartContainer} />
    </div>
  );
}

export default Acumulado;
