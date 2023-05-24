import React from 'react'
import { Routes, Route } from 'react-router-dom'
//import {map} from "lodash"
import {Auth, Users, Courses, Menu, Recordatorios_, Dashboard, Clients, Files, Files_c, Calendar, Configuracion, Planes} from "../pages/admin"
import {AdminLayout} from "../layouts"
import {useAuth} from "../hooks"
import Services from '../pages/admin/Services/Services'

//si el usuario esta logeado y es admin, entonces se le muestra el layout de admin

export function AdminRoutes() {

    //const user = null;
    const {user} = useAuth(); //obtenemos el usuario logueado del contexto de autenticacion

    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        );
    }

    if(!user || typeof user === "undefined" || user.message == "Token expirado"){
        return (
            <Routes>
                <Route path="/admin/*" element={<Auth />} />
            </Routes>
        )
    }




  return (
    <Routes>
        {
            !user ?
            (
                <Route path="/admin/*" element={<Auth />} />
            ) :
            (
                <>
                <Route path="/admin/dashboard" element={loadLayout(AdminLayout, Dashboard)} />
                <Route path="/admin/clientes" element={loadLayout(AdminLayout, Clients)} /> {/* clientes */}
                <Route path="/admin/servicios" element={loadLayout(AdminLayout, Services)} /> {/* servicios x menu */}
                <Route path="/admin/calendario" element={loadLayout(AdminLayout, Calendar)} />
                <Route path="/admin/archivos" element={loadLayout(AdminLayout, Files_c)} />
                <Route path="/admin/recordatorios" element={loadLayout(AdminLayout, Recordatorios_)} />
                <Route path="/admin/configuracion" element={loadLayout(AdminLayout, Configuracion)} />
                <Route path="/admin/planes" element={loadLayout(AdminLayout, Planes)} />
                </>
            )
        }
    </Routes>
  )
}
