import React from 'react'
import MarginTop from '../Objetivos/MarginTop/MarginTop'
import { Button,Form, TextArea,Input } from 'semantic-ui-react'
import './contacto.css'
import {useFormik} from 'formik'
import { initialValues, validationSchema } from './contactForm.form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Contacto() {

  const notify = () => toast("Perfecto, Consulta enviada!");


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      try {
        console.log(formData);
        const response = await fetch('http://localhost:8080/support/messages/new', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
         })
        const data = await response.json()
         if (data) {
          notify()
          formData.name = ''
          formData.email = ''
          formData.asunto = ''
          formData.apellido = ''
          formData.message = ''
         }
      }
      catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <>
    <MarginTop heigth={"50px"} />

    <div className="cont-contacto">
        <div className='form-ui'>
          <div class="title-contact">
            <h1 className='contact-title'>Contacto</h1>
          </div>
          <Form onSubmit={formik.handleSubmit} >
              <Form.Field>
                <Input placeholder='Nombre' name="name" value={formik.values.name} onChange={formik.handleChange} />
              </Form.Field>
              <Form.Field >
                <Input placeholder='Email' name="email" error={formik.errors.email} value={formik.values.email } onChange={formik.handleChange} />
              </Form.Field>
              <Form.Field >
                <Input placeholder='Asunto' name="asunto" error={formik.errors.asunto} value={formik.values.asunto} onChange={formik.handleChange} />
              </Form.Field>
              <Form.Field >
                <Input placeholder='Apellido' error={formik.errors.apellido}  name="apellido" value={formik.values.apellido} onChange={formik.handleChange} />
              </Form.Field>
              <Form.Field>
                <TextArea placeholder='Mensaje' name="message" error={formik.errors.message} value={formik.values.message} onChange={formik.handleChange} />
              </Form.Field>
              <Button loading={formik.isSubmitting} type='submit'>Submit</Button>
          </Form>
          <ToastContainer />
        </div>
        <div className='cont-info'>
          <div className='info'>
            <h1 className='info-title'>Información</h1>
            <h3>Email: negotiumSupport@hotmail.com</h3>
            <h3>Horario: 8:00 a 19pm</h3>
            <h3>Tiempo estimado de respuesta: 40minutos</h3>
          </div>
        </div>
    </div>
        <MarginTop heigth={"100px"} />
    </>
  )
}
