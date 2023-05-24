import React from "react";
import { Button, Modal, Form, Input } from "semantic-ui-react";

import { Services } from "../../../../api/service";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const serviceController = new Services();
export default function ModalNewService({ open, setOpen, onReload }) {
  const [formService, setFormService] = React.useState({});
  const [load, setLoad] = React.useState(false);

  const { accesToken } = useAuth();

  const createService = async () => {
    setLoad(true);
    const response = await serviceController.createService(
      formService,
      accesToken
    );
    console.log(response);
    if (response.ok) {
      toast.success("Servicio creado correctamente", {
        theme: "colored",
      });
      setTimeout(() => {
        setOpen(false);
        setFormService({});
        onReload();
      }, 1500);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se puede agregar más servicios debido a que se ha alcanzado el límite de clientes permitidos en el plan actual.",
        footer: '<a href="/admin/planes">Ver planes</a>',
        confirmButtonText: "Entendido",
        preConfirm: () => {
          onReload();
        },
        confirmButtonColor: "red",
      });
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
        <Modal.Header>Crear Servicio Nuevo:</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Nombre del servicio</label>
              <Input
                placeholder="Nombre"
                value={formService.nombre}
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
                value={formService.descripcion}
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
                  value={formService.precio}
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
                  placeholder="Cantidad Disponible"
                  value={formService.cantidadDisponibles}
                  type="number"
                  onChange={(e) => {
                    setFormService({
                      ...formService,
                      cantidadDisponibles: e.target.value,
                    });
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Cantidad Vendidos</label>
                <Input
                  placeholder="Cantidad Vendidos"
                  value={formService.cantidadVendidos}
                  type="number"
                  onChange={(e) => {
                    setFormService({
                      ...formService,
                      cantidadVendidos: e.target.value,
                    });
                  }}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="red" onClick={() => {setOpen(false)
            setFormService({});
          }}>
            Cancelar
          </Button>
          <Button
            color="green"
            onClick={() => {
              createService();
            }}
          >
            {load ? "Creando..." : "Crear"}
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
