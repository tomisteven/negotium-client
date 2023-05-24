import React from "react";
import { Table, Header, Image, Button } from "semantic-ui-react";
import img_deuda from "../../../../assets/Negotium Assets/warning.png";
import sin_clientes from "../../../../assets/Negotium Assets/comprobado.png";
import Swal from "sweetalert2";
import { Client } from "../../../../api/client";
import { useAuth } from "../../../../hooks/useAuth";

const clientController = new Client();

export default function TableClients({
  clients,
  viewClientInModal,
  avatarF,
  avatarM,
  viewModalService,
  viewModalAnularDeuda,
  editCreateClient,
  changeState,
  obscuro,
}) {
  const { accesToken } = useAuth();





  const deleteClient = (client) => {
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
        const response = await clientController.deleteClient(
          client._id,
          accesToken
        );
        if (response) {
          Swal.fire("Eliminado!", "El cliente ha sido eliminado", "success");
          changeState();
        } else {
          Swal.fire("Error!", "El cliente no ha sido eliminado", "error");
        }
      }
    });
  };

  const objColor = {
    color: obscuro ? "#ffffff" : "#000000",
  };

  return (
    <>
      {clients.length > 0 ? (
        <Table basic="very" celled className="table-clients">
          <Table.Header fullWidth className="header-table">
            <Table.Row>
              <Table.HeaderCell
                style={{
                  color: objColor.color,
                }}
              >
                Nombre
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  color: objColor.color,
                }}
              >
                Correo
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  color: objColor.color,
                }}
              >
                Telefono
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  color: objColor.color,
                }}
              >
                Gasto
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  color: objColor.color,
                }}
              >
                Deuda
              </Table.HeaderCell>
              <Table.HeaderCell
                className="table-row-center"
                style={{
                  color: objColor.color,
                }}
              >
                Acciones
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  color: objColor.color,
                }}
              >
                Deuda
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body
            className="body-table"
            style={{
              color: objColor.color,
            }}
          >
            {clients.map((client, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Image
                          src={client.genero == "Masculino" ? avatarM : avatarF}
                          rounded
                          size="mini"
                        />
                        <Header.Content
                          style={{
                            color: objColor.color,
                          }}
                          className="name-item-list"
                        >
                          {client.nombre} {client.apellido}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{client.email}</Table.Cell>
                    <Table.Cell>{client.telefono}</Table.Cell>
                    <Table.Cell>${client.gastoTotal}</Table.Cell>
                    <Table.Cell>${client.deudaTotal}</Table.Cell>
                    <Table.Cell>
                      <Button
                        size="mini"
                        color="green"
                        onClick={() => {
                          viewClientInModal(client);
                        }}
                      >
                        Ver
                      </Button>
                      <Button
                        size="mini"
                        primary
                        onClick={() => {
                          editCreateClient(client);
                        }}
                        className="btn-see"
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => {
                          viewModalService(client, false);
                        }}
                        size="mini"
                        color="orange"
                        className="btn-delete"
                      >
                        + Servicio
                      </Button>
                      <Button
                        onClick={() => {
                          viewModalService(client, true);
                        }}
                        size="mini"
                        color="instagram"
                        className="btn-delete"
                      >
                        + Servicio Futuro
                      </Button>
                      <Button
                        size="mini"
                        color="purple"
                        onClick={() => {
                          viewModalAnularDeuda(client);
                        }}
                      >
                       Editar Deuda
                      </Button>
                      <Button
                        size="mini"
                        color="youtube"
                        onClick={() => {
                          deleteClient(client);
                        }}
                        className="btn-delete"
                      >
                        Eliminar
                      </Button>
                      <Button icon="print" size="mini" color="blue" />
                      <Button icon="whatsapp" size="mini" color="green" />
                    </Table.Cell>
                    <Table.Cell>
                      <Image
                        centered
                        src={client.deuda ? img_deuda : ""}
                        rounded
                        size="mini"
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
          </Table.Body>
        </Table>
      ) : (
        <div className="no-clientes-table">
          <h3>No se encontraron clientes</h3>
          <img className="img_sin_clientes" src={sin_clientes} alt="" />
        </div>
      )}
    </>
  );
}
