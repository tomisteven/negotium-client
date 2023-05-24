import React from 'react'
import { Modal, Button, Form, Input, Select, Dropdown } from 'semantic-ui-react'
import { number } from 'yup/lib/locale'
import { Client } from '../../../../api/client'
import { ToastContainer, toast } from 'react-toastify'

const clientController = new Client()
export default function ModalAnularDeuda({setModalAnularDeuda, ModalAnularDeuda, client, changeState, openModalDeuda, token}) {
    const [cargando, setCargando] = React.useState(false)
    const [monto, setMonto] = React.useState({
        deuda: 0,
        resta: true
    })

    const optionsDeuda = [
        {key: "Restar", value: true, text: "Restar"},
        {key: "Sumar", value: false, text: "Sumar"},
    ]

    const anularDeuda = async (value) => {
        console.log(value);
          try {
            setCargando(true)
            const response = await clientController.anularDeuda(token, client._id, value)
            if(response){
                toast.success("Deuda Anulada Correctamente",{ theme: "colored", autoClose: 1500})
                setTimeout(() => {
                    setCargando(false)
                    changeState()
                    setModalAnularDeuda(false)
                    setMonto({
                        deuda: 0,
                        resta: true
                    })
                }, 2000);


            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <Modal
        size="tiny"
        open={openModalDeuda}
        onClose={() => setModalAnularDeuda(false)}
        onOpen={() => setModalAnularDeuda(true)}
        >
        <Modal.Header>Editar Deuda? </Modal.Header>
        <Modal.Header>Deuda Actual ${client.deudaTotal} </Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Field>
                    <label>Monto Especifico</label>
                    <Input
                        focus
                        fluid
                        type="number"
                        name="monto"
                        label={<Dropdown defaultValue={"Restar"} onChange={
                            (e, data) => {
                                setMonto({
                                    deuda: monto.deuda,
                                    resta: data.value
                                })
                            }
                        } options={optionsDeuda} />}
                        placeholder="Monto a Agregar/Restar"
                        onChange={(e) => setMonto({
                            deuda: e.target.value,
                            resta: monto.resta
                        })}
                    />
                </Form.Field>
                <Form.Field>
                <label>Para anular la totalidad de la deuda hacer Clieck en "Anular Completa"</label>
                <Button
                        onClick={() => {anularDeuda({deuda: client.deudaTotal, resta: true})}}
                        content = { cargando ? "Anulando..." : "Anular Deuda Completa"}
                        color="red"
                        type="submit"
                    />
                </Form.Field>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button color='black' onClick={() => setModalAnularDeuda(false)}>
                Cancelar
            </Button>
            <Button
                content={cargando ? "Anulando..." : "Anular Deuda"}
                labelPosition='right'
                icon={cargando ? "spinner" : "checkmark"}
                positive
                onClick={() => anularDeuda(monto)}
            />
        </Modal.Actions>
    </Modal>
    <ToastContainer />
    </>
  )
}
