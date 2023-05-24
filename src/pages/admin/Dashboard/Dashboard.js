import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useAuth } from "../../../hooks";
import { CountItemsServices } from "./Components/CountServicesItem";
import { CountClientProveedor } from "./Components/CountItemsClientsProveedors";
import { CountFiles } from "./Components/CountFiles";
import img_services from "../../../assets/Negotium Assets/box.png";
import img_up from "../../../assets/Negotium Assets/up.png";
import img_down from "../../../assets/Negotium Assets/down.png";
import img_view from "../../../assets/Negotium Assets/see.png";
import img_add from "../../../assets/Negotium Assets/more.png";
import img_client from "../../../assets/Negotium Assets/client.png";
import img_files from "../../../assets/Negotium Assets/folder.png";
import img_view_files from "../../../assets/Negotium Assets/contrato.png";
import up_file from "../../../assets/Negotium Assets/anadir.png";
import avatarM from "../../../assets/Negotium Assets/perfil.png";
import avatarF from "../../../assets/Negotium Assets/mujer.png";
import sinclientes from "../../../assets/Negotium Assets/add.png";
import img_pendiente from "../../../assets/Negotium Assets/exclamation.png";
import img_prioridad from "../../../assets/Negotium Assets/priority.png";
import img_alert from "../../../assets/Negotium Assets/senal-de-alerta.png";
import img_baja from "../../../assets/Negotium Assets/baja.png";
import { ListClients } from "./Components/ListClients";
import { ListRecordatorios } from "./Components/ListRecordatorios";
import { ServiceItem } from "./Components/ServicesItem";
import img_sin_recordatorios from "../../../assets/Negotium Assets/comprobado.png";
import { User } from "../../../api";
import { SearchRecordatorios } from "../../../Components/Admin/AdminLayout/SearchAddRecordatorios";
import Loading from "../../../Components/Admin/Loader/Loading";

const userController = new User();
export function Dashboard() {

  const { user, accesToken } = useAuth();
  const color = ["#010409", "#F0F3F4"];
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userActive, setUserActive] = React.useState(user);

  const membresia_active = userActive.membresias.find((m) => m.activa === true);

  console.log(user);

  if (!user) {
    console.log("no hay usuario, redireccionando a login");
    window.location.href = "/auth";
  }

  const onReload = () => {
    setReload(!reload);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await userController.getMe(accesToken);
      setUserActive(response);
      makeAColor();
      setLoading(false);
    })();
  }, [reload]);

  if (!userActive || loading) {
    return <Loading text="Cargando Dashboard..." obscuro={user.obscuro} />;
  }

  const makeAColor = () => {
    const colors = [
      "#AED9E0",
      "#D4E4C1",
      "#E8D6B9",
      "#B9E8D6",
      "#D9C9E0",
      "#C1D9E4",
      "#E0AEC2",
      "#C2E0AE",
    ];

    while (userActive.servicios.length > colors.length) {
      let red, green, blue;
      do {
        // Genera un valor aleatorio para cada componente RGB
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);

        // Verifica que el color no sea oscuro o gris
      } while (red < 102 || green < 91 || blue < 127);

      // Calcula el promedio de los componentes RGB para obtener un tono pastel
      const averageColor = (red + green + blue) / 3;

      // Calcula el valor de desplazamiento para aclarar el color
      const offset = Math.floor(Math.random() * 51) + 204;

      // Aplica el valor de desplazamiento a cada componente RGB
      red = Math.floor((red + offset + averageColor) / 3);
      green = Math.floor((green + offset + averageColor) / 3);
      blue = Math.floor((blue + offset + averageColor) / 3);

      colors.push(
        `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
      );
    }
    return colors;
  };

  return (
    <>
      <SearchRecordatorios onReload={onReload} />
      <div className="dashboard-panel">
        <CountItemsServices
          url_="/admin/services"
          imgUp={img_up}
          cont2={userActive.recaudado}
          cont1={userActive.servicios.length || 0}
          imgDown={img_down}
          imgAdd={img_add}
          img={img_services}
          imgSee={img_view}
          colors={"linear-gradient(to right, #e49eba, #b33863ae)"}
          name="Services"
        />
        <CountClientProveedor
          max_clients={membresia_active.clientes_max}
          url_={"/admin/clients"}
          img_add={img_add}
          cont1={userActive.clientes.length || 0}
          img_down={img_down}
          img_up={img_up}
          img_see={img_view}
          img={img_client}
          name="Clientes"
          icon={"users"}
          colors={"linear-gradient(to right, #9B77D6, #2c0073c6)"}
        />
        <CountFiles
          view_files={img_view_files}
          up_file={up_file}
          img_files={img_files}
          name="Archivos"
          icon={"folder open outline"}
          colors={"linear-gradient(to right, #DD9E70, #ffb37c)"}
        />
        <CountClientProveedor
          max_clients={membresia_active.recordatorios_max}
          img_add={img_add}
          cont1={userActive.recordatorios.length || 0}
          img_down={img_down}
          img_up={img_up}
          img_see={img_view}
          img={img_client}
          name="Recordatorios"
          icon={"alarm outline"}
          colors={" linear-gradient(to right, #3B6BE7, #5786FF)"}
        />
      </div>
      <div className="dashboard-v2">
        <ListClients
          obscuro={user.obscuro}
          onReload={onReload}
          sinclientes={sinclientes}
          avatarM={avatarM}
          avatarF={avatarF}
          clients={userActive.clientes || []}
          token={accesToken}
        />
        <ListRecordatorios
          obscuro={user.obscuro}
          recordatorios={userActive.recordatorios}
          img_alert={img_alert}
          img_pendiente={img_pendiente}
          sinrecordatorios={img_sin_recordatorios}
          img_baja={img_baja}
          img_prioridad={img_prioridad}
          img_see={img_view}
          onReload={onReload}
          token={accesToken}
        />
      </div>
      <div className="dashboard-services">
        {user.servicios.length > 0 ? (
          userActive.servicios.map((item, index) => {
            return (
              <ServiceItem
                colors={color}
                onReload={onReload}
                key={index}
                item={item}
                number={index}
                backgroundProps={makeAColor()}
              />
            );
          })
        ) : (
          <div className="cont-sin-servicios">
            <h3 className="text-sin-servicios">No tienes servicios</h3>
          </div>
        )}
      </div>
    </>
  );
}
