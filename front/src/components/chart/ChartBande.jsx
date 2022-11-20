import React, { useState, useEffect} from "react";
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
import {useParams} from "react-router-dom";
import DepartementService from "../../services/departement.service";
import Test from "./test";

function ChartPerformance() {
    const [data, setData] = useState(null);
    let deptId  = useParams().id;
    useEffect(() => {
        DepartementService.getDepartementChartById(deptId).then(r => setData(r.data));
    }, []);


  return (
    <div className="chartPerformance">
      <Test data={data}/>
    </div>
  );
}
export default ChartPerformance;
