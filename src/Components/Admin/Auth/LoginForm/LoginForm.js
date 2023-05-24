import React from 'react'
import {Form} from "semantic-ui-react"
import {useFormik} from "formik"
import { initialValues, validationSchema} from "./LoginForm.form"
import { Auth } from '../../../../api'
import {useAuth} from "../../../../hooks"
import "./loginForm.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const authController = new Auth();

export function LoginForm() {

    const {login} = useAuth(); //obtenemos la funcion de login del contexto de autenticacion

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),

        onSubmit: async(formData) => {
            try {
                //traemos el token de la api
                const response = await authController.loginForm(formData);
                if(!response) {
                    toast("Contraseña o email incorrectos", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: "dark"
                    });
                }
                //console.log(response);
                login(response.accessToken); //logueamos al usuario

                authController.setAccessToken(response.accessToken); //guardamos el token en el localstorage
                authController.setRefreshToken(response.refreshToken); //guardamos el token en el localstorage

            } catch (error) {
                console.log(error);
            }
        }
    })

  return (
    <>
    <Form onSubmit={formik.handleSubmit}>
        <Form.Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
        />
        <Form.Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
        />

        <Form.Button color='instagram' fluid loading={formik.isSubmitting} type="submit">Login</Form.Button>
    </Form>
    <ToastContainer />
    </>
  )
}
