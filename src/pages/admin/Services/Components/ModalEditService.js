import React from "react";
import { Modal, Button, Form, Input } from "semantic-ui-react";
import { Services } from "../../../../api/service";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../../../hooks/useAuth";
import { Circles } from "react-loader-spinner";
import Loading from "../../../../Components/Admin/Loader/Loading";

const serviceController = new Services();
export default function ModalEditService({ service, open, setOpen, onReload }) {
  const { accesToken } = useAuth();
  if (!service || !open) {
    return null;
  }

  const [load, setLoad] = React.useState(false);
  const [formService, setFormService] = React.useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    clientes: 0,
    cantidadDisponibles: 0,
    _id: "",
  });

  const editService = async (form_service) => {
    setLoad(true);
    const response = await serviceController.updateService(
      service._id,
      form_service,
      accesToken
    );
    if (response) {
      setTimeout(() => {
        setOpen(false);
        setLoad(false);
        onReload();
        setFormService({
          nombre: "",
          descripcion: "",
          precio: 0,
          clientes: 0,
          canditadDisponibles: 0,
          _id: "",
        });
      }, 1500);
      toast.success("Servicio editado correctamente");
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        size="small"
        closeIcon
      >
        {load ? (
          <Loading text={"Actualizando Servicios..."} />
        ) : (
          <>
            <Modal.Header>Editar Servicio:</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label>Nombre</label>
                  <Input
                    placeholder="Nombre"
                    maxLength="30"
                    defaultValue={formService.nombre || service.nombre}
                    onChange={(e) => {
                      setFormService({
                        ...formService,
                        nombre: e.target.value,
                      });
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Descripcion</label>
                  <Input
                    placeholder="Descripcion"
                    type="text"
                    maxLength="53"
                    defaultValue={
                      formService.descripcion || service.descripcion
                    }
                    onChange={(e) => {
                      setFormService({
                        ...formService,
                        descripcion: e.target.value,
                      });
                    }}
                  />
                </Form.Field>
                <Form.Group widths="equal">
                  <Form.Field>
                    <label>Precio</label>
                    <Input
                      placeholder="Precio"
                      defaultValue={formService.precio || service.precio}
                      type="number"
                      onChange={(e) => {
                        setFormService({
                          ...formService,
                          precio: e.target.value,
                        });
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Cantidad Disponible</label>
                    <Input
                      type="number"
                      placeholder="Cantidad Disponible"
                      defaultValue={
                        formService.cantidadDisponibles ||
                        service.cantidadDisponibles
                      }
                      onChange={(e) => {
                        setFormService({
                          ...formService,
                          cantidadDisponibles: e.target.value,
                        });
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Clientes</label>
                    <Input
                      type="number"
                      placeholder="Clientes"
                      defaultValue={formService.clientes || service.clientes}
                      onChange={(e) => {
                        setFormService({
                          ...formService,
                          clientes: e.target.value,
                        });
                      }}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="black"
                onClick={() => {
                  setOpen(false);
                  setFormService({
                    nombre: "",
                    descripcion: "",
                    precio: "",
                  });
                }}
              >
                Cancelar
              </Button>
              <Button
                content="Editar"
                labelPosition="right"
                icon="checkmark"
                onClick={() => editService(formService)}
                positive
              />
            </Modal.Actions>
          </>
        )}
      </Modal>
      <ToastContainer />
    </>
  );
}
