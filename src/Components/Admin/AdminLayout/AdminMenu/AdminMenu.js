//aca es un componente que se renderiza en el adminLayout
import React, { useState, useEffect } from "react";
import { Menu, Icon, Item } from "semantic-ui-react";
import "./AdminMenu.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import proveedor_img from "../../../../assets/Negotium Assets/proveedor.png";

export default function AdminMenu(props) {

  //console.log(props);

  const {
    user: { role },
  } = useAuth(); //obtengo el rol del usuario logueado
  const esAdmin = role === "user"; //si el rol es admin, esAdmin = true
  const location =useLocation().pathname.split("/")[2]
  const [activeItem, setActiveItem] = useState(location);
  //console.log(activeItem);

  useEffect(() => {
    props.onLoad()
  }, []);


  //console.log(useLocation().pathname.split("/")[2]);
  return (
    <Menu className="admin-menu" icon fluid text>
      {esAdmin && (
        <>

            <Link
              to={"/admin/dashboard"}
              onClick={() => setActiveItem("dashboard")}
              title="Home"
              className={activeItem === "dashboard"? "items-cont-active" : "items-cont"}
            >
              <Icon className="item-icon" name="home" size="large" />
            </Link>

          <Link
            to={"/admin/clientes"}
            title="Clientes"
            onClick={() => setActiveItem("clientes")}
            className={activeItem === "clientes"? "items-cont-active" : "items-cont"}
          >
            <Icon name="users" size="large" />
          </Link>
          <Link
            to={"/admin/calendario"}
            onClick={() => setActiveItem("calendario")}
            title="Calendario"
            className={activeItem === "calendario"? "items-cont-active" : "items-cont"}
          >
            <Icon name="calendar alternate outline" size="large" />
          </Link>
          <Link
            onClick={() => setActiveItem("servicios")}
            className={activeItem === "servicios"? "items-cont-active" : "items-cont"}
            title="Servicios"
            to={"/admin/servicios"}
          >
            <Icon name="shopping cart" size="large" />
          </Link>
          <Link
            onClick={() => setActiveItem("archivos")}
            className={activeItem === "archivos"? "items-cont-active" : "items-cont"}
            title="Archivos"
            to={"/admin/archivos"}
          >
            <Icon name="file alternate" size="large" />
          </Link>
          <Link
            onClick={() => setActiveItem("recordatorios")}
            className={activeItem === "recordatorios"? "items-cont-active" : "items-cont"}
            title="Recordatorios"
            to={"/admin/recordatorios"}
          >
            <Icon name="bell" size="large" />
          </Link>
          <Link
          to={"/admin/configuracion"}
            onClick={() => setActiveItem("configuracion")}
            className={activeItem === "configuracion"? "items-cont-active" : "items-cont"}
            title="Configuracion"
          >
            <Icon name="configure" size="large" />
          </Link>
          <Link
          to={"/admin/planes"}
            onClick={() => setActiveItem("planes")}
            className={activeItem === "planes"? "items-cont-active" : "items-cont"}
            title="Planes"
          >
            <Icon name="check" color="yellow" circular size="large" />
          </Link>
        </>
      )}
    </Menu>
  );
}

/* <Menu.Item
						className="items"
						as={Link}
						to='/admin/newsletter'
						active={compareIsActive("/admin/newsletter")}>
						<Icon size="large" className="icon" name='tasks' />

					</Menu.Item> */
