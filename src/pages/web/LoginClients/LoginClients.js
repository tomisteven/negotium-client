import React, { useEffect } from "react";
import "./LoginClients.css";
import { Button, Card, Icon, Image, Item, Table } from "semantic-ui-react";
import { Dna } from "react-loader-spinner";
import { loginClient } from "../../../api/loginClient";
import { useAuth } from "../../../hooks";
import img_pagado from "../../../assets/Negotium Assets/active.png";
import img_deuda from "../../../assets/Negotium Assets/inactive.png";

const loginController = new loginClient();

export function LoginClients() {
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();
  const [form, setForm] = React.useState();
  const [client, setClient] = React.useState(
    JSON.parse(localStorage.getItem("client"))
  );

  const onReload = () => {
    setReload(!reload);
  };

  useEffect(() => {
    setLoading(true);

    client
      ? loginController
          .loginClient(user._id, {
            username: localStorage.getItem("emailclient"),
            password: "123456",
          })
          .then((response) => {
            setClient(response.client);
            setLoading(false);
          })
      : setLoading(false);
  }, [reload]);

  const parseDate = (date) => {
    const dateParse = new Date(date);
    const day = dateParse.getDate();
    const month = dateParse.getMonth() + 1;
    const year = dateParse.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const loginClient = async (form) => {
    setLoading(true);
    localStorage.setItem("emailclient", form.username);
    const client_log = await loginController.loginClient(user._id, form);
    localStorage.setItem("client", JSON.stringify(client_log.client));
    setClient(client_log.client);
    setLoading(false);
  };

  const services_client = [];

  if (loading) {
    return (
      <div className="cont-list-services">
        <Dna type="ThreeDots" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  if (client) {
    client.serviciosadquiridos.forEach((service) => {
      services_client.push(service);
    });
    client.nextServices.forEach((service) => {
      services_client.push(service);
    });
    services_client.sort((a, b) => {
      return new Date(a.fecha) - new Date(b.fecha);
    });
  } else {
    console.log("No hay servicios");
  }

  return (
    <>
      {client ? (
        <>
          <div class="client-info">
            <Card
              color="black"
              style={{
                width: "93%",
              }}
            >
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src={client.deudaTotal > 0 ? img_deuda : img_pagado}
                />
                <Card.Header>
                  {client.nombre + " " + client.apellido}
                </Card.Header>
                <Card.Meta>
                  {client.deudaTotal > 0
                    ? "Deuda Total: $" + client.deudaTotal
                    : "Sin Deuda"}
                </Card.Meta>
                <Card.Description>{client.email}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui tree buttons">
                  <Button disabled basic color="grey">
                    <Icon name="user" />
                    {client.genero ? "Masculino" : "Femenino"}
                  </Button>
                  <Button disabled basic color="green">
                    <Icon name="calendar alternate" />
                    {"Direccion: " + client.direccion}
                  </Button>
                  <Button disabled basic color="blue">
                    <Icon name="calendar alternate" />
                    {"Contacto: " + client.telefono}
                  </Button>
                  <Button disabled basic color="red">
                    <Icon name="calendar alternate" />
                    {"Creado el: " + parseDate(client.fecha)}
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </div>
          <Button
            onClick={() => {
              localStorage.removeItem("client");
              localStorage.removeItem("emailclient");
              setClient(null);
            }}
            style={{
              margin: "10px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
            className="btn-logout"
            primary
            icon="log out"
          />
          <Button
            onClick={() => {
              onReload();
            }}
            style={{
              margin: "10px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              position: "fixed",
              right: "0",
              bottom: "0",
            }}
            className="btn-logout-2"
            color="green"
            icon="redo"
          />
          <div className="cont-list-services">
            <p className="title-table-clients-login">Informacion Comercial</p>
            <Table celled clas size="big">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Deuda Total</Table.HeaderCell>
                  <Table.HeaderCell>Gasto Total</Table.HeaderCell>
                  <Table.HeaderCell>Servicios totales</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>${client.deudaTotal}</Table.Cell>
                  <Table.Cell>${client.gastoTotal}</Table.Cell>
                  <Table.Cell>
                    {client.serviciosadquiridos.length +
                      client.nextServices.length}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <div className="cont-list">
              <p className="title-table-clients-login">
                Historial de servicios
              </p>
              <Table celled clas size="big">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Precio</Table.HeaderCell>
                    <Table.HeaderCell>Fecha</Table.HeaderCell>
                    <Table.HeaderCell>Asistido</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {services_client.map((service) => (
                    <Table.Row>
                      <Table.Cell>{service.nombre}</Table.Cell>
                      <Table.Cell>${service.precio}</Table.Cell>
                      <Table.Cell>{parseDate(service.fecha)}</Table.Cell>
                      <Table.Cell>
                        <Image
                          floated="right"
                          size="mini"
                          centered
                          src={service.completed ? img_pagado : img_deuda}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </>
      ) : (
        <div class="login-box">
          <img src="img/logo.png" class="avatar" alt="Avatar Image" />
          <h1>Login Clientes</h1>
          <form>
            <label for="username">Username o Email</label>
            <input
              onChange={(e) => {
                setForm({
                  ...form,
                  username: e.target.value,
                });
              }}
              type="text"
              placeholder="Enter Username"
            />

            <label for="password">Contraseña</label>
            <input
              onChange={(e) => {
                setForm({
                  ...form,
                  password: e.target.value,
                });
              }}
              type="password"
              placeholder="Enter Password"
            />
            <input
              onClick={(e) => {
                e.preventDefault();
                loginClient(form);
              }}
              type="submit"
              value="Log In"
            />
          </form>
        </div>
      )}
    </>
  );
}
