import React from 'react'
import  {HeaderAndItems}  from '../../Components/Client/HeaderAndItems/index.js';
import Footer from '../../pages/web/Footer/Footer.js';
import './ClientLayout.css';

export function ClientLayout(props) {
    const { children  } = props;
  return (
    <div className='client-layout'>
        <HeaderAndItems />
         {children}
         <Footer />
    </div>
  )
}
