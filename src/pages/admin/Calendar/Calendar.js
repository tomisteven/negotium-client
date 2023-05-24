import React from "react";
import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Client } from "../../../api/client";
import { useAuth } from "../../../hooks/useAuth";
import { Dimmer, Icon, Loader } from "semantic-ui-react";
import esLocale from "@fullcalendar/core/locales/es";
import TitleHeader from "../Clients/Components/Title-head/TitleHeader";
import img_calendar from "../../../assets/Negotium Assets/calendar.png";
import avatar from "../../../assets/Negotium Assets/perfil.png";
import Loading from "../../../Components/Admin/Loader/Loading";

const client = new Client();
export function Calendar() {
  const { accesToken, user } = useAuth();

  function convertDate(dateStr) {
    // Crear objeto Date a partir de la cadena de fecha
    const date = new Date(dateStr);

    // Obtener el año, mes y día de la fecha
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Agregar 1 porque los meses van de 0 a 11
    const day = date.getDate(); // Agregar 15 días al día de la fecha

    // Formatear la fecha en el formato deseado
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  }
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    client.getAllServices(accesToken).then((response) => {
      setEvents(response);
      console.log(response);
    });
    setLoading(false);
  }, []);

  const eventsFinal = events.map((event) => {
    return {
      title: event.title,
      date: convertDate(event.date),
      backgroundColor: "#9983c9",
    };
  });

  if (loading || typeof eventsFinal === "undefined") {
    return (
      <Loading obscuro={user.obscuro} message="Cargando calendario..." />
    );
  }

  const proxEvents = eventsFinal
    .filter((event) => {
      if (event.date >= convertDate(new Date())) {
        return event;
      }
    })
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

  const lastEvents = eventsFinal
    .filter((event) => {
      if (event.date < convertDate(new Date())) {
        return event;
      }
    })
    .sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

  function obtenerDiaDeLaSemana(fecha) {
    const diasDeLaSemana = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    const diaDeLaSemana = new Date(fecha).getDay();
    return diasDeLaSemana[diaDeLaSemana];
  }

  return (
    <>
      <TitleHeader
        title="Calendario"
        icon={"calendar alternate outline"}
        obscuro={user.obscuro}
        iconColor={user.obscuro ? "white" : "black"}
      />
      <div class="contenido-calendar">
        <FullCalendar
          height={700}
          themeSystem="bootstrap"
          locale={esLocale}
          events={eventsFinal}
          eventColor="#9983c9"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
        />
      </div>
      <div class="dos-cont">
        <div
          style={{ backgroundColor: "#e8b9b9" }}
          class="contenido-servicios-clientes"
        >
          <div className="cont-title-eventos">
            <h2 className="title-events">Historial De Eventos</h2>
          </div>
          {lastEvents.map((event) => {
            return (
              <div class="card-servicios-clientes">
                <div class="car-servicios-img">
                  <img src={avatar} alt="" />
                </div>
                <div class="card-servicios-info">
                  <p>{event.title.toUpperCase()}</p>
                  <p>
                    <span>{obtenerDiaDeLaSemana(event.date)}</span> {event.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div
          class="contenido-servicios-clientes"
          style={{ backgroundColor: "#a9d1a9" }}
        >
          <div className="cont-title-eventos">
            <h2 className="title-events">Proximos Eventos</h2>
          </div>
          {proxEvents.map((event) => {
            return (
              <div class="card-servicios-clientes">
                <div class="car-servicios-img">
                  <img src={avatar} alt="" />
                </div>
                <div class="card-servicios-info">
                  <p>{event.title}</p>
                  <p>
                    <span>{obtenerDiaDeLaSemana(event.date)}</span> {event.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
