'use client'

import { Box, Container, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";

import styles from "../../../../styles/barChart.module.scss";

export const BarChart = ({ data }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const chartLabels = data.map((item) => item.title);
    const chartValues = data.map((item) => item.salesCount);

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: "Sales Count",
          data: chartValues,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  const getYaxis = () => {
    if (!Object.keys(chartData).length > 0) return;
    let yaxis = chartData?.datasets[0]?.data.sort();
    let uniqueYaxis = [...new Set(yaxis)];

    return uniqueYaxis;
  };

  const getHeightOfBar = (value) => {
    if (!Object.keys(chartData).length > 0) return;
    let yaxis = chartData?.datasets[0]?.data.sort();
    let uniqueYaxis = [...new Set(yaxis)];
    let max = uniqueYaxis[uniqueYaxis.length - 1];
    let height = (value / max) * 200;
    return height;
  };

  return (
    <Box className={styles.container}>
      <div style={{ height: "500px", width: "900px" }}>
        {Object.keys(chartData).length > 0 && (
          <svg viewBox="0 0 600 300">
            <g>
              {/* Draw the X-axis */}
              <line
                x1="50"
                y1="250"
                x2="550"
                y2="250"
                stroke="black"
                strokeWidth="2"
              />
              {chartData?.labels?.map((label, index) => (
                <g key={index}>
                  <text x={50 + index * 50} y="270" fontSize="14">
                    {/* {label}
                     */}
                    {index}
                  </text>
                  <line
                    x1={50 + index * 50}
                    y1="250"
                    x2={50 + index * 50}
                    y2="255"
                    stroke="black"
                    strokeWidth="2"
                  />
                </g>
              ))}
              {/* Draw the Y-axis */}
              <line
                x1="50"
                y1="250"
                x2="50"
                y2="50"
                stroke="black"
                strokeWidth="2"
              />
              {getYaxis().map((value, index) => (
                <g key={index}>
                  <text x="35" y={250 - index * 50} fontSize="14">
                    {value}
                  </text>
                  <line
                    x1="50"
                    y1={250 - index * 50}
                    x2="45"
                    y2={250 - index * 50}
                    stroke="black"
                    strokeWidth="2"
                  />
                </g>
              ))}
              {/* Draw the bars */}
              {chartData?.datasets[0].data.map((value, index) => (
                <rect
                  key={index}
                  x={50 + index * 50}
                  // y={250 - value * 25}
                  y={250 - getHeightOfBar(value)}
                  width="40"
                  height={getHeightOfBar(value)}
                  // height={value * 25}
                  fill="rgba(75,192,192,0.4)"
                  stroke="black"
                  strokeWidth="2"
                />
              ))}
            </g>
          </svg>
        )}
      </div>
      {Object.keys(chartData).length > 0 && (
        <Paper className={styles.paper}>
          {chartData?.labels?.map((label, index) => (
            <div key={index} className={styles.labels}>
              <span>{index}</span>
              <span>{label}</span>
            </div>
          ))}
        </Paper>
      )}
    </Box>
  );
};
