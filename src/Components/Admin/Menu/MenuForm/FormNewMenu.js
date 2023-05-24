import React from 'react'
import { Form, Button, Input, Checkbox, Dropdown } from 'semantic-ui-react'
import { validationSchema, initialValues } from './FormNewMenu.form'
import { useFormik } from 'formik'
import { Menu } from '../../../../api'
import { useAuth } from '../../../../hooks'

const menuController = new Menu()
export function FormNewMenu(props) {

    const {accesToken} = useAuth()
    const {close, onReload, menu} = props

    //console.log(menu);
    const formik = useFormik({
        initialValues: initialValues(menu),
        validationSchema: validationSchema,
        //validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                const data = {
                    title: formData.title,
                    path: formData.protocol + formData.path,
                    order: formData.order,
                    active: formData.active
                }

                if(menu){
                    data.path = formData.path
                    await menuController.updateMenu(accesToken, menu._id, data)
                }
                else{
                    await menuController.createMenu(accesToken , data)
                }
                onReload()
                close()
            } catch (error) {
                console.log(error)
            }
        }
    })

    const options = [
        {key: "http://", value: "http://", text: "http://"},
        {key: "https://", value: "https://", text: "https://"},
        {key: "/" , value: "/", text: "/"}
    ]


  return (
    <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
            <Input name="title" error={formik.errors.title} onChange={formik.handleChange} value={formik.values.title} placeholder="Titulo" />
        </Form.Field>
        <Form.Field>
            <Input name="path" onChange={formik.handleChange} error={formik.errors.path} value={formik.values.path}  placeholder="URL" label={
                !menu
                ?
                    <Dropdown options={options} defaultValue="http://" onChange={(_, data) => formik.setFieldValue("protocol", data.value)}  />
                :
                    null

            } />
        </Form.Field>
        <Form.Field>
            <Input name="order" type='number' error={formik.errors.order} placeholder="Orden" onChange={formik.handleChange} value={formik.values.order} />
        </Form.Field>
        <Form.Field>
            <Checkbox name='active' error={formik.errors.active} onChange={(_,data)=> formik.setFieldValue("active", data.checked) } checked={formik.values.active}  label="Activo" />
        </Form.Field>
        <Button primary loading={formik.isSubmitting} type="submit">{menu ? "Actualizar menu" : "Crear menu"}</Button>
    </Form>
  )
}
