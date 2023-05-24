import * as Yup from 'yup';

export function initialValues(service) {
    return {
        nombre: service?.nombre || '',
        descripcion: service?.descripcion || '',
        precio: service?.precio || '',
        habilitado: service?.habilitado || '',
    };
}

export function validationSchema(service) {
    return Yup.object({
        nombre: Yup.string().required(true),
        descripcion: Yup.string().required(true),
        precio: Yup.string().required(true),
        habilitado: Yup.string().required(true),
    });
}