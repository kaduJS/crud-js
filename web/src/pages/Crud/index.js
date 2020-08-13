import React, { useState, useEffect } from "react";

import { Main } from "./styles";
import { Form, Button, Row, Col, Table } from "react-bootstrap";

import api from "../../services/api";

export default function Crud() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [state, setState] = useState([]);

  async function loadAPI() {
    await api.get("/users").then((res) => {
      const list = res.data;
      setState(list);
    });
  }

  function apiSendData(data) {
    api.post("/user", data);
  }

  useEffect(() => {
    loadAPI();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name,
      email,
      password,
      admin,
    };
    apiSendData(data);
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
              defaultValue={name}
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
              defaultValue={email}
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
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check
              label="Admin"
              defaultChecked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Cadastrar</Button>
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
          </tr>
        </thead>
        <tbody>
          {state.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{(user.admin && "SIM") || "NÃO"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Main>
  );
}
