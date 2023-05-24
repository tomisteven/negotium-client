import React from "react";
import "./panelFIles.css";
import img_add from "../../../../assets/Negotium Assets/anadir.png";
import { Icon, Button } from "semantic-ui-react";
import ModalNewFile from "./ModalNewFile.js";
import ModalSearch from "./ModalSearch.js";
import ModalViewFile from "./ModalViewFile.js";

export default function PanelFiles({ files, findFile, onReload, deleteFile, downdoaldFile }) {
  const [open, setOpen] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [arrSearch, setArrSearch] = React.useState([]);

  const searchFile = () => {
    setOpenSearch(true);
  };

  return (
    <>
      <div class="cont-files-panel">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="cont-img-add"
        >
          <p className="img-add-p">Agregar Archivo</p>
          <img class="img-add" src={img_add} alt="" />
        </button>
        <div class="panel-info">
          <Icon
            className="icon-panel"
            name="file folder outline"
            size="large"
            color="blue"
          />
          <p className="panel-info-p">Total de archivos: {files.length}</p>
        </div>
        <div class="panel-info">
          <Icon
            className="icon-panel"
            name="file imagen outline"
            size="large"
            color="red"
          />
          <p className="panel-info-p">
            Total de Imagenes:{" "}
            {
              files.filter((file) => {
                return file.tipo == "IMG";
              }).length
            }
          </p>
        </div>
        <div class="panel-info">
          <Icon
            className="icon-panel"
            name="file pdf outline"
            size="large"
            color="red"
          />
          <p className="panel-info-p">
            Total de PDFs:{" "}
            {
              files.filter((file) => {
                return file.tipo == "PDF";
              }).length
            }
          </p>
        </div>
        <Button
          className="btn-panel-files"
          color="orange"
          onClick={() => findFile("Antiguo")}
        >
          Ver Antiguos
        </Button>
        <Button
          className="btn-panel-files"
          color="purple"
          onClick={() => findFile("Img")}
        >
          Ver Imagenes
        </Button>
        <Button
          className="btn-panel-files"
          color="blue"
          onClick={() => findFile("Pdf")}
        >
          Ver PDFs
        </Button>
        <Button
          className="btn-panel-files"
          color="green"
          onClick={() => findFile("Todos")}
        >
          Ver Todo
        </Button>
        <Button
          className="btn-panel-files"
          color="brown"
          onClick={() => searchFile()}
        >
          Buscar Archivo..
        </Button>
      </div>


      <ModalNewFile setOpen={setOpen} open={open} onReload={onReload} />

      <ModalSearch
        files={files}
        setOpen={setOpenSearch}
        open={openSearch}
        onReload={onReload}
        setSearch={setSearch}
        search={search}
        setOpenView={setOpenView}
        setArrSearch={setArrSearch}
      />

      <ModalViewFile downdoaldFile={downdoaldFile} openView={openView} setOpenView={setOpenView} arrSearch={arrSearch} setOpenSearch={setOpenSearch} deleteFile={deleteFile} />
    </>
  );
}
