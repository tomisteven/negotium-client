import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ClientLayout } from '../layouts';
import {Objetivos, Home, Nosotros, SoporteTecnico, Contacto} from "../pages/web"
import { LoginClients } from '../pages/web/LoginClients';

export function WebRoutes() {

    const loadLayout = (Layout, Page) => {
        return (
            <Layout>     {/* Layout estatico */}
                <Page /> {/* children */}
            </Layout>
        );
    }

  return (
    <Routes>
        <Route path="/" element={loadLayout(ClientLayout, Home)} />
        <Route path="/objetivos" element={loadLayout(ClientLayout, Objetivos)} />
        <Route path="/funciones" element={loadLayout(ClientLayout, Nosotros)} />
        <Route path="/contacto" element={loadLayout(ClientLayout, Contacto)} />
        <Route path="/soporte" element={loadLayout(ClientLayout, SoporteTecnico)} />
        <Route path="/login/client" element={loadLayout(ClientLayout, LoginClients)} />

    </Routes>
  )
}
