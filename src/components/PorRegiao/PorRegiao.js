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
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)",
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
