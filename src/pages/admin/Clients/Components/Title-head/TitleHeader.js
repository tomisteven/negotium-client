import React from 'react'
import { Icon } from 'semantic-ui-react'

export default function TitleHeader({valueFilter, img, title, icon, iconColor, obscuro}) {
  return (
    <div className="cont-titulo-header" >
          {/* <img className="img-header-services" src={img} alt="" /> */}
          <Icon className="img-header-services" name={icon} color={
            obscuro ? "white" : "black"
          } size="big" />
          <h1 style={{
            color: obscuro ? "#ffffff" : "#000000"
    }} className="title-header">{title} / {valueFilter}</h1>
        </div>
  )
}
