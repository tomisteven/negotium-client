import React from 'react'
import "./HomeDescription.css"

export default function HomeDescription({titulo, descripcion, imagen, active, onclick}) {
  return (
    <>
        <div className="home-description">
            <div  className='cont-img-description' style={
              active ? {width:"90%"} : {width:"40%"}
            }>
                <img  className='img-description' src={imagen} alt = "imagen" />
            </div>
            <div className='cont-description' style={
              {}
            }>
                <h2 className='titulo-description'>{titulo}</h2>
                <p className='decription-description'>{descripcion}</p>
            </div>
        </div>
    </>
  )
}
