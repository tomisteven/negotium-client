import React from 'react'
import  {Tab, Button} from 'semantic-ui-react'
import { BasicModal } from '../../../Components/Shared'
import "./courses.scss"
import {map} from 'lodash'


export function Courses() {
  const [showModal, setShowModal] = React.useState(false)

  const openModal = () => setShowModal(!showModal)

  const panes = [{
    id: 1,
    menuItem: 'Cursos Activos'
  }, {
    id: 2,
    menuItem: 'Cursos Inactivos'
  },{
    id: 3,
    menuItem: 'Todos los Cursos'
  }]

  return (
    <>
      <div className="courses-page">
        <div className="courses-page__add">
          <Button primary onClick={openModal}>Nuevo Curso</Button>
        </div>

          <Tab.Pane attached={false}>
             {
                map(panes, (pane) => (
                  <div key={pane.id}>
                    <h5>{pane.menuItem}</h5>
                  </div>
                ))
             }
          </Tab.Pane>
      </div>

      <BasicModal show={showModal} close={openModal} title="Crear Curso" >
        <h1>Formulario de Creacion de Curso</h1>
      </BasicModal>


    </>
  )
}
