import React from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  TextArea,
  Select,
} from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";
import { Recordatorios } from "../../../api/recordatorios";

const recordatoriosController = new Recordatorios();
export default function ModalEditRecordatorio({
  setOpen,
  onReload,
  recordatorio,
  setRecordatorio,
  open,
  creando,
  setCreando,
  formatFecha,
  reload,
}) {
  const { accesToken } = useAuth();
  const [loadButton, setLoadButton] = React.useState(false);
  //console.log(recordatorio, creando);
  const [formReordatorio, setFormRecordatorio] = React.useState({
    nombre: "",
    descripcion: "",
    fechaLimite: "",
  });

  React.useEffect(() => {
    if (creando) {
      setFormRecordatorio({
        nombre: "",
        descripcion: "",
        fechaLimite: "",
        prioridad: "",
      });
      setRecordatorio({});
    }
  }, [reload]);

  const createRecordatorio = async (recordatorio_form) => {
    setRecordatorio({});
    setLoadButton(true);
    const response = await recordatoriosController.createRecordatorio(
      accesToken,
      recordatorio_form
    );
    if (response) {
      setTimeout(() => {
        setOpen(false);
        onReload();
        setFormRecordatorio({});
        setLoadButton(false);
      }, 1000);
      toast.success("Recordatorio creado correctamente");
    }
    setCreando(false);
  };

  const editRecordatorio = async (recordatorio_form) => {
    setLoadButton(true);
    const response = await recordatoriosController.updateRecordatorio(
      recordatorio._id,
      recordatorio_form,
      accesToken
    );
    if (response) {
      setTimeout(() => {
        setOpen(false);
        onReload();
        setFormRecordatorio({});
        setLoadButton(false);
      }, 1000);
      toast.success("Recordatorio editado correctamente");
    }
    setCreando(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        size="small"
      >
        <Modal.Header>
          {creando ? "Crear" : "Editar"} Recordatorio:
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Nombre</label>
              <Input
                placeholder="Nombre"
                value={creando ? formReordatorio.nombre : recordatorio.nombre}
                onChange={(e) => {
                  setFormRecordatorio({
                    ...formReordatorio,
                    nombre: e.target.value,
                  });
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Descripcion</label>
              <TextArea
                type="message"
                placeholder="Descripcion"
                value={
                  creando
                    ? formReordatorio.descripcion
                    : recordatorio.descripcion
                }
                onChange={(e) => {
                  setFormRecordatorio({
                    ...formReordatorio,
                    descripcion: e.target.value,
                  });
                }}
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field>
                <label>
                  Fecha Limite, Antigua:{" "}
                  {creando
                    ? formReordatorio.fechaLimite
                    : formatFecha(recordatorio.fechaLimite)}
                </label>
                <Input
                  type="date"
                  placeholder="Fecha Limite"
                  value={
                    creando
                      ? formReordatorio.fechaLimite
                      : recordatorio.fechaLimite
                  }
                  onChange={(e) => {
                    setFormRecordatorio({
                      ...formReordatorio,
                      fechaLimite: e.target.value,
                    });
                  }}
                />
              </Form.Field>
              {
                creando && (<Form.Field>
                    <label>Prioridad</label>
                    <Select
                      placeholder="Prioridad"
                      options={[
                        { key: "alta", value: true, text: "Alta" },
                        { key: "baja", value: false, text: "Baja" },
                      ]}
                      onChange={(e, data) => {
                        setFormRecordatorio({
                          ...formReordatorio,
                          prioridad: data.value,
                        });
                      }}
                    />
                  </Form.Field>
                )
              }
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="black"
            onClick={() => {
              setOpen(false);
              setCreando(false);
              setFormRecordatorio({
                nombre: "",
                descripcion: "",
                precio: "",
              });
            }}
          >
            Cancelar
          </Button>
          <Button
            content={loadButton ? "Cargando..." : "Aceptar"}
            labelPosition="right"
            icon="checkmark"
            onClick={() => {
              creando
                ? createRecordatorio(formReordatorio)
                : editRecordatorio(formReordatorio);
            }}
            positive
          />
        </Modal.Actions>
      </Modal>
      <ToastContainer />
    </>
  );
}
