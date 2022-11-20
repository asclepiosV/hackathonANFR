import React from 'react';
import {useNavigate} from "react-router-dom";
import ChartBand from "../chart/ChartBande"


export default function Map(){

    return (
        <div>
            <h1>Région : </h1>
            <ChartBand />
        </div>
    );
}