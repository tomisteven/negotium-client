//crear y modificar usuarios
import React, {useCallback, useState} from "react";
import "./FormUsers.scss";
import { Form, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./FormUsers.form";
import { useDropzone } from "react-dropzone";
import {image} from "../../../../assets";
import {User} from "../../../../api";
import {useAuth} from "../../../../hooks";
import { ENV } from "../../../../utils";

const userController = new User();
export function FormUsers(props) {
    const { close, onReload, user} = props;
    const { accesToken } = useAuth(); //obtenemos el token del usuario

	//console.log(user);


    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]; //guardamos el primer archivo que se sube
        formik.setFieldValue("avatar", URL.createObjectURL(file)); //crea una url para mostrar la imagen
        formik.setFieldValue("fileAvatar", file); //mandamos el archivo al servidor
    }, []);

    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/jpeg, image/png",
        //noKeyboard: true,
        onDrop
    });

    const getAvatar = () => {
        if(formik.values.fileAvatar) {
            return formik.values.avatar;
        }
		else if(formik.values.avatar){
			return `${ENV.BASE_PATH}/${formik.values.avatar}`;
		}
		else {
            return image.noAvatar;
        }
    }

    //formulario de usuarios
	const formik = useFormik({
		initialValues: initialValues(user),
		validationSchema: validationSchema(user),
        validateOnChange: false,
		onSubmit: async (formData) => {
			try {
					if(user){
						await userController.updateUser(accesToken, user._id, formData);
						//onReload();
					} else {
						await userController.createUser(accesToken, formData);
					}
					onReload();
					close();
			} catch (error) {
				console.log(error);
			}
		},
	});

	const roleDropdown = [
		{ key: "admin", value: "admin", text: "Administrador" },
		{ key: "user", value: "user", text: "Usuario" },
	];

	return (
		<Form
			className='user-form'
			onSubmit={formik.handleSubmit}>
			<div className="user-form__avatar" {...getRootProps()}>
				<input {...getInputProps()} />
                <Image
                    src={getAvatar()}
                    avatar
                    size='small'
                />
			</div>

			<Form.Group widths='equal'>
				<Form.Input
					name='name'
					label='Nombre'
					placeholder='Nombre'
					onChange={formik.handleChange}
					value={formik.values.name}
                    error={formik.errors.name}
				/>
				<Form.Input
					name='lastname'
					label='Apellido'
					placeholder='Apellido'
					onChange={formik.handleChange}
					value={formik.values.lastname}
                    error={formik.errors.lastname}

				/>
			</Form.Group>

			<Form.Group widths='equal'>
				<Form.Input
					name='email'
					placeholder='Email'
					onChange={formik.handleChange}
					value={formik.values.email}
                    error={formik.errors.email}
				/>
				<Form.Dropdown
					name='role'
					placeholder='Selecciona un rol'
					options={roleDropdown}
					onChange={(e, data) =>
                        formik.setFieldValue("role", data.value) //setea el valor del campo role con el valor seleccionado en el dropdown
                    }
                    value={formik.values.role}
                    error={formik.errors.role}
				/>
			</Form.Group>

			<Form.Input
				name='password'
				type='password'
				placeholder='Contraseña'
				onChange={formik.handleChange}
                value={
					formik.values.password
				}
                error={formik.errors.password}
			/>

			<Form.Button loading={formik.isSubmitting}
				type='submit'
				primary>
				{user ? "Actualizar" : "Crear"}
			</Form.Button>
		</Form>
	);
}
