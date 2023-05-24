import React from "react";
import { Card, Input, Button } from "semantic-ui-react";
import { useAuth } from "../../../../hooks";
import { FidgetSpinner } from "react-loader-spinner";

export default function DeudasTotales({ updateUser}) {
  const { user, accesToken } = useAuth(); //obtenemos el usuario logueado del contexto de autenticacion

  const [loading, setLoading] = React.useState(false);
  const [deuda, setDeuda] = React.useState({ deudas: user.deudas });

  return (
    <>
      {loading ? (
        <Card className="card-loading">
          <FidgetSpinner
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
            <Card.Header style={{color: user.obscuro ? "white" : "#000000"}}>Deudas Totales</Card.Header>
            <Card.Meta style={{color: user.obscuro ? "white" : "#000000"}}>Total de deudas acumuladas por clientes</Card.Meta>
            <Card.Description>
              <Input
                onChange={(e) => setDeuda({ deudas: e.target.value })}
                labelPosition="left"
                label="$"
                value={deuda.deudas}
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
                        await updateUser(deuda);
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
