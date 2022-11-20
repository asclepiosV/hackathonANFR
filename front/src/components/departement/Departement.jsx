import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import DepartementService from "../../services/departement.service";
import Loader from "../loader/Loader";
import Plot from "react-plotly.js";
import './departement.css'


export default function Map(){
    const [dataset,setDataset]= useState(null);
    let deptId  = useParams().id;
    const getData=()=>{
        DepartementService.getDepartementChartById(deptId, 0)
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

    return (
        <div>
            <h1>Région : </h1>
            { dataset ?
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
            : <Loader />}
        </div>
    );
}