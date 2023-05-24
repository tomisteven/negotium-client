import React, { useState } from "react";
import { Card, Input, Button, Dropdown } from "semantic-ui-react";
import { useAuth } from "../../../hooks";
import { ColorRing } from "react-loader-spinner";
import { Auth } from "../../../api";
import Swal from "sweetalert2";
import RecaudacionGlobal from "./ItemsComercial/RecaudacionGlobal";
import DeudasTotales from "./ItemsComercial/DeudasTotales";
import ServiciosUsados from "./ItemsComercial/ServiciosUsados";
import TemaAplicacion from "./ItemsComercial/TemaAplicacion";

const authController = new Auth();
export default function InfoComercial() {
  const { user, accesToken } = useAuth(); //obtenemos el usuario logueado del contexto de autenticacion

  const [loading, setLoading] = useState(false);
  const options = [
    {
      key: "1",
      text: "Claro",
      value: false,
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
      },
    },
    {
      key: "2",
      text: "Oscuro",
      value: true,
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
      },
    },
  ];

  const updateUser = async (data) => {
    const response = await authController.updateUser(data, accesToken);
    if (!response) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al actualizar el usuario",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "Usuario actualizado correctamente",
      });
    }
    setLoading(false);
  };

  return (
    <div style={{
      backgroundColor: user.obscuro ? "#3B4554" : "#00000005"
    }} class="info-comercial">
      <h4 className="title-info-user" style={{
        color: user.obscuro ? "white" : "#000000"
      }}>Informacion Comercial</h4>
      <Card.Group centered>
        <RecaudacionGlobal updateUser={updateUser} />
        <DeudasTotales updateUser={updateUser} />
        <ServiciosUsados updateUser={updateUser} />
        <TemaAplicacion updateUser={updateUser} />
      </Card.Group>
    </div>
  );
}
