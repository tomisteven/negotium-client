import React from 'react'
import { Icon } from 'semantic-ui-react'
import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (

      <div class="footer-icons">
          <p className='p-created'>Created by: Tomas Steven</p>
          <Link className='link-color'  >
            <Icon name='facebook'  size='big'></Icon>
          </Link>
          <Link className='link-color' >
              <Icon name='instagram' size='big' />
          </Link>
          <Link className='link-color' >
            <Icon name='twitter' size='big' />
          </Link>
          <Link className='link-color' >
            <Icon name='youtube' size='big' />
          </Link>
          <p>© 2022 - 2023</p>
      </div>


  )
}
