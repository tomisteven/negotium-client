import React from 'react'
import "./ListRecordatorios.css"
import { Button,Checkbox,Radio } from 'semantic-ui-react'
import Toggle from 'react-toggle'
import { Link } from 'react-router-dom'
import { Recordatorios } from '../../../../../api/recordatorios'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const recordatoriosController = new Recordatorios()
export function ListRecordatorios({img_pendiente, img_prioridad, img_alert, recordatorios, img_baja, sinrecordatorios, img_see, onReload, token, obscuro}) {


  const toggleRecordatorio = async (id, state) => {
      try {
        const response = await recordatoriosController.toggleRecordatorio(id, token)
         if(response){
          toast(response.state === true ? "Recordatorio Completado" : "Recordatorio Pendiente", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "light"
        })
        }else{
          toast("Error al completar recordatorio", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark"
          })
          onReload()
        };
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <>

      <div className='recordatorios-v2' style={{
        backgroundColor: obscuro ? '#46505E' : '#fff',
        boxShadow: obscuro ? '0px 0px 2px 0px #fff' : '0px 0px 2px 0px #46505E'
      }}>
        <div className='recordatorios-header' >
          <img className='alert-img-header' src={img_alert} alt=""/>
          <div className='div-prioridad-pendiente' style={{
          backgroundColor: obscuro ? '#46505E' : '#fff',
          }}>
            <img className='img-header-recordatorios' src={img_prioridad} alt=""/>
            <h5 className='text-header-recordatorios' style={{
          color: obscuro ? '#fff' : '#000',
        }}>Prioridad Alta</h5>
          </div>
          <div className='div-prioridad-pendiente' style={{
          backgroundColor: obscuro ? '#46505E' : '#fff',
        }}>
            <img className='img-header-recordatorios'  src={img_pendiente} alt=""/>
            <h5  className='text-header-recordatorios' style={{
          color: obscuro ? '#fff' : '#000',
        }}>Prioridad Baja</h5>
          </div>
          <div className='div-prioridad-pendiente-v2' >
            <Link to={"/admin/recordatorios"}>
              <img className='img-view-recordatorios' src={img_see} alt=""/>
            </Link>
          </div>
        </div>
        <div className='list-recordatorios'>
        {
          recordatorios.length > 0 ? recordatorios.map((recordatorio, index) => {
            return (
              <div className='recordatorio-item' key={index}>
                <img className='img-item' src={recordatorio.prioridad == "Alta" ? img_prioridad : img_baja} alt=""/>
                <div className='recordatorio-header'>
                  <h5 className='recordatorio-description'>{recordatorio.descripcion}</h5>
                </div>
              <Toggle defaultChecked={recordatorio.completed} onChange={()=> toggleRecordatorio(recordatorio._id, recordatorio.completed )} className='custom-classname'/>
              </div>
            )
        })
        :
        <div className='list-recordatorios-v2'>
          <h5 className='text-no-recordatorios'>No hay recordatorios</h5>
          <img className='sin-recordatorios' src={sinrecordatorios} alt=""/>
        </div>

        }
      </div>
      </div>
      <ToastContainer />

    </>
  )
}
