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
    const [tel, setTel] = useState(0)
    const [fast, setFast] = useState(1)

    const getNew = event => {
        setDataset(null)
        let bandeId = 3
        getDataTime(bandeId, tel, fast, deptId)
    }

    const getDataTime = (bandeID, tel, fast, deptId)=> {
        DepartementService.getDepartementTemp(bandeID, tel, fast, deptId)
            .then(function(response){
                return response;
            })
            .then(function(myJson) {
                setDataset(myJson.data)
            });
    }

    function changeFast(){
        if(fast === 0){
            setFast(1)
        }
        else setFast(0)
        getData();
    }

    function changeTel(){
        if(tel === 0){
            setTel(1)
        }
        else setTel(0)
        getData();
    }

    let deptId  = useParams().id;

    const getData=()=>{
        DepartementService.getDepartementChartById(deptId, tel, fast)
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
        <div className={'departement'}>
            {departement ? <h1>{departement}</h1> : <h1></h1>}
            <div className={'link'}>
                { fast === 1 ? <div className={'button'} onClick={changeFast}>Avoir un traiement plus précis</div> : <div className={'button'}>Avoir un traitement plus rapide</div>}
                { tel === 0 ? <div className={'button'} onClick={changeTel}>Voir le réseau téléphonique</div> : <div className={'button'}>Ne pas voir le réseau téléphonique</div>}
            </div>
            { dataset ?
                <Plot
                    data={[
                        {type: 'bar',
                            x: dataset.map( item => { return item.ID_INTERV_FREQ }),
                            y: dataset.map( item => { return item.Number }),
                        }
                    ]}
                layout={{width:1000, height: 500, title:'Enregistrements en fonction de la fréquence'}}
                onClick={getNew}
                />
            : <Loader />}
        </div>
    );
}