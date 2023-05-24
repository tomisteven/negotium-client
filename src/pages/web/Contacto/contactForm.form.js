import * as Yup from 'yup';

export function initialValues(){
    return {
        email: '',
        name: '',
        apellido: '',
        message: '',
        asunto : ''
    }
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email(true).required(true),
        name: Yup.string().required(true),
        apellido: Yup.string().required(true),
        message: Yup.string().required(true),
        asunto: Yup.string().required(true)
    })
}
