import React, { useCallback, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Image,
  Table,
} from "semantic-ui-react";
import { useAuth } from "../../../../hooks/useAuth";
import pdf_icon from "../../../../assets/Negotium Assets/pdf_icon.png";
import img_icon from "../../../../assets/Negotium Assets/img.png";

import "./modalNewFile.css";

export default function ModalViewFile({
  openView,
  setOpenView,
  onReload,
  arrSearch,
  setOpenSearch,
  deleteFile,
  downdoaldFile,
}) {
  console.log(arrSearch);

  return (
    <>
      <Modal
        open={openView}
        onClose={() => setOpenView(false)}
        onOpen={() => setOpenView(true)}
        size="small"
        closeIcon
      >
        <Modal.Header>Buscar Archivos:</Modal.Header>
        <Modal.Content>
          <Table color="black" key={"blue"} inverted celled>
            <Table.Header >
              <Table.Row>
                <Table.HeaderCell>File</Table.HeaderCell>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Tipo</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                arrSearch.length > 0 ? arrSearch.map((file) => {
                  return (
                    <Table.Row>
                      <Table.Cell>
                        <img
                          class="cont_header_cont_img_img_modal"
                          src={file.tipo == "IMG" ? img_icon : pdf_icon}
                          alt=""
                        />
                      </Table.Cell>
                      <Table.Cell>{file.nombre}</Table.Cell>
                      <Table.Cell>{file.tipo}</Table.Cell>
                      <Table.Cell>
                        <Button
                          size="small"
                          icon="eye"
                          color="orange"
                          onClick={() => {
                            window.open(file.url, "_blank");
                          }}
                        ></Button>

                        <Button
                          size="small"
                          icon="download"
                          color="green"
                          onClick={() => {
                            downdoaldFile(file.url);
                          }}
                        ></Button>
                        <Button
                          size="small"
                          icon="trash"
                          color="red"
                          onClick={() => {
                            deleteFile(file._id);
                          }}
                        ></Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
                :
                <Table.Row>
                  <Table.Cell>
                    <h3>No se encontraron resultados</h3>
                  </Table.Cell>
                </Table.Row>

              }
            </Table.Body>
          </Table>
        </Modal.Content>

        <Modal.Actions>
          <Button color="purple" onClick={() => setOpenView(false)}>
            Atras
          </Button>
          <Button
            color="red"
            onClick={() => {
              setOpenSearch(false);
              setOpenView(false);
            }}
          >
            Cancelar
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
