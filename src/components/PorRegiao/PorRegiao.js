import React, { useState, useEffect, useRef } from "react";
import Chartjs from "chart.js";
import style from "./style.module.css";

const url =
  "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalRegiao?X-Parse-Application-Id=unAFkcaNDeXajurGB7LChj8SgQYS2ptm";

function PorRegiao() {
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setLabels(data.results.map((result) => result.nome));
        setData(
          data.results.map((result) => {
            if (result.percent) {
              return result.percent
                .replace(",", ".")
                .substring(0, result.percent.length - 1);
            }
            return 0;
          })
        );
      } catch (error) {
        console.error("error", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (chartContainer && chartContainer.current && labels && data) {
      new Chartjs(chartContainer.current, {
        type: "pie",
        data: {
          //Bring in data
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "#2ecc71",
                "#3498db",
                "#95a5a6",
                "#9b59b6",
                "#f1c40f",
              ],
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
            text: "CASOS POR REGIÃO",
          },
        },
      });
    }
  }, [chartContainer, data, labels]);

  return (
    <div className={style.container}>
      <canvas id="myChartRegiao" ref={chartContainer} />
    </div>
  );
}

export default PorRegiao;
