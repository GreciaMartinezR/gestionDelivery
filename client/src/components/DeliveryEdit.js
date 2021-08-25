import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import styles from "./DeliveryDetails.module.css";
import logo from "../imagen/logo.png";
import moment from "moment";

const DeliveryEdit = ({ id }) => {
  const [stateDelivery, setDelivery] = useState({});

  useEffect(() => {
    axios
      .get(`/api/delivery/${id}`)
      .then((resp) => {
        console.log(resp, "aqui está el resp");
        setDelivery({
          ...resp.data,
        });
      })
      .catch((error) => console.log("error en data", error));
  }, []);

  const handleChangeForm = (ev) => {
    const { name, value } = ev.target;
    setDelivery({
      ...stateDelivery,
      [name]: value,
    });
  };

  const updateDelivery = (e) => {
    e.preventDefault();
    axios
      .put(`/api/delivery/${id}`, stateDelivery)
      .then((res) => {
        navigate(`/consulta/`);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <img src={logo} className={styles.logo} alt="Logo Gestión Delivery" />
        </Col>
        <Col xs={12} md={6}>
          <h1 className={styles.title}>Gestión de Delivery</h1>
        </Col>
      </Row>

      <Form onSubmit={updateDelivery}>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Nombre del cliente</Form.Label>
              <Form.Control
                type="text"
                required
                readOnly
                minLength={2}
                name="clientName"
                value={stateDelivery.clientName}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                required
                readOnly
                name="clientEmail"
                value={stateDelivery.clientEmail}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Cantidad de Productos</Form.Label>
              <Form.Control
                type="text"
                required
                name="productClient"
                value={stateDelivery.productClient}
                onChange={(e) => handleChangeForm(e)}
              />
              <Form.Text className="text-muted">
                Máximo 5 productos por envío
              </Form.Text>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                required
                readOnly
                name="clientAddress"
                value={stateDelivery.clientAddress}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                required
                readOnly
                name="clientPhone"
                value={stateDelivery.clientPhone}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formGridPassword">
                  <Form.Label>Fecha de retiro</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    name="dateClient"
                    value={moment(stateDelivery.dateClient).format(
                      "YYYY-MM-DD"
                    )}
                    onChange={(e) => handleChangeForm(e)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formGridPassword">
                  <Form.Label>Hora de retiro</Form.Label>
                  <Form.Control
                    type="time"
                    required
                    name="timeClient"
                    value={moment(stateDelivery.timeClient).format("HH:mm")}
                    onChange={(e) => handleChangeForm(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>

        <hr></hr>

        <Row>
          <Col md={6}>
            <Form.Group controlId="nameProductI">
              <Form.Control
                type="text"
                required
                name="nameProductI"
                value={stateDelivery.nameProductI}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="destinoProductI">
              <Form.Control
                type="text"
                required
                name="destinoProductI"
                value={stateDelivery.destinoProductI}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <hr></hr>

        <Row>
          <Col md={6}>
            <Form.Group controlId="nameProductII">
              <Form.Control
                type="text"
                name="nameProductII"
                value={stateDelivery.nameProductII}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="destinoProductII">
              <Form.Control
                type="text"
                name="destinoProductII"
                value={stateDelivery.destinoProductII}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <hr></hr>

        <Row>
          <Col md={6}>
            <Form.Group controlId="nameProductIII">
              <Form.Control
                type="text"
                name="nameProductIII"
                value={stateDelivery.nameProductIII}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="destinoProductIII">
              <Form.Control
                type="text"
                name="destinoProductIII"
                value={stateDelivery.destinoProductIII}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <hr></hr>

        <Row>
          <Col md={6}>
            <Form.Group controlId="nameProductIV">
              <Form.Control
                type="text"
                name="nameProductIV"
                value={stateDelivery.nameProductIV}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="destinoProductIV">
              <Form.Control
                type="text"
                name="destinoProductIV"
                value={stateDelivery.destinoProductIV}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <hr></hr>

        <Row>
          <Col md={6}>
            <Form.Group controlId="nameProductV">
              <Form.Control
                type="text"
                name="nameProductV"
                value={stateDelivery.nameProductV}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="destinoProductV">
              <Form.Control
                type="text"
                name="destinoProductV"
                value={stateDelivery.destinoProductV}
                onChange={(e) => handleChangeForm(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <hr></hr>

        <Row className="justify-content-md-center">
          <Col xs={6}>
            <div className="d-grid gap-2">
              <Button type="submit" variant="danger" size="lg">
                Enviar Requerimiento
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default DeliveryEdit;
