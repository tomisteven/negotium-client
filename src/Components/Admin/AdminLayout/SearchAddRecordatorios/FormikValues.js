import * as Yup from 'yup';

export function initialValues() {
  return {
    nombre: "",
    descripcion: "",
    prioridad: "",
  };
}


export function validationSchema() {
    return Yup.object({
        nombre: Yup.string().required("Campo obligatorio"),
        descripcion: Yup.string().required("Campo obligatorio"),
        prioridad: Yup.boolean()
    });
    }
