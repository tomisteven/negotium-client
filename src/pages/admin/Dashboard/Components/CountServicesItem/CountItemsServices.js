import React from 'react'
import "./countItemsServices.css"
import { Link } from "react-router-dom"
import { Icon } from 'semantic-ui-react'


export function CountItemsServices({colors, name,  cont1, cont2, img, imgUp, imgDown, imgSee, imgAdd, url_}) {
  return (
    <div className='container-cont-items' style={{background: colors}}>
        <div  className='cont-items-header'>
            <Icon name='cart' size='large'/>
            <h2 className='name-header-v2'>{name}</h2>
        </div>

        <div className='cont-2-bodys'>
            <div className='cont-body-info'>
                <h4 className='body-acumulacion'>Acumulacion</h4>
                <h3 className='cont-acumulacion'>$ {cont2}</h3>
            </div>
            <div className='cont-body-actions'>
                <h4 className='body-acumulacion'>Acciones</h4>
                <div className='body-acciones'>
                    <Link className="link-actions" to={url_}>
                        <img src={imgSee} className="img-up-v2" alt=""/>
                    </Link>
                    <Link className="link-actions" to={url_}>
                    <img className="img-up-v2" src={imgAdd} alt=""/>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
