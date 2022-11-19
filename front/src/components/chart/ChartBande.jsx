import React, { useState} from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";
import "./chartFrequence.css";
import CustomToolTip from "./CustomToolTip";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function ChartPerformance() {
    const [data, setData] = useState(null);
    const [searchParams] = useSearchParams();

    let deptId = searchParams.get("id")
    React.useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/departement/num=0" + deptId)
            .then((response) => {
                setData(response.data.json());
            });
    }, []);


  return (
    <div className="chartPerformance">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width="90%"
          height={500}
          data={data}
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
