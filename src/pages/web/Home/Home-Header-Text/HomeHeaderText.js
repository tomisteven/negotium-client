import React from "react";
import "./HomeHeaderText.css";


export default function HomeHeaderText({titulo, descripcion}) {
  return (
    <>
      <div className="home-container-text">
        <h2>{titulo}</h2>
      </div>
      {
        descripcion ? (
          <div className="center-description">
              <div className="home-container-description">
                <p className="p-color">
                  {descripcion}
                </p>
              </div>
          </div>
        ) : null
      }
    </>
  );
}
