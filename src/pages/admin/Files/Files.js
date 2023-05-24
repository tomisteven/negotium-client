import React from "react";
import "./files.css";
import { Files } from "../../../api/files";
import { useAuth } from "../../../hooks";
import { Button, Icon } from "semantic-ui-react";
import { Dimmer, Loader } from "semantic-ui-react";
import TitleHeader from "../Clients/Components/Title-head/TitleHeader";
import img_files from "../../../assets/Negotium Assets/archivo-pdf.png";
import Swal from "sweetalert2";
import PanelFiles from "./Components/PanelFiles";
import ItemFile from "./Components/ItemFile";
import Loading from "../../../Components/Admin/Loader/Loading";

const filesController = new Files();
export function Files_c() {
  const { accesToken, user } = useAuth();

  const [reload, setReload] = React.useState(false);
  const [filter, setFilter] = React.useState("Todos");
  const [loading, setLoading] = React.useState(false);
  const [files, setFiles] = React.useState([]);

  const onReload = () => {
    setReload(!reload);
  };

  const downdoaldFile = (file) => {
    const url = file; // Obtienes la URL de la imagen del objeto

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "nombre_archivo.jpg"; // el nombre que tendrá el archivo descargado
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
  };

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await filesController.getFiles(accesToken);
      setFiles(response.reverse());
      setLoading(false);
    })();
  }, [reload]);

  if (loading || typeof files === "undefined") {
    return (
      <Loading obscuro={user.obscuro} text={"Cargando Archivos.."} />
    );
  }

  const findFile = (type) => {
    switch (type) {
      case "Antiguo":
        setLoading(true);
        const antiguo = files.reverse();
        setFilter("ANTIGUOS");
        setFiles(antiguo);
        setLoading(false);
        break;
      case "Pdf":
        const pdf = user.pdfs.filter((pdf) => {
          return pdf.tipo == "PDF";
        });
        setFilter("PDFs");
        setFiles(pdf);

        break;
      case "Img":
        const img = user.pdfs.filter((pdf) => {
          return pdf.tipo == "IMG";
        });
        setFilter("IMAGENES");
        setFiles(img);

        break;

      case "Todos":
        setFiles(user.pdfs.reverse());
        setFilter("Todos");
        break;
      default:
        break;
    }
  };

  const deleteFile = async (file_id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esta accion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await filesController.deleteFile(accesToken, file_id);
        if (response) {
          onReload();
          toast("Archivo eliminado correctamente", {
            position: toast.POSITION.TOP_RIGHT,
            type: "success",
            theme: "colored",
          });
        }
      }
    });
  };

  return (
    <>
      <TitleHeader
        icon={"folder open outline"}
        obscuro={user.obscuro}
        iconColor={user.obscuro}
        valueFilter={filter}
        title="Lista de servicios"
      />
      <div className="conteiner-files">
        <PanelFiles
          files={files}
          findFile={findFile}
          onReload={onReload}
          deleteFile={deleteFile}
          downdoaldFile={downdoaldFile}
        />
        <div class="cont-files-list-files">
          {files.length > 0 ? (
            files.map((file, index) => {
              return (
                <ItemFile
                  key={index}
                  file={file}
                  downdoaldFile={downdoaldFile}
                  deleteFile={deleteFile}
                />
              );
            })
          ) : (
            <div className="cont-no-files">
              <Icon name="file outline" size="huge" color="grey" />
              <h3 className="cont-no-files-h3">No hay Archivos guardados</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
