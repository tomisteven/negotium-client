import React from 'react'
import './ContImg.css'

export function ContImg({img, ancho, alto, titulo, descripcion, zoomActive}) {
  return (
    <div className='cont-img'>
        <img style={
            zoomActive ? {width: "1000px", height: "700px", cursor: 'zoom-out'} : {width: ancho, height: alto, cursor: 'zoom-in'}
        }  src={img} alt=""/>
        <div className='m-top'>
            <h1>{titulo}</h1>
            <p className='p-descripcion'>{descripcion}</p>
        </div>
    </div>
  )
}
