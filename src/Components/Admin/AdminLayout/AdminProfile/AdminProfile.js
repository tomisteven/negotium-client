import React from "react";
import { useAuth } from "../../../../hooks";
import user_img from "../../../../assets/Negotium Assets/perfil.png";
import verificado from "../../../../assets/Negotium Assets/verificado2.png";
import noverificado from "../../../../assets/Negotium Assets/noverificado.png";
import "./AdminProfile.css";

export function AdminProfile() {
  const { user } = useAuth();

  if(!user) return (<h1>Loading...</h1>);

  const membresia_active = user.membresias.find((m) => m.activa == true);


  return (
    <div className="profile-cont">
      <div className="profile-continfo">
        <h3
          style={{
            color: user.obscuro ? "#ffffff" : "#000000",
          }}
        >
          <img
            className="verificado"
            src={
              membresia_active.nombre == "Inicial" ? noverificado : verificado
            }
          />{" "}
          {user.name} {user.lastname}{" "}
        </h3>
        <p
          style={{
            color: user.obscuro ? "#ffffff" : "rgba(0, 0, 0, 0.477)",
          }}
        >
          Membresia {membresia_active.nombre}
        </p>
      </div>

      <div className="profile-contimg">
        <img
          className="img_profile"
          style={{
            border: user.obscuro ? "2px dashed #fff" : "2px dashed #7c7c7c",
          }}
          src={user.avatar ? user.avatar : user_img}
          alt="profile"
        />
      </div>
    </div>
  );
}
