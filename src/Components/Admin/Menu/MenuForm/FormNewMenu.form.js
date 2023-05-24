import * as Yup from 'yup';

export function initialValues(menu){
    return {
        path: menu?.path || '',
        title:  menu?.title || '',
        order: menu?.order || undefined,
        active: menu?.active || false,
        protocol: menu?.protocol || 'http://'
    }
}

export function validationSchema() {
    return Yup.object({
        path: Yup.string().required(true),
        title: Yup.string().required(true),
        order: Yup.number().required(true),
        active: Yup.boolean().required(true),
        protocol: Yup.string().required(true)
    })
}

