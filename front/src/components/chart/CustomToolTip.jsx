import React from "react";

function CustomToolTip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">
          Bande de fréquences : {label}
          <br />
          Nombre d'enregistrements : {payload[0].value}
        </p>
      </div>
    );
    return null;
  }
}

export default CustomToolTip;