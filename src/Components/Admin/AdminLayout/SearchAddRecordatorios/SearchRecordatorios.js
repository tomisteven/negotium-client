import React from "react";
import "./SearchRecordatorios.css";
import iconAlert from "../../../../assets/Negotium Assets/senal-de-alerta.png";
import iconAdd from "../../../../assets/Negotium Assets/comprobado.png";
import { Recordatorios } from "../../../../api/recordatorios";
import { useAuth } from "../../../../hooks";
import { Checkbox, Form, Button, Input } from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./FormikValues";

const recordatorioApi = new Recordatorios();
export function SearchRecordatorios({ onReload }) {
  const { accesToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formData) => {
      try {
        formData.prioridad = formData.prioridad === true ? "Alta" : "Baja";
        //console.log(formData);
        const response = await recordatorioApi.createRecordatorio(
          accesToken,
          formData
        );
        //console.log(response);
        if (response) {
          toast("Recordatorio Creado Correctamente", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
            closeButton: true,
          });
          onReload();
          formik.resetForm({ nombre: "", descripcion: "", prioridad: "" });
        } else {
          toast("Error al crear el recordatorio", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  //const [booleanCheck, setBoolean] = React.useState(false)

  return (
    <div className="search-recordatorios">
      <img className="img-alert-recordatorio" src={iconAlert} alt="alert" />
      <Form className="form-recordatorios" onSubmit={formik.handleSubmit}>
        <Input
          className="input-recordatorio-name"
          value={formik.values.nombre}
          name="nombre"
          type="text"
          onChange={formik.handleChange}
          placeholder="Nombre"
        />
        <Input
          className="input-recordatorio"
          value={formik.values.descripcion}
          name="descripcion"
          type="text"
          onChange={formik.handleChange}
          placeholder="Agregar Recordatorio"
        />
        <Checkbox
          className="checkbox-recordatorio"
          name="prioridad"
          label="Prioridad Alta"
          onChange={(_, data) => {
            formik.setFieldValue("prioridad", data.checked);
          }}
        />
        <Button
          className="btn-recordatorio"
          type="submit"
          size="small"
          loading={formik.isSubmitting}
          onSubmit={formik.handleSubmit}
        >
          <img className="img-add-recordatorio" src={iconAdd} />
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
}
