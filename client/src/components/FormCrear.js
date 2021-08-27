import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, Router, navigate } from "@reach/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styles from "./FormCrear.module.css";
import logo from "../imagen/logo.png";
import moment from "moment";
import Swal from 'sweetalert2';
import UserContext from "../context/userContext";

const FormCrear = (props) => {

  const context = useContext(UserContext);

  const [stateDelivery, setStateDelivery] = useState({
    clientName: context.users.userName,
    clientAddress: context.users.userAddress,
    clientEmail: context.users.userEmail,
    clientPhone: context.users.userPhone,
    productClient: "",
    dateClient: "",
    timeClient: "",
    nameProductI: "",
    destinoProductI: "",
    nameProductII: "",
    destinoProductII: "",
    nameProductIII: "",
    destinoProductIII: "",
    nameProductIV: "",
    destinoProductIV: "",
    nameProductV: "",
    destinoProductV: "",
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setStateDelivery({
      ...stateDelivery,
      [name]: value,
    });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    const data = {
      ...stateDelivery,
      dateClient: moment.utc(stateDelivery.dateClient, "YYYY-MM-DD"),
      timeClient: moment.utc(stateDelivery.timeClient, "HH:mm"),
    };
    axios
      .post("/api/delivery", data)
      .then((res) => {
        props.setListState([...props.listState, res.data]);
        Swal.fire("Requerimiento creado");
        navigate("/inicio/");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <Container className={styles.formCrearContainer}>
      <Row>
        <Col xs={12} md={6}>
        <Link to= {`/inicio/`}><img src={logo} className={styles.logo} alt="Logo Gestión Delivery" /></Link>
        </Col>
        <Col xs={12} md={6}>
          <h1 className={styles.title}>Gestión de Delivery</h1>
        </Col>
      </Row>
      <Form onSubmit={onSubmitForm}>
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
                onChange={handleChangeForm}
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
                onChange={handleChangeForm}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Cantidad de Productos</Form.Label>
              <Form.Control
                type="text"
                required
                name="productClient"
                value={stateDelivery.productClient}
                onChange={handleChangeForm}
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
                onChange={handleChangeForm}
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
                onChange={handleChangeForm}
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
                    value={stateDelivery.dateClient}
                    onChange={handleChangeForm}
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
                    value={stateDelivery.timeClient}
                    onChange={handleChangeForm}
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
                placeholder="Nombre del producto"
                required
                name="nameProductI"
                value={stateDelivery.nameProductI}
                onChange={handleChangeForm}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="destinoProductI">
              <Form.Control
                type="text"
                placeholder="Destino del producto"
                required
                name="destinoProductI"
                value={stateDelivery.destinoProductI}
                onChange={handleChangeForm}
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
                placeholder="Nombre del producto"
                name="nameProductII"
                value={stateDelivery.nameProductII}
                onChange={handleChangeForm}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="destinoProductII">
              <Form.Control
                type="text"
                placeholder="Destino del producto"
                name="destinoProductII"
                value={stateDelivery.destinoProductII}
                onChange={handleChangeForm}
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
                placeholder="Nombre del producto"
                name="nameProductIII"
                value={stateDelivery.nameProductIII}
                onChange={handleChangeForm}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="destinoProductIII">
              <Form.Control
                type="text"
                placeholder="Destino del producto"
                name="destinoProductIII"
                value={stateDelivery.destinoProductIII}
                onChange={handleChangeForm}
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
                placeholder="Nombre del producto"
                name="nameProductIV"
                value={stateDelivery.nameProductIV}
                onChange={handleChangeForm}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="destinoProductIV">
              <Form.Control
                type="text"
                placeholder="Destino del producto"
                name="destinoProductIV"
                value={stateDelivery.destinoProductIV}
                onChange={handleChangeForm}
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
                placeholder="Descripción del producto"
                placeholder="Nombre del producto"
                name="nameProductV"
                value={stateDelivery.nameProductV}
                onChange={handleChangeForm}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="destinoProductV">
              <Form.Control
                type="text"
                placeholder="Destino del producto"
                name="destinoProductV"
                value={stateDelivery.destinoProductV}
                onChange={handleChangeForm}
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

export default FormCrear;
