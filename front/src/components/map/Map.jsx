import React from 'react';
import France from "@svg-maps/france.departments";
import SVGMap from "./svg-map";
import './map.css';
import {useNavigate} from "react-router-dom";


export default function Map(){
    const navigate = useNavigate();
    const getLocation = event => {
        navigate('/departement/' + event.target.attributes['id'].nodeValue)
    }

    return (
        <div className={"map"}>
            <SVGMap map={France} onLocationClick={getLocation}/>
        </div>
    );
}