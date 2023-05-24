import React, {useState} from 'react'
import HomeHeaderText from '../Home/Home-Header-Text/HomeHeaderText'
import MarginButton from '../Objetivos/MarginTop/MarginButton'
import MarginTop from '../Objetivos/MarginTop/MarginTop'
import {ContImg} from './ContImg/ContImg'
import { Button } from 'semantic-ui-react'

import archivos_img from '../../../assets/Negotium Assets/archivos.png'
import recordatorios_img from '../../../assets/Negotium Assets/recordatorios.png'

export function Nosotros() {

  const [zoom, setZoom] = useState(false)
  const [zoom2, setZoom2] = useState(false)

  const text = "Negotium es una empresa de consultoría y asesoría en negocios, que ofrece servicios de consultoría en estrategia, gestión y desarrollo de negocios, con el objetivo de ayudar a las empresas a alcanzar sus objetivos de negocio. Nuestra plataforma facilita la visualizacion de tu cartilla de clientes y proveedores, asi como la gestion de tus negocios y servicios. Tambien te permite la autoadministracion de los servicios de tus clientes, agendandose turnos y servicios de forma autonoma. Tabien se puede visualizar el historial de los servicios prestados y los pagos realizados. Las dedudas de los clientes se pueden visualizar en tiempo real y se pueden gestionar de forma automatica."

  return (
    <>
      <MarginTop heigth={"60px"} />
      <HomeHeaderText titulo={"Negotium como plataforma"} descripcion={text}/>
      <MarginButton mbutton={"25px"} height={"40px"} />
      <button onClick={()=>{setZoom(!zoom)}} style={{backgroundColor: "transparent", border: "none", width:"100%"}}>
        <ContImg img={archivos_img} zoomActive={zoom} alto={"350px"} ancho={"500px"} titulo={"Facturas / Archivos PDF"} descripcion={"Permite almacenar y visualizar PDF o facturas guardadas segun la fecha o Cliente, se podran crear acrchivos, editarlos y eliminarlos. Tambien se podra visualizar en un panel de control el total de los archivos, los completados y pendientes, tambien se podra filtrar por clientes o fechas."}/>
      </button>
      <MarginButton mbutton={"25px"} height={"40px"} />
      <button onClick={()=>{setZoom2(!zoom2)}} style={{backgroundColor: "transparent", border: "none", width:"100%"}}>
        <ContImg img={recordatorios_img} zoomActive={zoom2} alto={"350px"} ancho={"500px"} titulo={"Recordatorios / Alertas"} descripcion={"Permite crear y visualizar recordatorios y alertas para ver en el panel de control, se pueden editar, dar prioridad a las alertas y recordatorios, se podran eliminar e inactivar o completar las alertas"}/>
      </button>

      <MarginButton mbutton={"25px"} height={"40px"} />
    </>
  )
}
