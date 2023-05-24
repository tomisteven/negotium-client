import React from "react";
import img_baja from "../../../assets/Negotium Assets/baja.png";
import img_prioridad from "../../../assets/Negotium Assets/priority.png";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { Button, Icon, Label } from "semantic-ui-react";
import sweetAlert from "sweetalert2";
import Loading from "../../../Components/Admin/Loader/Loading";

export default function ItemRecordatorio({
  recordatorio,
  accesToken,
  onReload,
  formatFecha,
  setOpen,
  setRecordatorio,
  recordatoriosController,
  obscuro,
  setLoading,
}) {
  const deleteRecordatorio = async () => {
    const result = await sweetAlert.fire({
      title: "¿Estas seguro?",
      text: "¡No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#96b7ea",
      cancelButtonColor: "#d33",
    });
    if (result.isConfirmed) {
      await recordatoriosController.deleteRecordatorio(
        recordatorio._id,
        accesToken
      );
      onReload();
      await sweetAlert.fire(
        "Eliminado!",
        "El recordatorio ha sido eliminado.",
        "success"
      );
    }
  };

  const completarRecordatorio = async (id, accesToken) => {
    const result = await sweetAlert.fire({
      title: "¿Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
    if (result.isConfirmed) {
      setLoading(true);
      await recordatoriosController.toggleRecordatorio(id, accesToken);
      await sweetAlert.fire(
        "Completado!",
        "El recordatorio ha sido completado.",
        "success"
      );
      setLoading(false);
      onReload();
    }
  };




  return (
    <div
      className="item-cont"
      key={recordatorio._id}
      style={{
        backgroundColor: obscuro ? "#689ded" : "#ffffff",
      }}
    >
      <div className="item-img">
        <img
          src={recordatorio.prioridad ? img_prioridad : img_baja}
          alt="img"
          className="item-img-img"
        />
      </div>
      <div className="item-info" style={{
        backgroundColor: recordatorio.completed ? "#b3e0c8" : "#f9caca",
      }}>
        <div class="nombre-description">
        <div
          className="item-title"
          style={{
            color: obscuro ? "#b7b7b7" : "rgba(0, 0, 0, 0.605)",
          }}
        >
          {recordatorio.nombre.toUpperCase()}
        </div>
        <div
          className="item-desc"
          style={{
            color: obscuro ? "#ffffff" : "#000000",
            fontSize: "1.05rem",
          }}
        >
          {recordatorio.descripcion}
        </div>
        </div>
        <div class="cont-fechas">
          <div
            className="item-fecha"
            style={{
              color: obscuro ? "#ffffff" : "#000000",
            }}
          >
            Fecha de Creacion: {formatFecha(recordatorio.fecha)}
          </div>
          <div
            className="item-fecha-caducada"
            style={{
              color: obscuro ? "#000000" : "#000000",
              fontSize: "1.05rem",
            }}
          >
            Fecha Limite: {formatFecha(recordatorio.fechaLimite)}
          </div>
        </div>
      </div>

      <div class="item-actions">
        <div className="cont-completado-pendiente" style={
          recordatorio.completed ? {backgroundColor: "#00b5ad"} : {backgroundColor: "#db2828"}
        }>
          <h5>{recordatorio.completed ? "Completado" : "Pendiente"}</h5>
        </div>
        <Button
          icon={recordatorio.completed ? "check" : "close"}
          size="large"
          circular
          color={recordatorio.completed ? "green" : "red"}
          className="btn-delete"
          onClick={() => {
            completarRecordatorio(recordatorio._id, accesToken);
          }}
        />
        <Button
          icon
          size="large"
          circular
          primary
          onClick={() => {
            setOpen(true);
            setRecordatorio(recordatorio);
          }}
          className="btn-delete"
        >
          <Icon name="edit" />
        </Button>
        <Button
          icon
          size="large"
          circular
          color="youtube"
          className="btn-delete"
          onClick={deleteRecordatorio}
        >
          <Icon name="trash" />
        </Button>
      </div>
    </div>
  );
}


