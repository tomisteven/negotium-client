import React from 'react'
import './membresiasCont.css'
import MembresiaItem from './MembresiaItem/MembresiaItem'
import MarginButton from '../MarginTop/MarginButton'


export default function MembresiasCont() {

  const items =
    {
      free: [
        {
          text: "Hasta 15 Clientes"
        },
        {
          text: "Hasta 7 Servicios"
        },
        {
          text: "Hasta 3 Proveedores"
        }],
      standar: [
        {
          text: "Hasta 25 Clientes"
        },
        {
          text: "Hasta 12 Servicios"
        },
        {
          text: "Soporte Mensual",
        },
        {
          text: "Home Page Clientes"
        },
      ],
      premmium: [
        {
          text: "Clientes Ilimitados"
        },
        {
          text: "Servicios Ilimitados"
        },
        {
          text: "Provedores Ilimitados"
        },{
          text: "Soporte 16/7"
        },
        {
          text: "Home Page Clientes y Servicios"
        },
        {
          text: "Recordatorios Ilimitados"
        },
        {
          text: "Alertas Ilimitados"
        }]
    }

    const gradientFree = 'linear-gradient(to right, #F7C1B0, #FF7F09)';
    const gradientPremium = 'linear-gradient(to left, #A1FF67, #1E7958)';
    const gradientStandart = 'linear-gradient(to right, #ffae00, #e5df2d)';


  return (
    <>
    <div className='membresias-cont'>
      <div className="membresia-cont">
        <MembresiaItem titulo="Free" items={items.free} color={gradientFree} />
        <MembresiaItem titulo="Standar" items={items.standar} color={gradientStandart} />
        <MembresiaItem titulo="Premmium" items={items.premmium} color={gradientPremium} />
      </div>
    </div>
      <MarginButton height={"50px"} mbutton={"30px"} />
      </>
  )
}
