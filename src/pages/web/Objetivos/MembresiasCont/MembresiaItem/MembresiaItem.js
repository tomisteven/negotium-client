import React from 'react'
import { Icon } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

export default function MembresiaItem({titulo, color, items}) {
    

  return (

        <div className="membresia-item" style={{background : color, }}>
            <div className='membresia-title'>
                <h2 className='m-title'>{titulo}</h2>
            </div>
            <div className="membresia-text">
                {
                    items ? (items.map((item, index) => (
                        <div className="m-item" key={index}>
                            <Icon name="check" />
                            <p>{item.text}</p>
                        </div>
                    ))) : null
                }
            </div>
            <div className='cont-button'>
                <Link className='membresia-btn' to="/admin">
                    <p>Comprar</p>
                </Link>
            </div>
        </div>

  )
}

