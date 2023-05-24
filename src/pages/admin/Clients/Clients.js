import React, { useEffect, useState } from "react";
import "./Clients.css";
import { useAuth } from "../../../hooks/useAuth";
import img_clients from "../../../assets/Negotium Assets/group.png";
import {
  Loader,
  Dimmer,
  Select,
  Table,
  Header,
  Image,
  Button,
  Icon,
  Modal,
  Input,
} from "semantic-ui-react";
import { Client } from "../../../api/client";
import { User } from "../../../api/user";
import avatarM from "../../../assets/Negotium Assets/perfil.png";
import avatarF from "../../../assets/Negotium Assets/mujer.png";
import ModalEditar from "./Modal/ModalEditar";
import { ModalClient } from "./Modal";
import TableClients from "./TableClients/TableClients";
import ModalAgregarServicio from "./Modal/ModalAgregarServicio";
import ModalAnularDeuda from "./Modal/ModalAnularDeuda";
import TitleHeader from "./Components/Title-head/TitleHeader";
import CardsHeader from "./Components/Cards-header/CardsHeader";
import sweetAlert from "sweetalert2";
import Loading from "../../../Components/Admin/Loader/Loading";

const clientController = new Client();
const userController = new User();
export function Clients() {
  const { user, accesToken } = useAuth();
  const [userRefresh, setUserRefresh] = useState(user);
  const [cantDeudores, setCantDeudores] = useState(0);
  const [searchValue, setSearchValue] = useState(""); //Valor del input de busqueda
  const [open, setOpenModalClient] = React.useState(false); //Modal para ver cliente
  const [future, setFuture] = React.useState(false); //booleano si apretaron el boton de servicios futuros
  const [openModalServicio, setOpenModalServicio] = React.useState(false); //Modal para agregar servicio
  const [openModalDeuda, setModalAnularDeuda] = React.useState(false); //Modal para anular deuda
  const [clients, setClients] = useState([]); //Lista de clientes
  const [loading, setLoading] = useState(true); //Loading
  const [reload, setReload] = useState(false); //Reload pagina
  const [modalEditar, setModalEditar] = useState(false); //Modal para editar cliente
  const [editStatus, setEditStatus] = useState(false); //Estado de edicion o creacion de cliente
  const [modalClient, setModalClient] = useState({}); //Modal para ver cliente
  const [search, setSearch] = useState(""); //Lista de clientes que se buscan
  const [valueFilter, setValueFilter] = useState(""); //Valor del filtro para el titulo
  const [servicesOfClient, setServicesOfClient] = useState([]); //Servicios del cliente para la tabla
  const [servicesFutures, setServicesFutures] = useState([]); //Servicios futuros del cliente para la tabla

  const membresia_activa = user.membresias.filter((m) => m.activa === true);

  const optionsDropdown = [
    { key: "1", text: "Deudores", value: "deuda" },
    { key: "2", text: "No deudores", value: "no deuda" },
    { key: "3", text: "Femenino", value: "Femenino" },
    { key: "4", text: "Masculino", value: "Masculino" },
  ];

  //actualizamos estado
  const changeState = () => {
    setReload(!reload);
  };
  const searchInput = async (value) => {
    if (value === "") {
      changeState();
    }
    const arraySearch = clients.filter((c) => {
      return (
        c.nombre.toLowerCase().includes(value) || //busca por nombre
        c.apellido.toLowerCase().includes(value) || //busca por apellido
        c.email.toLowerCase().includes(value) || //busca por email
        c.telefono.toLowerCase().includes(value) //busca por telefono
      );
    });

    if (arraySearch.length > 0) {
      setClients(arraySearch);
      setSearchValue("");
    } else {
      sweetAlert.fire({
        title: "No se encontraron coincidencias",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  };
  //console.log(searchValue);

  //al cambiar el filtro se actualiza el titulo
  const onChangeSetFilter = async (value) => {
    //console.log("Value", value);
    switch (value) {
      case "deuda":
        setLoading(true);
        setValueFilter("");
        setValueFilter(
          optionsDropdown.find((item) => item.value === value).text
        );
        const response = await clientController.getClientsDeudores(accesToken);
        if (response && response.length > 0) {
          setClients(response);
          console.log("Clientes - select ", response);
        } else {
          sweetAlert.fire({
            title: "No hay clientes deudores",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
        setLoading(false);
        break;
      case "no deuda":
        setLoading(true);
        setValueFilter("");
        setValueFilter(
          optionsDropdown.find((item) => item.value === value).text
        );
        const response2 = await clientController.getClientsNoDeudores(
          accesToken
        );
        console.log("Clientes - select ", response2);
        if (response2 && response2.length > 0) {
          setClients(response2);
          //setLoading(false)
        } else {
          sweetAlert.fire({
            title: "No hay clientes no deudores",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
        setLoading(false);
        break;

      case "Femenino":
        setLoading(true);
        setValueFilter("");
        setValueFilter(
          optionsDropdown.find((item) => item.value === value).text
        );
        const response3 = await clientController.getClientX(value, accesToken);
        if (response3 && response3.length > 0) {
          setClients(response3);
          console.log("Clientes - select ", response3);
        } else {
          sweetAlert.fire({
            title: "No hay clientas femeninos",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
        setLoading(false);
        break;

      case "Masculino":
        setLoading(true);
        setValueFilter("");
        setValueFilter(
          optionsDropdown.find((item) => item.value === value).text
        );
        console.log(optionsDropdown.find((item) => item.value === value).text);
        const response4 = await clientController.getClientX(value, accesToken);
        if (response4) {
          setClients(response4);
          console.log("Clientes - select ", response4);
        } else {
          sweetAlert.fire({
            title: "No hay clientes masculinos",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
        setLoading(false);
        break;
      default:
        break;
    }
  };

  //abrir modal y ver servicio
  const viewModalService = (client, future) => {
    setFuture(future);
    setOpenModalServicio(true);
    setModalClient(client);
  };

  //abrir modal y ver cliente
  const viewClientInModal = (client, future) => {
    setOpenModalClient(true);
    setModalClient(client);
    setServicesOfClient(client.serviciosadquiridos);
    setServicesFutures(client.nextServices);
    console.log(servicesOfClient);
  };

  //abrir modal y anular deuda
  const viewModalAnularDeuda = (client) => {
    setModalAnularDeuda(true);
    setModalClient(client);
  };

  //editar cliente o crear cliente
  const editCreateClient = async (client) => {
    client ? setModalClient(client) : setModalClient({});
    client ? setEditStatus(true) : setEditStatus(false);
    setModalEditar(true);
  };

  useEffect(() => {
    setLoading(true);
    clientController
      .getClients(accesToken)
      .then((response) => {
        setClients(response);
        setModalClient({});
        setServicesOfClient([]);
        setServicesFutures([]);
        setModalAnularDeuda(false);
        setModalEditar(false);
        setSearch([]);
      })
      .finally(() => {
        setLoading(false);
      });
    setLoading(true);
    userController
      .getMe(accesToken)
      .then((response) => {
        setUserRefresh(response);
        setCantDeudores(
          response.clientes.filter((c) => c.deudaTotal > 0).length
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reload]);

  //si esta cargando muestra el loader
  if (loading) {
    return (
      <Loading text={"Cargando Clientes.."} obscuro={user.obscuro}></Loading>
    );
  }

  return (
    <>
      <div className="contenedor-principal-clientes">
        <TitleHeader
          icon={"users"}
          iconColor={"black"}
          obscuro={user.obscuro}
          valueFilter={valueFilter}
          title="Lista de clientes"
          img={img_clients}
        />
        <div className="contenedores-cards">
          <CardsHeader
            gradient={
              "linear-gradient(120deg, rgb(255, 157, 0) 0%, rgba(246, 208, 154, 0.65) 100%)"
            }
            user={userRefresh}
            color={"black"}
            dollar="$"
            title1="Total Recaudado"
            v1={true}
            title2={"Deudas Pendientes"}
          />
          <CardsHeader
            gradient={
              "linear-gradient(120deg, rgb(231, 118, 58) 0%, rgba(246, 208, 154, 0.65) 100%)"
            }
            user={userRefresh}
            max_clients={membresia_activa[0].clientes_max}
            title1="Total Clientes"
            title2={"Clientes Deudores"}
            total_deudores={cantDeudores}
          />
          <Select
            button
            className="selector-filter"
            placeholder="Filtrar Busqueda"
            options={optionsDropdown}
            defaultValue={valueFilter}
            icon={{ name: "dropdown", color: "blue" }}
            onChange={(e, { value }) => {
              onChangeSetFilter(value);
            }}
          />
          <Button
            className="btn-ver-todos"
            size="medium"
            onClick={() => changeState()}
            primary
          >
            Ver Todos
          </Button>
          <Input
            className="input-search"
            style={{
              border: user.obscuro ? "2px solid white" : "1px solid #424E5E",
            }}
            size="tiny"
            type="text"
            placeholder="Buscar..."
            action
            onChange={(e) => {
              searchInput(e.target.value);
            }}
          ></Input>
          <Button
            className="btn-nuevo-cliente"
            size="medium"
            onClick={() => {
              editCreateClient();
            }}
            color="green"
          >
            Nuevo Cliente
          </Button>
        </div>
        <div className="cont-list-clientes">
          <TableClients
            editCreateClient={editCreateClient}
            clients={clients}
            viewModalService={viewModalService}
            viewClientInModal={viewClientInModal}
            avatarF={avatarF}
            avatarM={avatarM}
            viewModalAnularDeuda={viewModalAnularDeuda}
            changeState={changeState}
            setFuture={setFuture}
            obscuro={user.obscuro}
          />
        </div>

        <ModalClient
          accesToken={accesToken}
          changeState={changeState}
          setFuture={setFuture}
          modalClient={modalClient}
          open={open}
          setOpen={setOpenModalClient}
          setModalClient={setModalClient}
          setOpenModalServicio={setOpenModalServicio}
          avatarF={avatarF}
          avatarM={avatarM}
          servicesOfClient={servicesOfClient}
          servicesFutures={servicesFutures}
        />

        <ModalAgregarServicio
          future={future}
          setOpenModalClient={setOpenModalClient}
          avatarF={avatarF}
          avatarM={avatarM}
          open={openModalServicio}
          setOpenModalServicio={setOpenModalServicio}
          client={modalClient}
          changeState={changeState}
        />

        <ModalAnularDeuda
          setModalAnularDeuda={setModalAnularDeuda} //Setea el estado del modal
          openModalDeuda={openModalDeuda} //Estado del modal
          client={modalClient}
          changeState={changeState}
          token={accesToken}
        />

        <ModalEditar
          client={modalClient}
          changeState={changeState}
          modalEditar={modalEditar}
          setModalEditar={setModalEditar}
          editStatus={editStatus}
        />
      </div>
    </>
  );
}
