import React from 'react'
import { Table } from 'semantic-ui-react'

export default function ListServices({service, onReload}) {
    //console.log(service);
  return (
    <>
        <Table>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>{service.nombre}</Table.Cell>
                    <Table.Cell>{service.descripcion}</Table.Cell>
                    <Table.Cell>{service.precio}</Table.Cell>
                    <Table.Cell>{service.habilitado ? "Activo" : "Inactivo"}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </>
  )
}
