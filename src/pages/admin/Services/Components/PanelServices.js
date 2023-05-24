import React from "react";
import "./servicesPanel.css";
import img_vendidos from "../../../../assets/Negotium Assets/total.png";
import img_activos from "../../../../assets/Negotium Assets/active.png";
import img_total from "../../../../assets/Negotium Assets/vendido.png";
import img_inactivos from "../../../../assets/Negotium Assets/inactive.png";
import img_chart_down from "../../../../assets/Negotium Assets/chart_down.png";
import img_chart_up from "../../../../assets/Negotium Assets/chart_up.png";
import ModalNewService from "./ModalNewService";
import ItemPanelServices from "./ItemPanelServices";
import { Button, Input } from "semantic-ui-react";

export default function PanelServices({activos, inactivos, vendidos, total, changeFilter, onReload, obscuro}) {

  const [filter, setSearchServices] = React.useState("");
  const [open, setOpen] = React.useState(false);


  const openModalNewService = () => {
    setOpen(true);
  };

  return (
    <div class="panel-services-cont" style={
      {
        backgroundColor: obscuro ? "#424E5E" : "#ffffff",
      }
    }>
      <div class="cont-vertical">
        <ItemPanelServices
          img_header={img_inactivos}
          img_={img_chart_up}
          text_item_servicios="Total de servicios inactivos"
          text_count_services={inactivos}
        />

        <ItemPanelServices
          img_header={img_activos}
          img_={img_chart_up}
          text_item_servicios="Total de servicios activos"
          text_count_services={activos}
        />
        <ItemPanelServices
          img_header={img_vendidos}
          img_={img_chart_up}
          text_item_servicios="Total de servicios vendidos"
          text_count_services={vendidos}
        />

        <ItemPanelServices
          img_header={img_total}
          img_={img_chart_down}
          text_item_servicios="Total de servicios"
          text_count_services={total}
        />
      </div>
      <div class="cont-buttons">
      <Input
            className="btn-panel-services"
            type="text"
            placeholder="Buscar Servicio..."
            action
            focus
          >
            <input onChange={
              (e) =>  setSearchServices(e.target.value)
            }   />
            <Button
              onClick={() => {changeFilter(filter)
                        setSearchServices("")
              }}
              color="blue"
              type="submit"
            >
              Buscar
            </Button>
          </Input>
        <br></br>
        <Button color="orange" className="btn-panel-services" onClick={
          () => changeFilter("Todos")
        }>Ver Todos</Button>
        <br></br>
        <Button color="purple" className="btn-panel-services" onClick={
          () => changeFilter("Inactivos")
        }>Ver Inactivos</Button>
        <br></br>
        <Button color="pink" className="btn-panel-services" onClick={
          () => changeFilter("Activos")
        }>Ver Activos</Button>
        <br></br>
        <Button primary className="btn-panel-services" onClick={
          () => changeFilter("Vendidos")
        }>Ver Vendidos</Button>
        <br></br>
        <Button color="green" onClick={()=> {openModalNewService()}} className="btn-panel-services">Agregar Servicio</Button>
      </div>

      <ModalNewService open={open} setOpen={setOpen} onReload={onReload} />
    </div>
  );
}
