import React, { useState } from "react";
import "./ServiceItem.css";
import { Button, Icon, Modal } from "semantic-ui-react";
import Swal from "sweetalert2";
import { Services } from "../../../../../api/service";
import { useAuth } from "../../../../../hooks";
import { BasicModal } from "../../../../../Components/Shared";
import FormServicesEdit from "./FormServicesModal/FormServicesEdit";
import { Progress } from "semantic-ui-react";

const servicesController = new Services();
export function ServiceItem({ item, onReload, number, backgroundProps }) {
  const [showModal, setShowModal] = useState(false);
  const onOpenCloseModal = () => {
    setShowModal((prev) => !prev);
  };

  const { accesToken } = useAuth();



  const deleteService = async (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await servicesController.deleteService(id, accesToken);
        if (response) {
          onReload();
          Swal.fire("Eliminado!", "El servicio ha sido eliminado.", "success");
          onReload();
        }
      }
    });
  };

  const toggleService = async (id) => {
    Swal.fire({
      title: item.habilitado
        ? "¿Deshabilitar servicio?"
        : "¿Habilitar servicio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: item.habilitado ? "Deshabilitar" : "Habilitar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await servicesController.toggleService(id, accesToken);
        if (response) {
          //onReload();
          Swal.fire(
            item.habilitado ? "Deshabilitado!" : "Habilitado!",
            item.habilitado
              ? "El servicio ha sido deshabilitado."
              : "El servicio ha sido habilitado.",
            "success"
          );
          onReload();
        }
      }
    });
  };

  return (
    <div
      className="cont-service-item"
      style={{
        backgroundColor: backgroundProps[number],
      }}
    >
      <div class="cont-img-1">
        <div
          class="circle"
          style={{
            background: "linear-gradient(90deg, #eab03c 0%, #aa85d1  100%)",
          }}
        >
          <h5 className="circle-text">{number}</h5>
        </div>
      </div>

      <div class="cont-info-2">
        <div class="info">
          <p
            className="info-text-nombre"
            style={{
              fontSize: item.nombre.length > 20 ? "13px" : "15px",
            }}
          >
            {item.nombre}
          </p>
          <p className="info-text-precio">Precio: ${item.precio}</p>
          <p className="info-text-clientes">Clientes:  {item.clientes}</p>
        </div>
        <div class="cont-progress-bodys-v2">
          <Progress
            className="progress"
            progress="precent"
            percent={Math.floor(item.clientes ? (item.clientes * 100) / 10 : 0)}
            size="small"
            color="green"
          />
        </div>
      </div>
      <div class="cont-actions-3">
      <button onClick={()=>toggleService(item._id)} className='btn-deshabilitar' >
        <Icon size="large"  name={item.habilitado ? 'unlock' : "lock"} color={item.habilitado == true ? "green" : "orange"} />
      </button>
      <button onClick={onOpenCloseModal} className='btn-deshabilitar' >
        <Icon size="large"  name='edit' color="blue" />
      </button>
      <button onClick={()=>deleteService(item._id)} className='btn-deshabilitar' >
        <Icon size="large" name='delete' color="red" />
      </button>
      </div>
      <BasicModal
      show={showModal}
      close={onOpenCloseModal}
      title='Crear Usuario'
      size='small'>
      <FormServicesEdit
        token = {accesToken}
        item={item}
        close={onOpenCloseModal}
        onReload={onReload}
      />
    </BasicModal>
    </div>
  );
}

{
  /* <div className='cont-service-item'>
    <div className='service-nombre'>
      <h5 className='name-service'>{item.nombre}</h5>
    </div>
    <div className='precio-service'>
      <h4 className='text-precio-1'><span className='punto'>·</span>  Precio: </h4>
      <h5 className='text-precio-2'>${item.precio}</h5>
    </div>
    <div className='clientes-service'>
      <h4 className='text-precio-3'> <span className='punto'>·</span> Clientes: </h4>
      <h5 className='text-precio-2'>{item.clientes}</h5>
    </div>
    <div className='actions-service'>
      <button onClick={()=>toggleService(item._id)} className='btn-deshabilitar' >
        <Icon size="large"  name={item.habilitado ? 'unlock' : "lock"} color={item.habilitado == true ? "green" : "orange"} />
      </button>
      <button onClick={onOpenCloseModal} className='btn-deshabilitar' >
        <Icon size="large"  name='edit' color="blue" />
      </button>
      <button onClick={()=>deleteService(item._id)} className='btn-deshabilitar' >
        <Icon size="large" name='delete' color="red" />
      </button>

    </div>
    <BasicModal
      show={showModal}
      close={onOpenCloseModal}
      title='Crear Usuario'
      size='small'>
      <FormServicesEdit
        token = {accesToken}
        item={item}
        close={onOpenCloseModal}
        onReload={onReload}
      />
    </BasicModal>
  </div> */
}
