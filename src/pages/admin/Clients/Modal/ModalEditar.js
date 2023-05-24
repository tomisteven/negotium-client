import React from "react";
import { Modal, Form, Input, Dropdown, Button } from "semantic-ui-react";
import { Client } from "../../../../api/client";
import { useAuth } from "../../../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const clientController = new Client();
export default function ModalEditar({
  modalEditar,
  setModalEditar,
  client,
  changeState,
  editStatus,
}) {
  const { accesToken } = useAuth();
  const [cargando, setCargando] = React.useState(false);
  const [formEdit, setFormEdit] = React.useState(
    editStatus
      ? client
      : {
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          deuda: false,
          deudaTotal: 0,
          gastoTotal: 0,
          genero: "",
          direccion: "",
        }
  );

  console.log(formEdit);

  // console.log("formEdit", formEdit);

  const editCreateClient = async () => {
    setCargando(true);
    if (editStatus) {
      formEdit.nombre == "" ? (formEdit.nombre = client.nombre) : null;
      formEdit.apellido == "" ? (formEdit.apellido = client.apellido) : null;
      formEdit.email == "" ? (formEdit.email = client.email) : null;
      formEdit.telefono == "" ? (formEdit.telefono = client.telefono) : null;
      formEdit.genero == "" ? (formEdit.genero = client.genero) : null;
      formEdit.direccion == "" ? (formEdit.direccion = client.direccion) : null;
      formEdit.deudaTotal == ""
        ? (formEdit.deudaTotal = client.deudaTotal)
        : null;
      formEdit.deudaTotal > 0
        ? (formEdit.deuda = true)
        : (formEdit.deuda = false);
      const response = await clientController.updateClient(
        accesToken,
        formEdit,
        client._id
      );
      if (response) {
        toast.success("Cliente actualizado correctamente");
        setCargando(false);
        setModalEditar(false);
        changeState();
      } else {
        toast.error("Error al actualizar el cliente");
      }
    } else {
      formEdit.deudaTotal > 0
        ? (formEdit.deuda = true)
        : (formEdit.deuda = false);
      const response = await clientController.createClient(
        accesToken,
        formEdit
      );
      if (response.ok) {
        toast.success("Cliente creado correctamente");
        setCargando(false);
        setModalEditar(false);
        changeState();
      } else {
        setCargando(false);
        setModalEditar(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se puede agregar más clientes debido a que se ha alcanzado el límite de clientes permitidos en el plan actual.",
          footer: '<a href="/admin/planes">Ver planes</a>',
          confirmButtonText: "Entendido",
          preConfirm: () => {
            changeState();
          },
          confirmButtonColor: "red",
        });
      }
    }
  };

  return (
    <>
      <Modal
        size="small"
        open={modalEditar}
        onClose={() => setModalEditar(false)}
        onOpen={() => setModalEditar(true)}
      >
        <Modal.Header>
          Editar datos del cliente: {client.nombre} {client.apellido}{" "}
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <Input
                  focus
                  fluid
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  onChange={(e) => {
                    setFormEdit({ ...formEdit, nombre: e.target.value });
                  }}
                  defaultValue={editStatus ? client.nombre : formEdit.nombre}
                  /* value={editStatus ? client.nombre : formEdit.nombre} */
                  label={{ content: "Nombre" }}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  focus
                  fluid
                  label={{ content: "Apellido" }}
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  onChange={(e) => {
                    setFormEdit({ ...formEdit, apellido: e.target.value });
                  }}
                  /* value={formEdit.apellido} */
                  defaultValue={
                    editStatus ? client.apellido : formEdit.apellido
                  }
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Input
                  focus
                  fluid
                  type="text"
                  name="email"
                  placeholder="Email"
                  label={{ content: "Email" }}
                  onChange={(e) => {
                    setFormEdit({ ...formEdit, email: e.target.value });
                  }}
                  /* value={formEdit.email} */
                  defaultValue={editStatus ? client.email : formEdit.email}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  focus
                  fluid
                  type="text"
                  name="telefono"
                  placeholder="Telefono"
                  onChange={(e) => {
                    setFormEdit({ ...formEdit, telefono: e.target.value });
                  }}
                  label={{ icon: "plus", content: "54" }}
                  /* value={formEdit.telefono} */
                  defaultValue={
                    editStatus ? client.telefono : formEdit.telefono
                  }
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Input
                  focus
                  fluid
                  type="number"
                  name="gastoTotal"
                  label={{ icon: "dollar", content: "Gasto Total" }}
                  placeholder="Gasto Total Actual"
                  onChange={(e) => {
                    setFormEdit({
                      ...formEdit,
                      gastoTotal: parseInt(e.target.value),
                    });
                  }}
                  /* value={formEdit.gastoTotal} */
                  defaultValue={
                    editStatus ? client.gastoTotal : formEdit.gastoTotal
                  }
                />
              </Form.Field>
              <Form.Field>
                <Input
                  focus
                  fluid
                  type="text"
                  name="deudaTotal"
                  label={{ icon: "dollar", content: "Deuda Total" }}
                  placeholder="Deuda Total"
                  onChange={(e) => {
                    setFormEdit({
                      ...formEdit,
                      deudaTotal: parseInt(e.target.value),
                    });
                  }}
                  /* value={formEdit.deudaTotal} */
                  defaultValue={
                    editStatus ? client.deudaTotal : formEdit.deudaTotal
                  }
                />
              </Form.Field>
            </Form.Group>

            <Form.Field>
              <Input
                focus
                fluid
                type="text"
                name="direccion"
                label={{ content: "Direccion", icon: "home" }}
                placeholder="Direccion"
                onChange={(e) => {
                  setFormEdit({ ...formEdit, direccion: e.target.value });
                }}
                /* value={formEdit.direccion} */
                defaultValue={
                  editStatus ? client.direccion : formEdit.direccion
                }
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                placeholder="Genero"
                fluid
                selection
                icon={{ name: "dropdown", color: "blue" }}
                options={[
                  { key: "1", text: "Femenino", value: "Femenino" },
                  { key: "2", text: "Masculino", value: "Masculino" },
                ]}
                onChange={(e, data) => {
                  setFormEdit({ ...formEdit, genero: data.value });
                }}
                /* value={formEdit.genero || client.genero} */
                defaultValue={editStatus ? client.genero : formEdit.genero}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="black"
            onClick={() => {
              setModalEditar(false);
              setFormEdit({
                nombre: "",
                apellido: "",
                email: "",
                telefono: "",
                gastoTotal: "",
                deudaTotal: "",
                direccion: "",
                genero: "",
              });
            }}
          >
            Cancelar
          </Button>
          <Button
            content={cargando ? "Editando..." : editStatus ? "Editar" : "Crear"}
            labelPosition="right"
            icon={cargando ? "spinner" : "edit"}
            positive
            onClick={() => {
              editCreateClient();
            }}
          />
        </Modal.Actions>
      </Modal>
      <ToastContainer />
    </>
  );
}
