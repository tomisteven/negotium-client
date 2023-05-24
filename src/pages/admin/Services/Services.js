import React from "react";
import "./services.css";
import TitleHeader from "../Clients/Components/Title-head/TitleHeader";
import TableServices from "./Components/TableServices";
import PanelServices from "./Components/PanelServices";
import { useAuth } from "../../../hooks/useAuth";
import { Services } from "../../../api/service";
import Loading from "../../../Components/Admin/Loader/Loading";

const servicesController = new Services();

export default function Services_() {
  const { user, accesToken } = useAuth();

  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [services, setServices] = React.useState(user.servicios);
  const [sinServices, setSinServices] = React.useState(false);

  const changeFilter = (filter) => {
    if (
      filter !== "Todos" &&
      filter !== "Vendidos" &&
      filter !== "Activos" &&
      filter !== "Inactivos"
    ) {
      const serv = services.filter((service) =>
        service.nombre.toLowerCase().includes(filter.toLowerCase())
      );

      if (serv.length !== 0) {
        setServices(serv);
      } else {
        setServices([]);
        setSinServices(true);
        set("");
      }
      return;
    }

    setFilter(filter);
    switch (filter) {
      case "Activos":
        setLoading(true);
        setServices(
          user.servicios.filter((service) => service.habilitado === true)
        );
        setLoading(false);
        break;
      case "Inactivos":
        setServices(
          user.servicios.filter((service) => service.habilitado === false)
        );
        break;
      case "Vendidos":
        setServices(user.servicios.filter((service) => service.clientes > 0));
        break;
      case "Todos":
        setServices(user.servicios);
        break;
      default:
        break;
    }
    setLoading(false);
  };

  const onReload = () => {
    setReload(!reload);
  };

  React.useEffect(() => {
    setLoading(true);
    servicesController.getServices(accesToken).then((response) => {
      setServices(response);
      setLoading(false);
    });
  }, [user, reload]);

  if (loading) {
    return <Loading obscuro={user.obscuro} text="Cargando servicios..." />;
  }

  return (
    <>
      <TitleHeader
        obscuro={user.obscuro}
        iconColor={user.obscuro ? "white" : "black"}
        valueFilter={filter}
        icon={"cart"}
        title="Lista de servicios"
      />
      <div className="contenedor-servicios">
        <div className="contenedor-panel-vertical">
          <PanelServices
            obscuro={user.obscuro}
            onReload={onReload}
            changeFilter={changeFilter}
            activos={
              services.filter((service) => service.habilitado === true).length
            }
            inactivos={
              services.filter((service) => service.habilitado === false).length
            }
            vendidos={user.totalServiciosUsados}
            total={services.length}
          />
        </div>
        <div
          className={
            load
              ? "contenedor-panel-list-services-v2"
              : "contenedor-panel-list-services"
          }
        >
          <TableServices
            sinServices={sinServices}
            setServices={setServices}
            services={services}
            onReload={onReload}
            setLoading={setLoading}
            setLoad={setLoad}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}
