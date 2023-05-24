import React from "react";

export default function CardsHeader({
  user,
  title1,
  title2,
  dollar,
  gradient,
  color,
  max_clients,
  v1,
  total_deudores,
}) {

  console.log(user);
  return (
    <div
      className="cont-card-panel"
      style={{
        background: gradient,
      }}
    >
      <div className="text-header">
        <h5
          style={{
            color: color,
          }}
          className="title-card"
        >
          {title1}
        </h5>
        <h5
          style={{
            color: color,
          }}
          className="title-body"
        >
          {dollar}
          {v1 ? user.recaudado : user.clientes.length}
          {max_clients ? ` de ${max_clients}` : null}
        </h5>
      </div>
      <div className="text-header">
        <h5
          style={{
            color: color,
          }}
          className="title-card"
        >
          {title2}
        </h5>
        <h5
          style={{
            color: color,
          }}
          className="title-body"
        >
          {dollar}
          {v1 ? user.deudas : total_deudores}
        </h5>
      </div>
    </div>
  );
}
