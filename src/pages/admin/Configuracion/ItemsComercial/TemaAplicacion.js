import React from 'react'
import { Card, Button, Dropdown } from "semantic-ui-react";
import { useAuth } from "../../../../hooks";
import { RotatingTriangles } from "react-loader-spinner";
import Swal from "sweetalert2";


export default function TemaAplicacion({updateUser}) {

    const { user, accesToken } = useAuth(); //obtenemos el usuario logueado del contexto de autenticacion
    const [loading, setLoading] = React.useState(false);
    const [obscuro, setObscuro] = React.useState(user.obscuro);

    const options = [
        {
            key: "1",
            text: "Claro",
            value: false,
            icon: {
                name: "sun",
                color: "yellow",
            }
        },
        {
            key: "2",
            text: "Oscuro",
            value: true,
            icon: {
                name: "moon",
                color: "black",

            }
        },
    ];




  return (
    <>
    {
        loading ? (
            <Card className="card-loading">
                <RotatingTriangles
                    visible={true}
                    height="60"
                    width="60"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                />
            </Card>
        ) : (
            <Card style={{
                backgroundColor: user.obscuro ? "#3B4554" : "white",
            }} >
          <Card.Content>
            <Card.Header style={{color: user.obscuro ? "white" : "#000000"}}>Tema de pagina</Card.Header>
            <Card.Meta style={{color: user.obscuro ? "white" : "#000000"}}>
              Tema Obscuro o claro para el totalidad de la pagina
            </Card.Meta>
            <Card.Description>
              <Dropdown
                fluid
                selection
                className="button icon"
                placeholder="Seleccionar un tema"
                onChange={(e, data) => {
                    setObscuro(data.value);
                }}
                options={options}
              />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button onClick={
                    async() => {
                        setLoading(true);
                        await updateUser({obscuro : obscuro});
                        setLoading(false);
                        Swal.fire({
                            icon: "success",
                            title: "Tema actualizado",
                            text: "El tema de la pagina ha sido actualizado correctamente",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        window.location.reload();
                    }
              }
               color="green">
                Actualizar
              </Button>
              <Button  color="red">
                Cancelar
              </Button>
            </div>
          </Card.Content>
        </Card>
        )
    }
    </>
  )
}
