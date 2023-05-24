import React from "react";
import { Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Recordatorios } from "../../../api/recordatorios";
import "./recordatorios.css";
import TitleHeader from "../Clients/Components/Title-head/TitleHeader";
import ModalEditRecordatorio from "./ModalEditRecordatorio";
import ItemRecodatorio from "./ItemRecordatorio";
import Loading from "../../../Components/Admin/Loader/Loading";
import sin_recordatorios from "../../../assets/Negotium Assets/add.png";
import Swal from "sweetalert2";

const recordatoriosController = new Recordatorios();

export function Recordatorios_() {
  const { user, accesToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(user.recordatorios);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = React.useState(false);
  const [recordatorioSelect, setRecordatorio] = useState({});
  const [creando, setCreando] = useState(false);

  function formatFecha(fecha) {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const anio = date.getFullYear().toString().slice(-2);
    const hora = date.getHours().toString().padStart(2, "0");
    const minutos = date.getMinutes().toString().padStart(2, "0");
    return `${dia}/${mes}/${anio} ${hora}:${minutos}`;
  }

  const onReload = () => {
    setReload(!reload);
  };

  const anularTodos = async () => {
    Swal.fire({
      title: "¿Estas seguro de anular todos los recordatorios?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, anular todo!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const state = {
          state: false,
        };
        await recordatoriosController
          .anularAll(state, accesToken)
          .then((res) => {
            console.log(res);
            onReload();
          });
        Swal.fire(
          "Anulado!",
          "Todos los recordatorios han sido anulados.",
          "success"
        ).then(() => {
          onReload();
        });
      }
    })
  };

  const completarTodos = async () => {
    await Swal.fire({
      title: "¿Estas seguro de completar todos los recordatorios?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, Completar todo!",
      cancelButtonText: "Cancelar",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const state = {state: true};
          await recordatoriosController.anularAll(state, accesToken).then((res) => {
            onReload();
          });
          Swal.fire(
            "Anulado!",
            "Todos los recordatorios han sido anulados.",
            "success"
          ).then(() => {
            onReload();
          });
        }
      })
}

  const borrarTodos = () => {
    Swal.fire({
      title: "¿Estas seguro de borrar todos los recordatorios?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, Borrar todo!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await recordatoriosController.borrarTodos(accesToken).then((res) => {
          console.log(res);
          onReload();
        });
        Swal.fire(
          "Borrado!",
          "Todos los recordatorios han sido borrados.",
          "success"
        ).then(() => {
          onReload();
        });
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    recordatoriosController.getRecordatorios(accesToken)
      .then((res) => {
        setData(res);
      })
    setLoading(false);
  }, [reload]);




  if (loading || !data) {
    return <Loading text={"Cargando Recordatorios.."} obscuro={user.obscuro} />;
  }
  return (
    <>
      <TitleHeader
        title="Recordatorios"
        icon={"alarm"}
        obscuro={user.obscuro}
      />
      <div class="cont-btn-add">
        <Button
          className="btn-add"
          color="green"
          onClick={() => {
            setOpen(true);
            setCreando(true);
            setRecordatorio({});
          }}
        >
          Agregar Recordatorio
        </Button>
        <Button
          className="btn-add"
          primary
          onClick={() => {
            anularTodos();
          }}
        >
          Anular Todos
        </Button>
        <Button
          className="btn-add"
          color="purple"
          onClick={() => {
            completarTodos();
          }}
        >
          Completar Todos
        </Button>
        <Button
          className="btn-add"
          color="youtube"
          onClick={() => {
            borrarTodos();
          }}
        >
          Borrar Todos
        </Button>
      </div>

      <div class="recordatorios-container">
        {data.length > 0 ? (
          data.map((recordatorio) => {
            return (
              <ItemRecodatorio
              setLoading={setLoading}
              key={recordatorio._id}
                obscuro={user.obscuro}
                recordatorio={recordatorio}
                setRecordatorio={setRecordatorio}
                setOpen={setOpen}
                setCreando={setCreando}
                formatFecha={formatFecha}
                recordatoriosController={recordatoriosController}
                accesToken={accesToken}
                onReload={onReload}
              />
            );
          })
        ) : (
          <div className="no-recordatorios">
            <h2
              style={{
                color: user.obscuro ? "#ffffff" : "#000000",
              }}
            >
              No hay recordatorios
            </h2>
            <img
              className="img_no_recordatorios"
              src={sin_recordatorios}
              alt=""
            />
          </div>
        )}
        <ModalEditRecordatorio
          recordatorio={recordatorioSelect}
          setRecordatorio={setRecordatorio}
          reload={reload}
          onReload={onReload}
          setOpen={setOpen}
          open={open}
          creando={creando}
          setCreando={setCreando}
          formatFecha={formatFecha}
        />
      </div>
    </>
  );
}

export default Recordatorios;
