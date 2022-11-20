import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import DepartementService from "../../services/departement.service";
import Loader from "../loader/Loader";
import Plot from "react-plotly.js";
import './departement.css'
import dept from "./departments.json"


export default function Map(){
    const [dataset,setDataset]= useState(null);
    const [departement, setDepartement] = useState(null)
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

    const getDept = () => {
        dept.map( val => {
            if (val.code === deptId){
                setDepartement(val.name)
            }
        })
    }

    useEffect(()=>{
        getDept();
        getData();
    },[])

    return (
        <div>
            {departement ? <h1>{departement}</h1> : <h1></h1>}
            { dataset ?
                <Plot
                    data={[
                        {type: 'bar',
                            x: dataset.map( item => { return item.ID_INTERV_FREQ }),
                            y: dataset.map( item => { return item.Number }),
                        }
                    ]}
                layout={{width:1000, height: 500, title:'Enregistrements en fonction de la fréquence'}}
                onClick={() => console.debug("onClick")}
                />
            : <Loader />}
        </div>
    );
}