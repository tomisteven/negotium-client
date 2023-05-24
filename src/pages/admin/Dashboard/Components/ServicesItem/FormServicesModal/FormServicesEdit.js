import React from "react";
import { Form, Button, Input, Select } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./FormServicesEdit.form";
import { Services } from "../../../../../../api/service";

const serviceController = new Services();
export default function FormServicesEdit({ item, onReload, token }) {
  const formik = useFormik({
    initialValues: initialValues(item),
    validationSchema: validationSchema(item),
    onSubmit: async (formData) => {
      try {
        const response = await serviceController.updateService(item._id, formData , token);
        if (response) {
          onReload();
        }

      } catch (error) {
        console.log(error);
      }
    },
  });

  const optionsValues = [
    { key: "Habilitado", text: "Habilitado", value: "Habilitado" },
    { key: "Deshabilitado", text: "Deshabilitado", value: "Deshabilitado" },
  ];

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
          <label>Nombre del servicio</label>
          <Input
            name="nombre"
            onChange={formik.handleChange}
            value={formik.values.nombre}
            placeholder="Nombre del servicio"
          />
        </Form.Field>
        <Form.Field>
          <label>Descripcion</label>
          <Input
            name="descripcion"
            onChange={formik.handleChange}
            value={formik.values.descripcion}
            placeholder="Precio"
          />
        </Form.Field>
        <Form.Field>
          <label>Precio</label>
          <Input
            name="precio"
            onChange={formik.handleChange}
            value={formik.values.precio}
            placeholder="Precio"
          />
        </Form.Field>
        <Form.Field>
          <label>Cantidad Clientes</label>
          <Input
            name="clientes"
            value={formik.values.clientes}
            disabled={true}
            placeholder="Cantidad Clientes"
          />
        </Form.Field>
        <Form.Field>
          <label>Estado</label>
          <Select
            name="habilitado"
            onChange={(e, { value }) => {
              formik.setFieldValue(
                "habilitado",
                value == "Habilitado" ? true : false
              );
            }}
            value={formik.values.habilitado ? "Habilitado" : "Deshabilitado"}
            options={optionsValues}
          />
        </Form.Field>
        <Button loading={formik.isSubmitting} primary type="submit">
          Actualizar
        </Button>
      </Form>
    </>
  );
}
