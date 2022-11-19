import React from 'react';
import France from "@svg-maps/france.departments";
import CheckboxSVGMap from "./checkbox-svg-map";
import './map.css';



function Map() {
    return (
        <div className={"map"}>
            <CheckboxSVGMap map={France} />
        </div>
    );
}

export default Map;