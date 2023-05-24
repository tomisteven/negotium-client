import React from "react";
import { Modal, Button, Input, Label, Select, Image ,Form} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Services } from "../../../../api/service";
import { Client } from "../../../../api/client";
import { useAuth } from "../../../../hooks/useAuth";
import "./index.css";
import { toast, ToastContainer } from "react-toastify";



const serviceController = new Services();
const clientController = new Client();
export default function ModalAgregarServicio({
  open,
  setOpenModalServicio,
  setOpenModalClient,
  client,
  avatarF,
  avatarM,
  changeState,
  future,
}) {
  const { accesToken } = useAuth();
  const [services, setServices] = React.useState([]);

    const generateOptionHora = () => {
        let options = [];
        for (let i = 5; i < 24; i++) {
          if(i<10){
            options.push({
                key: i,
                value: i,
                text: "0"+i,
            });
          }else{
            options.push({
                key: i,
                value: i,
                text: i,
            });
          }
        }
        options.push({
            key: 25,
            value: 0,
            text: "00",
        });
        return options;
    };
    const generateOptionMinutos = () => {
        let options = [];
        for (let i = 5; i < 60; i+=5) {
          if(i<10){
            options.push({
                key: i,
                value: i,
                text: "0"+i,
            });
          }else{
            options.push({
                key: i,
                value: i,
                text: i,
            });
          }

        }
        options.push({
            key: 65,
            value: 0,
            text: "00",
        });
        return options;
    };


  React.useEffect(() => {
    serviceController.getServices(accesToken).then((res) => {
      const data = res.map((service) => {
        return {
          key: service._id,
          value: service.nombre,
          text: service.nombre,
        };
      });
      setServices(data);
    });
  }, []);

  //console.log(services);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      fecha: "",
      hora : "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      precio: Yup.number().required("El precio es obligatorio"),
      fecha: Yup.date().required("La fecha es obligatoria"),
    }),
    onSubmit: async (formData) => {
      try {
        //console.log(formData);
        //console.log(formData.valorHora + ":" + formData.valorMinuto);
        const strHora = future ? formData.valorHora.toString() : "";
        const strMinuto = future ? formData.valorMinuto.toString() : "";
        //console.log(strHora.length);
        console.log(new Date(formData.fecha).toISOString());
         const dataService = {
          nombre: formData.nombre,
          precio: formData.precio,
          fecha: new Date(formData.fecha).toISOString(),
        };
         const dataServiceFuture = {
          nombre: formData.nombre,
          precio: formData.precio,
          fecha: new Date(formData.fecha + " " + strHora + ":" + strMinuto).toISOString(),
        };

        //console.log(dataServiceFuture);
         const res = future ? await clientController.addServiceFuture(dataServiceFuture, accesToken, client._id) : await clientController.addService(dataService, accesToken, client._id);
        if (res) {
          changeState();
          setOpenModalServicio(false);
          setOpenModalClient(false);
          toast("Servicio agregado correctamente", {
            position: toast.POSITION.TOP_RIGHT,
            type: "success",
            theme: "colored",
          });
        }


        //console.log(data);

      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
    <Modal
      onOpen={() => setOpenModalServicio(true)}
      open={open}
      onClose={() => setOpenModalServicio(false)}
      size="tiny"
      closeIcon
    >
      <Modal.Header>{future ? "Agregar Servicio Futuro" : "Agregar Servicio realizado"}</Modal.Header>
      <Modal.Content>
        <div className="modal-content-image">
          <p>
            Cliente:{" "}
            <span className="name-client-modal">
              {client.nombre} {client.apellido}
            </span>
          </p>
          <Image
            className="img-client-modal"
            src={client.sexo === "Masculino" ? avatarM : avatarF}
            size="small"
            circular
          />
        </div>
      </Modal.Content>
      <Modal.Content>
        <Form  onSubmit={formik.handleSubmit}>
          <div className="form__field">
            <Select
              fluid
              type="text"

              name="nombre"
              placeholder="Nombre del servicio"
              options={services}
              onChange={
                (e, data) => {
                    formik.setFieldValue("nombre", data.value);
                    }
              }

            />
          </div>
          <div className="form__field">
            <Input
              focus
              fluid
              type="number"
              name="precio"
              label={{ basic: true, content: "$" }}
              placeholder="Precio del servicio"
              value={formik.values.precio}
              onChange={formik.handleChange}

            />
          </div>
          <div className="form__field">
            <Input
              focus
              fluid
              type="date"
              name="fecha"
              placeholder="Fecha del servicio"
              value={formik.values.fecha}
              onChange={formik.handleChange}

            />
          </div>
          {
            future && (
              <div className="form__field_row">
            <Select
              fluid
              type="text"

              name="valorHora"
              placeholder="Hora"
              options={generateOptionHora()}
              onChange={
                (e, data) => {
                    formik.setFieldValue("valorHora", data.value);
                    }
              }

            />
            <Select
              fluid
              type="text"
              name="valorMinuto"
              placeholder="Minuto"
              options={generateOptionMinutos()}
              onChange={
                (e, data) => {
                    formik.setFieldValue("valorMinuto", data.value);
                    }
              }
            />
          </div>
            )
          }

          <div className="form__field">
            <Button type="submit" loading={formik.isSubmitting} primary>
              Agregar
            </Button>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpenModalServicio(false)}>
          Cancelar
        </Button>
      </Modal.Actions>
    </Modal>

<ToastContainer />
</>
  );
}
