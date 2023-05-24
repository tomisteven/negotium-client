import React, {useState} from 'react'
import { Card, Input, Button, Dropdown } from 'semantic-ui-react'
import { useAuth } from '../../../../hooks'
import { Dna } from 'react-loader-spinner'
import "./RecaudacionGlobal.css"

export default function RecaudacionGlobal({updateUser}) {

    const { user, accesToken } = useAuth(); //obtenemos el usuario logueado del contexto de autenticacion
    const [loading, setLoading] = useState(false);
    const [recaudado, setRecaudado] = useState({recaudado: user.recaudado});



  return (
    <>
    {
        loading ? (
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
            }}>
              <Card.Content>
                <Card.Header style={{color: user.obscuro ? "white" : "#000000"}}>Recaudacion Global</Card.Header>
                <Card.Meta style={{color: user.obscuro ? "white" : "#000000"}}>
                  Total de los gastos consumidos por clientes
                </Card.Meta>
                <Card.Description>
                  <Input
                    onChange={(e) => setRecaudado({recaudado: e.target.value})}
                    labelPosition="left"
                    label="$"
                    value={recaudado.recaudado}
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
                            await updateUser(recaudado);
                            setLoading(false);
                        }

                  }  color="green">
                    Actualizar
                  </Button>
                  <Button onClick={
                        () => {setRecaudado({recaudado: user.recaudado})}
                       }  color="red">
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
