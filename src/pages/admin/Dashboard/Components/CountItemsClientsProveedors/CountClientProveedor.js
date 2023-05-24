import React from 'react'
import { Link, useAsyncValue } from "react-router-dom"
import "./ClientProveedor.css"
import "../CountServicesItem/responsive-panel.css"
import { Icon, Progress } from 'semantic-ui-react'

export function CountClientProveedor({colors, name, cont1, img, img_see, cont2, img_up, img_down, img_add, url_, icon, max_clients, max_proveedores}) {
  return (
    <div className='container-cont-items' style={{background: colors}}>
      <div  className='cont-items-header'>
            <Icon name={icon} size='large'/>
            <h2 className='name-header-v2'>{name}</h2>
        </div>

        <div className='cont-number-bodys'>
            <img className='img-down-body' src={cont1 > 5 ? img_up : img_down} alt=""/>
            <h4 className='name-body'>{cont1}</h4>
            <h4 className='name-body'>{name}</h4>
            <Link to={url_} className='link-add'>
              <img src={img_add} className="img-up-v4" alt=""/>
            </Link>
        </div>
        <div className='cont-progress-bodys'>
          <Progress className='progress' progress="percent" percent={Math.floor((cont1/max_clients)*100)} size='medium'  indicating />

        </div>
    </div>
  )
}
