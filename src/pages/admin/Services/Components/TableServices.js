import React from "react";
import { Button, Image, Modal, Table } from "semantic-ui-react";
import inactive from "../../../../assets/Negotium Assets/inactive.png";
import active from "../../../../assets/Negotium Assets/active.png";
import ModalEditService from "./ModalEditService";
import { Services } from "../../../../api/service";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../../../hooks/useAuth";
import sweetAlert from "sweetalert2";
import add_service from "../../../../assets/Negotium Assets/add.png";

const serviceController = new Services();
export default function TableServices({
  services,
  onReload,
  setLoad,
  sinServices,
  setServices,
}) {
  const { accesToken, user } = useAuth();
  const [service, setService] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const editService = (service) => {
    setService(service);
    setOpen(true);
  };

  const activeService = async (id) => {
    const response = await serviceController.toggleService(id, accesToken);
    if (response) {
      toast.success("Servicio actualizado correctamente");
      setTimeout(() => {
        setLoad(false);
        setOpen(false);
        onReload();
      }, 1500);
    }
  };

  const deleteService = async (id) => {
    sweetAlert
      .fire({
        title: "¿Estas seguro de eliminar este servicio?",
        text: "No podras revertir esta accion",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await serviceController.deleteService(
            id,
            accesToken
          );
          if (response) {
            toast.success("Servicio eliminado correctamente");
            setTimeout(() => {
              onReload();
            }, 1500);
          }
        }
      });
  };

  return (
    <div>
      <Table
        celled
        basic="very"
        className="table-services"
        style={{ backgroundColor: user.obscuro ? "#355175" : "#F0F3F4" }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              style={{ color: user.obscuro ? "#ffffff" : "#000000" }}
            >
              Estado
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: user.obscuro ? "#ffffff" : "#000000" }}
            >
              Nombre
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: user.obscuro ? "#ffffff" : "#000000" }}
            >
              Descripcion
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: user.obscuro ? "#ffffff" : "#000000" }}
            >
              Vendidos
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: user.obscuro ? "#ffffff" : "#000000" }}
            >
              Precio
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: user.obscuro ? "#ffffff" : "#000000" }}
            >
              Acciones
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {services.length > 0
            ? services.map((service) => (
                <Table.Row
                  key={service._id}
                  style={{ color: user.obscuro ? "#ffffff" : "#000000" }}
                >
                  <Table.Cell>
                    <Image
                      centered
                      src={service.habilitado ? active : inactive}
                      size="mini"
                    />
                  </Table.Cell>
                  <Table.Cell
                    style={{ color: user.obscuro ? "#ffffff" : "#000000" }}
                    className="text-items-table-services-bold"
                  >
                    {service.nombre}
                  </Table.Cell>
                  <Table.Cell
                    style={{ color: user.obscuro ? "#ffffff" : "#000000" }}
                    className="text-items-table-services"
                  >
                    {service.descripcion}
                  </Table.Cell>
                  <Table.Cell
                    style={{ color: user.obscuro ? "#ffffff" : "#000000" }}
                    className="text-items-table-services"
                  >
                    {service.cantidadVendidos}
                  </Table.Cell>
                  <Table.Cell
                    style={{ color: user.obscuro ? "#ffffff" : "#000000" }}
                    className="text-items-table-services-bold"
                  >
                    ${service.precio}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color={service.habilitado ? "orange" : "green"}
                      size="mini"
                      onClick={() => {
                        setLoad(true);
                        activeService(service._id);
                      }}
                    >
                      {service.habilitado ? "Desactivar" : "Activar"}
                    </Button>
                    <Button
                      color="blue"
                      size="mini"
                      onClick={() => editService(service)}
                    >
                      Editar
                    </Button>
                    <Button
                      color="red"
                      size="mini"
                      onClick={() => deleteService(service._id)}
                    >
                      Eliminar
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            :
            (
              <div className="cont-sin-services">
                <h2>No hay servicios</h2>
                <img className="img_sin_services" src={add_service} alt=""/>
              </div>
            )
            }
        </Table.Body>
      </Table>

      <ModalEditService
        service={service}
        open={open}
        onReload={onReload}
        setOpen={setOpen}
      />
      <ToastContainer />
    </div>
  );
}
