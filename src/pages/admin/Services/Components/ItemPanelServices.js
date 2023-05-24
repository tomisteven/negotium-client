import React from 'react'

export default function ItemPanelServices({img_header, img_, text_item_servicios, text_count_services}) {
  return (
    <div class="item-panel-servicios">
          <div class="cont1">
            <img className="img_item_services" src={img_header} />
            <h5 className="text_item_servicios">{text_item_servicios}</h5>
          </div>
          <div class="cont2">
            <img className="img_chart_services" src={img_}/>
            <h5 className="text_count_services">{text_count_services}</h5>
          </div>
        </div>
  )
}
