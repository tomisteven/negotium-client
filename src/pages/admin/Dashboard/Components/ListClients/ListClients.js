import React from "react";
import "./listClients.css";
import { Header, Image, Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Client } from "../../../../../api/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const clientController = new Client();
export function ListClients({
  clients,
  avatarM,
  avatarF,
  sinclientes,
  onReload,
  token,
  obscuro,
}) {
  const deleteClient = async (id) => {
    try {
      Swal.fire({
        title: "¿Estas seguro de eliminar este cliente?",
        text: "No podras revertir esta accion",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await clientController.deleteClient(id, token);
          if (response) {
            toast(response, {
              position: toast.POSITION.TOP_RIGHT,
              theme: "light",
            });
            onReload();
          } else {
            toast("Error al eliminar cliente", {
              position: toast.POSITION.TOP_RIGHT,
              theme: "dark",
            });
            onReload();
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return clients.length > 0 ? (
    <div
      className="clientes-v2"
      style={{
        backgroundColor: obscuro ? "#46505E" : "#fff",
        boxShadow: obscuro ? "0px 0px 2px 0px #fff" : "0px 0px 2px 0px #000",
      }}
    >
      <Table
        basic="very"
        className="overflow-table"
        padded
        celled
        collapsing
        style={{ color: obscuro ? "#ffffff" : "#000000" }}
      >
        <Table.Header>
          <Table.Row style={{ color: obscuro ? "#ffffff" : "#000000" }}>
            <Table.HeaderCell
              style={{ color: obscuro ? "#ffffff" : "#000000" }}
              className="items-header-table"
            >
              Nombre
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: obscuro ? "#ffffff" : "#000000" }}
              className="items-header-table"
            >
              Correo
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: obscuro ? "#ffffff" : "#000000" }}
              className="items-header-table-t"
            >
              Telefono
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: obscuro ? "#ffffff" : "#000000" }}
              className="items-header-table"
            >
              Gasto
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: obscuro ? "#ffffff" : "#000000" }}
              className="items-header-table"
            >
              Deuda
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: obscuro ? "#ffffff" : "#000000" }}
              className="items-header-table"
            >
              Acciones
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {clients.map((client, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Header className="img-header-client" as="h4" image>
                  <Image
                    src={client.genero == "Masculino" ? avatarM : avatarF}
                    rounded
                    size="mini"
                  />
                  <Header.Content
                    style={{ color: obscuro ? "#ffffff" : "000000" }}
                    className="name-item-list"
                  >
                    {client.nombre} {client.apellido}
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell className="font-item-list">{client.email}</Table.Cell>
              <Table.Cell className="font-item-list-t">
                {client.telefono}
              </Table.Cell>
              <Table.Cell className="font-item-list">
                ${client.gastoTotal}
              </Table.Cell>
              <Table.Cell className="font-item-list">
                ${client.deudaTotal}
              </Table.Cell>
              <Table.Cell>
                <Button
                  size="mini"
                  color="green"
                  onClick={() => {
                    window.location.href = `/admin/clientes`;
                  }}
                  className="btn-see"
                >
                  Ver
                </Button>
                <Button
                  size="mini"
                  color="youtube"
                  onClick={() => deleteClient(client._id)}
                  className="btn-delete"
                >
                  Eliminar
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ToastContainer />
    </div>
  ) : (
    <div className="clientes-v2">
      <h3 className="sin-clientes">No hay clientes registrados</h3>
      <Link to="/admin/clientes">
        <img className="img-sinclientes" src={sinclientes} alt="" />
      </Link>
    </div>
  );
}
