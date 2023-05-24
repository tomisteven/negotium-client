import React, { useState } from "react";
import "./home.css";
import HomeHeaderText from "./Home-Header-Text/HomeHeaderText";
import HomeDescription from "./Home-Description/HomeDescription";

import panel from "../../../../src/assets/Negotium Assets/panel.png";
import services from "../../../../src/assets/Negotium Assets/servicios.png";
import clients from "../../../../src/assets/Negotium Assets/clientes.png";

export function Home() {
  const [zoom0, setZoom0] = useState(false);
  const [zoom1, setZoom1] = useState(false);
  const [zoom2, setZoom2] = useState(false);

  const setZoomBoolean = (key) => {
    switch (key) {
      case 0:
        setZoom0(!zoom0);
        setZoom1(false);
        setZoom2(false);
        break;
      case 1:
        setZoom0(false);
        setZoom1(!zoom1);
        setZoom2(false);
        break;
      case 2:
        setZoom0(false);
        setZoom1(false);
        setZoom2(!zoom2);
        break;
      default:
    }
  };

  const dataDescription = [
    {
      titulo: "Panel De Administracion",
      descripcion:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
      imagen: panel,
    },
    {
      titulo: "Red de clientes",
      descripcion:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
      imagen: clients,
    },
    {
      titulo: "Servicios",
      descripcion:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
      imagen: services,
    },
  ];

  const dataText = {
    titulo: "Que es Negotium?",
    descripcion:
      "Negotium es una plataforma que te permite gestionar tus clientes, servicios y facturación de una manera fácil y sencilla. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
  };

  return (
    <div className="home-container">
      <HomeHeaderText
        titulo={dataText.titulo}
        descripcion={dataText.descripcion}
      />
      {dataDescription.map((item, index) => {
        return (
          <button
            key={index}
            style={{
              backgroundColor: "transparent",
              border: "none",
              width: "100%",
            }}
            onClick={() => setZoomBoolean(index)}
          >
            <HomeDescription
              active={index === 0 ? zoom0 : index === 1 ? zoom1 : zoom2}
              titulo={item.titulo}
              descripcion={item.descripcion}
              imagen={item.imagen}
            />
          </button>
        );
      })}
      <div className="magin-b"></div>
    </div>
  );
}
