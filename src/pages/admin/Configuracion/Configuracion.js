import React from "react";
import TitleHeader from "../Clients/Components/Title-head/TitleHeader";
import img_configuracion from "../../../assets/Negotium Assets/services.png";
import { useAuth } from "../../../hooks";
import "./Configuracion.css";
import UpdateUserInfo from "./UpdateUserInfo";

import {
  Input,
  Label,
  Button,
  Icon,
  Card,
  Select,
  Dropdown,
} from "semantic-ui-react";
import Loading from "../../../Components/Admin/Loader/Loading";
import Swal from "sweetalert2";
import UpdateAvatar from "./UpdateAvatar";
import InfoComercial from "./InfoComercial";

export function Configuracion() {
  const { user, accesToken } = useAuth(); //obtenemos el usuario logueado del contexto de autenticacion
  const [loading, setLoading] = React.useState(false);



  if (loading) {
    return <Loading obscuro={user.obscuro} text={"Actualizando.."} />;
  }

  return (
    <div>
      <TitleHeader
      obscuro={user.obscuro}
        iconColor={user.obscuro}
        icon={"configure"}
        title="Configuración"
        img={img_configuracion}
      />
      <div class="cont-profile-configuration">
        <UpdateAvatar />
        <UpdateUserInfo />
        <InfoComercial />
      </div>
    </div>
  );
}
