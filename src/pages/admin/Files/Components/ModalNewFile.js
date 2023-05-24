import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, Image } from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import Dropzone from "react-dropzone";
import "./modalNewFile.css";

export default function ModalNewFile({ open, setOpen, onReload }) {
  const { accesToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [fileData, setFileData] = useState({
    url: null,
    tipo: "",
    nombre: "",
    descripcion: "",
    servicio: "",
  });

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const cancell = () => {
    setOpen(false);
    setImage(null);
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("url", image);
    formData.append("tipo", fileData.tipo);
    formData.append("nombre", fileData.nombre);
    formData.append("descripcion", fileData.descripcion);
    formData.append("servicio", fileData.servicio);

    setFileData({
      ...fileData,
      url: image,
    });
    const config = {
      headers: {
        Authorization: accesToken,
        "Content-Type": "multipart/form-data",
      },
    };

    const url = "https://apinegotium.up.railway.app/files/add";

    try {
      const res = await axios.post(url, formData, config);
      if (res.ok) {
        toast.success("Archivo Guardado");
        setLoading(false);
        cancell();
        onReload();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se puede agregar más archivos debido a que se ha alcanzado el límite de archivos permitidos en el plan actual.",
        footer: '<a href="/admin/planes">Ver planes</a>',
        confirmButtonText: "Entendido",
        preConfirm: () => {
          onReload();
        },
        confirmButtonColor: "red",
      });
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        size="small"
        closeIcon
      >
        <Modal.Header>Guardar Archivo Nuevo:</Modal.Header>
        <Modal.Content>
          <form onSubmit={onSubmit}>
            <div className="input-grid">
              <input
                type="text"
                placeholder="Nombre Archivo"
                class="input-text"
                onChange={(e) =>
                  setFileData({
                    ...fileData,
                    nombre: e.target.value,
                  })
                }
              />
              <select
                class="input-text"
                onChange={(e) =>
                  setFileData({
                    ...fileData,
                    tipo: e.target.value,
                  })
                }
              >
                <option value="IMG">IMAGEN</option>
                <option value="PDF">PDF</option>
              </select>
              <select
                class="input-text"
                onChange={(e) =>
                  setFileData({
                    ...fileData,
                    servicio: e.target.value,
                  })
                }
              >
                <option value="Cliente">Cliente</option>
                <option value="Proveedor">Proveedor</option>
                <option value="Factura">Factura</option>
                <option value="Resumen">Resumen</option>
                <option value="Otros..">Otro</option>
              </select>
              <input
                type="text"
                placeholder="Descripcion"
                class="input-text"
                onChange={(e) =>
                  setFileData({
                    ...fileData,
                    descripcion: e.target.value,
                  })
                }
              />
            </div>
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className="p-imagen-select">
                    Arrastra una imagen aquí o haz clic para seleccionarla
                  </p>
                  {image && (
                    <img
                      className="img-preview"
                      src={URL.createObjectURL(image)}
                      alt="imagen seleccionada"
                    />
                  )}
                </div>
              )}
            </Dropzone>
            <button className="btn-submit-file" type="submit" disabled={!image}>
              {loading ? "Guardando..." : "Guardar Archivo"}
            </button>
          </form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="red" onClick={() => cancell(false)}>
            Cancelar
          </Button>
        </Modal.Actions>
      </Modal>
      <ToastContainer />
    </>
  );
}
