import React, { useState, useEffect, useRef } from "react";
import Chartjs from "chart.js";
import { Spinner } from "react-bootstrap";
import style from "./style.module.css";

const url =
  "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalEstado";

function MortePorMilhao() {
  const [labels, setLabels] = useState(null);
  const [mortes, setMortes] = useState(null);
  const [data, setData] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url, {
          referrer: "https://covid.saude.gov.br/",
        });
        const data = await response.json();
        setData(
          data.map(({ nome, incidenciaObito }) => ({
            nome,
            letalidade: parseFloat(incidenciaObito.replace(",", ".")),
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
        if (a.letalidade < b.letalidade) {
          return 1;
        }
        if (a.letalidade > b.letalidade) {
          return -1;
        }
        return 0;
      });

      console.log("data", data);

      setLabels(data.map(({ nome }) => nome));
      setMortes(data.map(({ letalidade }) => letalidade));
    }
  }, [data]);

  useEffect(() => {
    if (chartContainer && chartContainer.current && labels && mortes) {
      new Chartjs(chartContainer.current, {
        type: "horizontalBar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Mortes",
              data: mortes,
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
            text: "MORTES POR CEM MIL HABITANTES",
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
  }, [chartContainer, labels, mortes]);

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
