import React, { useState, useEffect} from "react";
import "./chartFrequence.css";
import {useParams} from "react-router-dom";
import DepartementService from "../../services/departement.service";
import Plot from "react-plotly.js";

const  ChartPerformance = () => {
    const [dataset,setDataset]=useState(null);
    let deptId  = useParams().id;
    const getData=()=>{
        DepartementService.getDepartementChartById(deptId)
            .then(function(response){
                return response;
            })
            .then(function(myJson) {
                setDataset(myJson.data)
            });
    }
    useEffect(()=>{
        getData()
    },[])
    if(dataset){
        return (
            <Plot
                data={[
                    {type: 'bar',
                        x: dataset.map( item => { return item.ID_INTERV_FREQ }),
                        y: dataset.map( item => { return item.Number }),
                    }
                ]}
                layout={{width:1000, height: 500, title:'Enregistrements'}}
                onClick={() => console.debug("onClick")}
            />
        )
    }
}
export default ChartPerformance;
