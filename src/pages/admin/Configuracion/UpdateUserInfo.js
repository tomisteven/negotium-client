import React from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import { useAuth } from "../../../hooks";
import Swal from "sweetalert2";
import { ColorRing } from "react-loader-spinner";
import { Auth } from "../../../api";

const authController = new Auth();

export default function UpdateUserInfo() {
  const { user, accesToken } = useAuth(); //obtenemos el usuario logueado del contexto de autenticacion
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordP, setShowPasswordP] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    pass_aplication: user.pass_aplication,
    password: "",
  });

    const updateUserInfo = async() => {
    setLoading(true);
    if (formData.password === "") {
        delete formData.password;
    }
    if (formData.pass_aplication === "") {
        delete formData.pass_aplication;
    }
    const response = await authController.updateUser(formData, accesToken);
    if (response) {
        await Swal.fire({
            icon: "success",
            title: "Datos Actualizados",
            showConfirmButton: false,
            timer: 1500,
        });
    }
    setLoading(false);
}

  return (
    <>
      {loading ? (
        <div className="user-info-l">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <div className="user-info">
          <h4 className="title-info-user" style={{
            color: user.obscuro ? "#fff" : "#000",
          }}>Informacion del Usuario</h4>
          <div class="item-input-info">
            <Input
              className="input-info"
              label="Nombre"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>
          <div class="item-input-info">
            <Input
              onChange={(e) => {
                setFormData({ ...formData, lastname: e.target.value });
              }}
              className="input-info"
              label="Apellido"
              value={formData.lastname}
            />
          </div>
          <div class="item-input-info">
            <Input
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              className="input-info"
              label="Email"
              value={formData.email}
            />
          </div>
          <div class="item-input-info">
            <div class="info-pass">
              <label  style={{ color: "#000", padding: "5px", color: user.obscuro ? "white" : "black" }} for="">
                Contraseña del Correo para emails
              </label>
              <button className="btn-question">
                <Icon name="question circle outline blue" />
              </button>
            </div>
            <Input
              className="input-info-pass"
              label="Nombre"
              onChange={(e) => {
                setFormData({ ...formData, pass_aplication: e.target.value });
              }}
              value={formData.pass_aplication}
              type="password"
            >
              <input type={showPassword ? "text" : "password"} />
              <Button
                primary
                disabled={formData.pass_aplication ? false : true}
                icon={showPassword ? "eye slash" : "eye"}
                onClick={() => setShowPassword(!showPassword)}
              />
            </Input>
          </div>
          <div class="item-input-info">
          <div class="info-pass">
              <label style={{ color: "#000", padding: "5px", color: user.obscuro ? "white" : "black" }} for="">
                Contraseña Usuario
              </label>
              <button className="btn-question">
                <Icon name="question circle outline blue" />
              </button>
            </div>
            <Input
              label="Nombre"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              value={formData.password}
              type="password"
            >
              <input type={showPasswordP ? "text" : "password"} />
              <Button
                primary
                disabled={formData.password ? false : true}
                icon={showPasswordP ? "eye slash" : "eye"}
                onClick={() => setShowPasswordP(!showPasswordP)}
              />
            </Input>
          </div>
          <div class="cont-btn-save">
            <Button
              disabled={
                !formData.name ||
                !formData.lastname ||
                !formData.email ||
                !formData.pass_aplication
              }
              className="btn-save-pass"
              onClick={() => {
                updateUserInfo()

              }}
              color="green"
            >
              {loading ? "Actualizando.." : "Guardar"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
