import React, { useCallback, useState } from "react";
import { Button, Modal, Form, Input, Select, Image } from "semantic-ui-react";

import { useAuth } from "../../../../hooks/useAuth";

import "./modalNewFile.css";

export default function ModalNewFile({
  open,
  setOpen,
  onReload,
  setSearch,
  search,
  files,
  setOpenView,
  setArrSearch,
}) {
  const { accesToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const searchfile = () => {
    setLoading(true);
    const filesRes = files.filter((f) => {
      return (
        f.nombre.toLowerCase().includes(search.toLowerCase()) ||
        f.tipo.toLowerCase().includes(search.toLowerCase())
      );
    });
    setArrSearch(filesRes);
    setLoading(false);
    setOpenView(true);
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
        <Modal.Header>Buscar Archivo:</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Nombre del Archivo:</label>
              <Input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Nombre del Archivo"
              />
            </Form.Field>
            <Form.Field>
              <Button onClick={() => searchfile()} color="green">
                {loading ? "Buscando..." : "Buscar"}
              </Button>
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
