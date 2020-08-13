import React, { useState, useEffect } from "react";

import { Main } from "./styles";
import { Form, Button, Row, Col, Table } from "react-bootstrap";

import api from "../../services/api";

export default function Crud() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [state, setState] = useState([]);

  async function loadAPI() {
    await api.get("/users").then((res) => {
      const list = res.data;
      setState(list);
    });
  }

  function apiCreateData(data) {
    api.post("/user", data);
    // alert("Created");
  }

  function apiUpdateData(data) {
    api.put(`/user/${data.id}`, data);
    // alert("Updated");
  }

  function apiDeleteData(id) {
    api.delete(`/user/${id}`);
    // alert("Deleted");
  }

  useEffect(() => {
    loadAPI();
  }, []);

  function clearFields() {
    setId(0);
    setName("");
    setEmail("");
    setPassword("");
    setAdmin(false);
  }

  function handleEditMode(event, user) {
    event.preventDefault();

    editMode ? setEditMode(false) : setEditMode(true);

    if (editMode) {
      clearFields();
      if (user.id) setId(user.id);
      setName(user.name);
      setEmail(user.email);
      setAdmin(user.admin);
    } else {
      clearFields();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      id,
      name,
      email,
      password,
      admin,
    };
    id ? apiUpdateData(data) : apiCreateData(data);
  }

  return (
    <Main>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group as={Row} controlId="formHorizontalName">
          <Form.Label column sm={2}>
            Nome
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Senha
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check
              label="Admin"
              checked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">{!editMode ? "Salvar" : "Cadastrar"}</Button>
          </Col>
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {state.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{(user.admin && "SIM") || "NÃO"}</td>
              <td>
                <Button
                  className="btn-table"
                  onClick={(e) => handleEditMode(e, user)}
                >
                  {!editMode && user.id === id ? "Cancelar" : "Editar"}
                </Button>
                <Button
                  className="btn-table"
                  onClick={() => apiDeleteData(user.id)}
                >
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Main>
  );
}
