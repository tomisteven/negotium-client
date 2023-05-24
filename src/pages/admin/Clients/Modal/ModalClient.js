import React from "react";
import { Button, Header, Icon, Image, Modal, Table } from "semantic-ui-react";
import { Client } from "../../../../api/client";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const clientController = new Client();

export function ModalClient({
  modalClient,
  setOpen,
  open,
  servicesOfClient,
  avatarM,
  avatarF,
  setOpenModalServicio,
  servicesFutures,
  setFuture,
  accesToken,
  changeState,
  setModalClient,
}) {
  const parseFecha = (fecha, f) => {
    const date = new Date(fecha);
    return f
      ? `${date.getDate() + 1}/${
          date.getMonth() + 1
        }/${date.getFullYear()} A las ${date.getHours()}:${date.getMinutes()}`
      : `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}
    `;
  };

  const completeService = async (id_service) => {
    const response = await clientController.completeService(
      accesToken,
      modalClient._id,
      id_service
    );
    if (response) {
      setOpen(false);
      changeState();
      toast("Servicio completado correctamente", {
        position: toast.POSITION.TOP_RIGHT,
        type: "success",
        theme: "colored",
      });
    }
  };

  const deleteService = async (service_id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esta accion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await clientController.deleteService(
          accesToken,
          modalClient._id,
          service_id
        );
        if (response) {
          setOpen(false);
          changeState();
          toast("Servicio eliminado correctamente", {
            position: toast.POSITION.TOP_RIGHT,
            type: "success",
            theme: "colored",
          });
        }
      }
    });
  };

  const deleteServiceFuture = async (id_service) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esta accion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await clientController.deleteServiceFuture(
          accesToken,
          modalClient._id,
          id_service
        );
        if (response) {
          setOpen(false);
          changeState();
          toast("Servicio eliminado correctamente", {
            position: toast.POSITION.TOP_RIGHT,
            type: "success",
            theme: "colored",
          });
        }
      }
    });
  };

  return (
    <>
      <Modal
        size="fullscreen"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Perfil de {modalClient.nombre}</Modal.Header>
        <Modal.Content image>
          <Image
            size="tiny"
            src={modalClient.genero == "Masculino" ? avatarM : avatarF}
            wrapped
          />
          <Modal.Description>
            <Header>
              {modalClient.nombre} {modalClient.apellido}
            </Header>
            <p>
              Telefono:{" "}
              <span className="span-modal">+54{modalClient.telefono}</span>
            </p>
            <p>
              Telefono: <span className="span-modal">{modalClient.email}</span>
            </p>
            <p>
              Direccion:{" "}
              <span className="span-modal"> {modalClient.direccion}</span>
            </p>
            <p>
              Genero: <span className="span-modal"> {modalClient.genero}</span>
            </p>
            <p>
              Deuda:{" "}
              <span className="span-modal"> $ {modalClient.deudaTotal}</span>
            </p>
            <p>
              Gasto Total:{" "}
              <span className="span-modal">$ {modalClient.gastoTotal}</span>
            </p>
            <p>
              Fecha de ingreso:{" "}
              <span className="span-modal">
                {" "}
                {parseFecha(modalClient.fecha)}
              </span>
            </p>
            <p>
              ID: <span className="span-modal"> {modalClient._id}</span>
            </p>
          </Modal.Description>
          <Modal.Content className="table-modal-cont">
            <Header>Historial de Servicios / Productos</Header>
            <Table inverted color="blue" celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Servicio</Table.HeaderCell>
                  <Table.HeaderCell>Fecha</Table.HeaderCell>
                  <Table.HeaderCell>Costo</Table.HeaderCell>
                  <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body className="body-table-modal">
                {servicesOfClient.length > 0 ? (
                  servicesOfClient.map((service, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{service.nombre}</Table.Cell>
                      <Table.Cell>{parseFecha(service.fecha)}</Table.Cell>
                      <Table.Cell>${service.precio}</Table.Cell>
                      <Table.Cell textAlign="center">
                        <Button
                          color="red"
                          onClick={() => {
                            deleteService(service._id);
                          }}
                          size="mini"
                        >
                          <Icon name="delete" size="mini" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan="3">No hay servicios</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Modal.Content>
          <Modal.Content className="table-modal-cont">
            <Header>Servicios Futuros</Header>
            <Table inverted color="grey" celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Servicio</Table.HeaderCell>
                  <Table.HeaderCell>Fecha</Table.HeaderCell>
                  <Table.HeaderCell>Costo</Table.HeaderCell>
                  <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body className="body-table-modal">
                {servicesFutures.length > 0 ? (
                  servicesFutures.map((service, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{service.nombre}</Table.Cell>
                      <Table.Cell>{parseFecha(service.fecha, true)}</Table.Cell>
                      <Table.Cell>${service.precio}</Table.Cell>
                      <Table.Cell>
                        <Button
                          size="mini"
                          color="green"
                          onClick={() => {
                            completeService(service._id);
                          }}
                        >
                          <Icon size="tiny" name="checkmark" />
                        </Button>
                        <Button
                          size="mini"
                          color="red"
                          onClick={() => {
                            deleteServiceFuture(service._id);
                          }}
                        >
                          <Icon size="tiny" name="delete" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan="3">
                      No hay servicios agendados
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Modal.Content>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Agregar Servicio"
            labelPosition="right"
            color="orange"
            icon="add"
            onClick={() => {
              setOpenModalServicio(true), setFuture(false);
            }}
          />
          <Button
            content="Agregar Servicio Futuro"
            labelPosition="right"
            color="green"
            icon="add"
            onClick={() => {
              setOpenModalServicio(true), setFuture(true);
            }}
          />
          <Button
            content="Cerrar"
            labelPosition="right"
            color="youtube"
            icon="checkmark"
            onClick={() => setOpen(false)}
          />
        </Modal.Actions>
      </Modal>
      <ToastContainer />
    </>
  );
}
