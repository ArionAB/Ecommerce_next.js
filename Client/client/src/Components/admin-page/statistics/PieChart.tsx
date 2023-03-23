import React, { useState, useEffect } from "react";

const PieChart = () => {
  const [data, setData] = useState([
    { name: "Apples", value: 5 },
    { name: "Oranges", value: 7 },
    { name: "Bananas", value: 3 },
  ]);

  useEffect(() => {
    // Calculate total value of data
    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    // Calculate percentage and color for each data point
    const updatedData = data.map((d) => ({
      ...d,
      percentage: (d.value / total) * 100,
      color: getRandomColor(),
    }));

    setData(updatedData);
  }, []);

  // Helper function to generate random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div style={{ position: "relative", width: 400, height: 400 }}>
      {data.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            clipPath:
              "polygon(50% 50%, 50% 0, 0 0, 0 50%, ${i * 90}deg ${i * 90}deg)",
            // backgroundColor: d.color,
            transform: "rotate(-90deg)",
          }}
        ></div>
      ))}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: "bold" }}>Pie Chart</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {data.map((d, i) => (
            <div
              key={i}
              style={{ margin: "0 10px", textAlign: "left", width: 100 }}
            >
              <div
                style={{
                  display: "inline-block",
                  width: 20,
                  height: 20,
                  //   backgroundColor: d.color,
                  marginRight: 5,
                }}
              ></div>
              <div style={{ display: "inline-block" }}>{d.name}</div>
              <div style={{ display: "inline-block", float: "right" }}>
                {/* {d.percentage.toFixed(2)}% */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
