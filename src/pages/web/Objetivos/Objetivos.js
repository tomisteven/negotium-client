import React from 'react'
import HomeHeaderText from '../Home/Home-Header-Text/HomeHeaderText'
import MarginTop from './MarginTop/MarginTop'
import MembresiasCont from './MembresiasCont/MembresiasCont'


export function Objetivos() {

  const data = {
    titulo: "Objetivos",
    descripcion: "Negotium es una plataforma que te permite crear y gestionar tus propios cursos online, con la posibilidad de monetizarlos y obtener ingresos de forma pasiva. Además, podrás crear tu propia comunidad de alumnos y compartir tus conocimientos con el mundo."
  }


  return (
    <div>
      <MarginTop/>
      <HomeHeaderText titulo={data.titulo} descripcion={data.descripcion}/>
      <MarginTop/>
      <HomeHeaderText titulo="Membresias Negotium" />
      <MembresiasCont />
      <MarginTop/>
    </div>
  )
}
