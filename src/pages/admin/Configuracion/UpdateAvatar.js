import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks";
import Loading from "../../../Components/Admin/Loader/Loading";
import { Button } from "semantic-ui-react";
import { Circles } from "react-loader-spinner";
import "./UpdateAvatar.css";

export default function UpdateAvatar() {
  const { user, accesToken } = useAuth(); //obtenemos el usuario logueado del contexto de autenticacion
  const [image, setImage] = React.useState(null);
  const [fileData, setFileData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", image);

    setFileData({
      ...fileData,
      avatar: image,
    });

    const config = {
      headers: {
        Authorization: accesToken,
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const url = "https://apinegotium.up.railway.app/user/avatar/";

    try {
      const res = await axios.patch(url, formData, config);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Actualizado!",
          text: "Se actualizo correctamente el avatar",
          confirmButtonText: "Entendido",
          preConfirm: () => {
            window.location.reload();
          },
          confirmButtonColor: "green",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo actualizar el avatar",
        confirmButtonText: "Entendido",
        preConfirm: () => {
          window.location.reload();
        },
        confirmButtonColor: "red",
      });
    }
  };

  return (
    <>
      {loading ? (
        <div className="user-user-img-l">
          <Circles
            height="50"
            width="50"
            radius="9"
            color="purple"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
        <div class="user-user-img">
          <form onSubmit={onSubmit}>
            <h4 style={{
        color: user.obscuro ? "white" : "#000000"
      }} className="title-user-img">Avatar</h4>
            <div style={{
        border: user.obscuro ? "2px dashed white" : "2px dashed #000000"
      }} class="user-img">
              <img
                src={image ? URL.createObjectURL(image) : user.avatar}
                className="user-img-img"
              />
            </div>
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="cont-btn-avatar">
                  <input {...getInputProps()} />
                  <p style={{
        color: user.obscuro ? "white" : "#000000"
      }} className="p-imagen-select">
                    Haz clic para seleccionar una imagen
                  </p>
                </div>
              )}
            </Dropzone>

            <div className="cont-btn-avatar-actions">
              <Button
                disabled={image ? false : true}
                color="red"
                size="tiny"
                className="btn-avatar"
                onClick={() => setImage(null)}
              >
                Eliminar
              </Button>
              <Button
                disabled={image ? false : true}
                color="green"
                size="tiny"
                className="btn-avatar"
                type="submit"
              >
                Actualizar
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
