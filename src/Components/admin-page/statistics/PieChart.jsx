'use client'

import { Container, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";

import styles from "../../../../styles/pieChart.module.scss";

// Helper function to generate random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PieChart = ({ name, info }) => {
  const [data, setData] = useState(info);

  useEffect(() => {
    // Calculate total value of data
    const total = data?.reduce((acc, curr) => acc + curr.value, 0);

    // Calculate percentage and color for each data point
    const updatedData = data?.map((d) => ({
      ...d,
      percentage: (d.value / total) * 100,
      color: getRandomColor(),
    }));

    setData(updatedData);
  }, []);

  // Helper function to calculate the angle of each segment
  const calculateAngle = (percentage) => (percentage / 100) * 360;

  // Helper function to calculate the x and y coordinates of the arc
  const calculateArc = (angle, radius) => {
    const radians = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);
    return [x, y];
  };
  // Helper function to generate path data for the arc
  const generatePathData = (startAngle, endAngle, radius) => {
    const [startX, startY] = calculateArc(startAngle, radius);
    const [endX, endY] = calculateArc(endAngle, radius);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    const pathData = [
      `M ${startX} ${startY}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      `L 0 0`,
    ];
    return pathData.join(" ");
  };

  useEffect(() => {
    const total = data?.reduce((acc, curr) => acc + curr.value, 0);

    const colors = [
      "#502274",
      "#EEB4B3",
      "#77BFA3",
      "#EDEEC9",
      "#ECCE8E",
      "#9AC2C5",
      "#70B77E",
      "#E0A890",
      "#FF9F1C",
      "#CBF3F0",
      "#6CBEED",
      "#BD9391",
      "#5E548E",
      "#231942",
    ];

    const updatedData = data?.map((d, i) => ({
      ...d,
      percentage: (d.value / total) * 100,
      color: colors[i],
    }));

    setData(updatedData);
  }, []);

  return (
    <Container>
      <div style={{ fontSize: 24, fontWeight: "bold" }}>{name}</div>
      <div className={styles.pie}>
        <svg viewBox="-200 -200 400 400">
          {data?.map((d, i) => {
            const startAngle =
              i === 0
                ? 0
                : data
                    .slice(0, i)
                    .reduce(
                      (acc, curr) => acc + calculateAngle(curr.percentage),
                      0
                    );
            const endAngle = startAngle + calculateAngle(d.percentage);
            const pathData = generatePathData(startAngle, endAngle, 200);
            return (
              <path
                key={i}
                d={pathData}
                fill={d.color}
                transform="rotate(-90)"
              />
            );
          })}
        </svg>
        <Paper className={styles.metrics} elevation={10}>
          <div className={styles.table_name}>
            <div>Nr. borcane</div>
            <div>% borcane</div>
            <div>Nr. comenzi</div>
          </div>

          <div className={styles.metric}>
            {data?.map((d, i) => (
              <div key={i} className={styles.square_name}>
                <div
                  className={styles.square}
                  style={{ backgroundColor: d.color }}
                ></div>
                <div className={styles.name}>{d.name}</div>
                <div className={styles.labels}>
                  <div>{d.qty}</div>
                  <div>{d.percentage?.toFixed(2)}%</div>
                </div>

                <div>{d.orders} </div>
              </div>
            ))}
          </div>
        </Paper>
      </div>
    </Container>
  );
};

export default PieChart;
