import React from "react";
import { useAuth } from "../../../../hooks";
import { Dna } from "react-loader-spinner";
import { Card, Input, Button, Dropdown } from "semantic-ui-react";

export default function ServiciosUsados({ updateUser }) {
  const { user, accesToken } = useAuth(); //obtenemos el usuario logueado del contexto de autenticacion
  const [loading, setLoading] = React.useState(false);
  const [serviciosUsados, setServiciosUsados] = React.useState({
    totalServiciosUsados: user.totalServiciosUsados,
  });

  return (
    <>
      {loading ? (
        <Card className="card-loading">
          <Dna
            visible={true}
            height="80"
            width="80"
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
            <Card.Header style={{color: user.obscuro ? "white" : "#000000"}}>Total de servicios usados</Card.Header>
            <Card.Meta style={{color: user.obscuro ? "white" : "#000000"}}>
              Total de los servicios consumidos por clientes
            </Card.Meta>
            <Card.Description>
              <Input
              onChange={(e) => setServiciosUsados({totalServiciosUsados: e.target.value})}
                value={serviciosUsados.totalServiciosUsados}
                type="text"
                placeholder="Valor"
              />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button onClick={
                    async() => {
                        setLoading(true);
                        await updateUser(serviciosUsados);
                        setLoading(false);
                    }
              }  color="green">
                Actualizar
              </Button>
              <Button  color="red">
                Cancelar
              </Button>
            </div>
          </Card.Content>
        </Card>
      )}
    </>
  );
}
