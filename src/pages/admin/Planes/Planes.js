import styled from "styled-components";
import Pricing from "./PlanesComponent";
import TitleHeader from "../Clients/Components/Title-head/TitleHeader";
import { Membresias } from "../../../api/membresia";
import { useAuth } from "../../../hooks";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Dna } from "react-loader-spinner";

const membresiaController = new Membresias();
export function Planes() {
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { user, accesToken } = useAuth();

  const membresia_activa = user.membresias.find(
    (membresia) => membresia.activa === true
  );


  if (loading) {
    return (
      <MainContainer>
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </MainContainer>
    );
  }

  const url = window.location.href;

  useEffect(() => {
    setLoading(true);
    if (url.includes("status=approved")) {
      updateMembresia_effect(localStorage.getItem("tipo"));
    }
    if (url.includes("status=pending")) {
      Swal("Pago pendiente", "El pago esta pendiente", "warning");
    }
    setLoading(false);
  }, [reload]);

  const updateMembresia_effect = async (member) => {
    setLoading(true);
    const result = await membresiaController.updateMembresia(
      accesToken,
      member
    );
    if (result) {
      await Swal.fire(
        "Pago aprobado",
        "El pago se realizo correctamente",
        "success"
      );
      localStorage.removeItem("tipo");
      window.location.reload();
    }
    setLoading(false);
  };

  const getLinkPay = async (product, price, tipo) => {
    setLoading(true);
    localStorage.setItem("tipo", tipo);
    const link = await membresiaController.getLinkToPayItem(
      user,
      product,
      price,
      tipo
    );
    if (link) {
      window.location.href = link.init_point;
    }
    setLoading(false);
  };

  return (
    <>
      <TitleHeader title="Planes" icon={"check"} />
      <MainContainer>
        {loading ? (
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        ) : (
          <>
            <div className="pricing-component">
              <Pricing
                data={[
                  { text: "12 Clientes", value: true },
                  { text: "7 Servicios", value: true },
                  { text: "5 Archivos", value: true },
                  { text: "10 Recordatorios", value: true },
                  { text: "Soporte 24/7", value: false },
                  { text: "Login de Clientes", value: false },
                  { text: "Portal de Publicaciones", value: false },
                ]}
                price={0}
                duration="y"
                currency="$"
                subTitle="Membresia Inicial"
                priceText="Usa y proba la plataforma con uso limitado."
                headerText={
                  membresia_activa && membresia_activa.nombre === "Inicial"
                    ? "Adquirida"
                    : "Pago"
                }
                background="linear-gradient(120deg, #fcbe37 0%, #eda257 100%)"
                shadow=" #499e38"
              />
            </div>
            <div className="pricing-component">
              <Pricing
                data={[
                  { text: "20 Clientes", value: true },
                  { text: "14 Servicios", value: true },
                  { text: "12 Archivos", value: true },
                  { text: "20 Recordatorios", value: true },
                  { text: "Soporte 24/7", value: true },
                  { text: "Login de Clientes", value: false },
                  { text: "Portal de Publicaciones", value: false },
                ]}
                price={350}
                duration="m"
                background="linear-gradient(120deg, #6d5ee5 0%, #577fed 100%)"
                shadow="#6d5ee5"
                currency="$"
                onClickButton={() => {
                  getLinkPay("Negotium", 350, "Standart");
                }}
                buttonContent={
                  membresia_activa && membresia_activa.nombre === "Standart"
                    ? "Adquirido"
                    : "Adquirir"
                }
                subTitle="Plan Standart para emprendedores"
                priceText="Administra tu negocio y clientes con uso limitado pero con mas beneficios"
                headerText={
                  membresia_activa && membresia_activa.nombre === "Standart"
                    ? "Adquirido"
                    : "Pago"
                }
              />
            </div>
            <div className="pricing-component">
              <Pricing
                data={[
                  { text: "30 Clientes / Extendible", value: true },
                  { text: "20 Servicios / Extendible", value: true },
                  { text: "20 Archivos / Extendible", value: true },
                  { text: "40 Recordatorios / Extendible", value: true },
                  { text: "Soporte 24/7", value: true },
                  { text: "Login de Clientes", value: true },
                  { text: "Portal de Publicaciones", value: true },
                  { text: "Boton de Redireccion de W app", value: true },
                ]}
                price={700}
                duration="m"
                background="linear-gradient(to left, #ff0844 0%, #ffb199 100%);"
                shadow="#ff0844"
                onClickButton={async () => {
                  getLinkPay("Negotium", 700, "Premium");
                }}
                currency="$"
                buttonContent={
                  membresia_activa && membresia_activa.nombre === "Premium"
                    ? "Adquirido"
                    : "Adquirir"
                }
                subTitle="Dedicado a emprendedores con mas clientes y servicios"
                priceText="Administra tu negocio y clientes con uso completo de la plataforma"
                headerText={
                  membresia_activa && membresia_activa.nombre === "Premium"
                    ? "Adquirido"
                    : "Pago"
                }
              />
            </div>
          </>
        )}
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  height: 100vh;
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f5f1ff;
  @media screen and (max-width: 970px) {
    height: 100%;
    flex-direction: column;
    .pricing-component {
      margin: 2rem 0;
    }
  }
`;
