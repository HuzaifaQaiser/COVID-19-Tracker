import React from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Chart, registerables } from "chart.js";
import { Typography } from "@mui/material";
import "../Loader/Loader.css";
Chart.register(...registerables);

const ChartCases = ({
  casesCard,
  recoveredCard,
  deathCard,
  loader,
  setLoader,
}) => {
  const chartData = async () => {
    try {
      const { data } = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=365"
      );
      setLoader(false);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const {
    data: chartApiData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Chart"],
    queryFn: chartData,
  });

  if (error) {
    alert("There are some issues our team has encountered soon");
  }

  if (isLoading || loader) {
    return <span className="loader"></span>;
  }

  const xValues = Object.keys(chartApiData?.cases || {});

  const GraphData = {
    labels: xValues,
    datasets: [
      casesCard
        ? {
            data: Object.values(chartApiData?.cases || {}),
            borderColor: "red",
            fill: true,
          }
        : "empty",
      recoveredCard
        ? {
            data: Object.values(chartApiData?.recovered || {}),
            borderColor: "green",
            fill: true,
          }
        : "empty",
      deathCard
        ? {
            data: Object.values(chartApiData?.deaths || {}),
            borderColor: "#ed752f",
            fill: true,
          }
        : "empty",
    ],
  };

  const mycolor = casesCard
    ? "red"
    : recoveredCard
    ? "green"
    : deathCard
    ? "#ed752f"
    : "black";

  const options = {
    plugins: { legend: { display: false } },
  };

  return (
    <div
      style={{
        height: "280px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "30px 0 30px 0",
        width: "100%",
        color: mycolor,
      }}
    >
      <Typography my={1} variant="h4" textAlign={"center"}>
        Graph
      </Typography>
      <Line data={GraphData} options={options} />
    </div>
  );
};

export default ChartCases;
