import React from 'react'
import { Menu, Icon, Button } from 'semantic-ui-react'
import "./Logout.css"

export function Logout({logout}) {
  return (
    <button className='btn-logout' onClick={logout}>
        <Icon size="big"   name='log out' />
    </button>
  )
}
