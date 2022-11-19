import React, { useState, useEffect } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    BarChart,
    Bar,
    // CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Area
  } from "recharts";
import "./chartFrequence.css";
import CustomToolTip from "./CustomToolTip";
import fakeData from "../../data/fakeData2.json";

function ChartPerformance() {
  //const [data, setData] = useState(fakeData);
  /* const [data, setData] = useState();

  function fetchData() {
    return fetch("http://127.0.0.1:3000/api/performance")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Unable to contact the server");
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error);
        setData(fakeData);
      });
  } */

/*   console.log(data);

  useEffect(() => {
    fetchData();
  }, []); */
  return (
    <div className="chartPerformance">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width="90%"
          height={500}
          data={fakeData}
          //stackOffset="expand"
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <XAxis dataKey="ID_INTERV_FREQ" name="Bande de fréquence" label={{ value: 'Bande de fréquences', position: 'center', dy:15 }} />
          <YAxis label={{ value: 'Nombre d\'enregistrements', angle: -90, position: 'center', dx:-15 }}/>
          <Tooltip content={<CustomToolTip />} cursor="none"/>
          <Bar
           cursor={"pointer"}
           dataKey="Number"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
            id="carea"
            name="Nombre d'enregistrements"
            onClick={() => alert('Bar clicked ')}
            // onMouseOver={() => alert()}
          />
        </BarChart>
       
      </ResponsiveContainer>
    </div>
  );
}
export default ChartPerformance;
