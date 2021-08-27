import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate, Link } from "@reach/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import styles from "./DeliveryDetails.module.css";
import logo from "../imagen/logo.png";
import moment from "moment";

const DeliveryDetails = ({ id }) => {
  // Código para ver detalle
  const [deliveryState, setDelivery] = useState({
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    clientPhone: "",
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

  useEffect(() => {
    axios
      .get(`/api/delivery/${id}`)
      .then((resp) =>
        setDelivery({
          ...resp.data,
        })
      )
      .catch((error) => console.log("error en data", error));
  }, []);

  return (
    <Container className={styles.spaceContainer}>
      <Row>
        <Col xs={12} md={6}>
        <Link to= {`/inicio/`}><img src={logo} className={styles.logo} alt="Logo Gestión Delivery" /></Link>
        </Col>
        <Col xs={12} md={6}>
          <h1 className={styles.title}>Gestión de Delivery</h1>
        </Col>
      </Row>
      <h2 align="center">Número de Requerimiento: {deliveryState._id}</h2>
      <br></br>
      <Row className="mb-3">
        <Col md={5}>
          <p>Nombre del Cliente: {deliveryState.clientName}</p>
          <p>Dirección: {deliveryState.clientAddress}</p>
          <p>Teléfono: {deliveryState.clientPhone}</p>
          <p>Correo Electrónico: {deliveryState.clientEmail}</p>
        </Col>
        <Col md={4}>
          <p>Cantidad de Productos: {deliveryState.productClient}</p>
          <p>
            Fecha de retiro:{" "}
            {moment(deliveryState.dateClient).format("YYYY-MM-DD")}
          </p>
          <p>
            Hora de retiro: {moment(deliveryState.timeClient).format("HH:mm")}
          </p>
        </Col>

        <Col md={1}>
          <p>Estado del requerimiento: {deliveryState.statusDelivery}</p>
        </Col>
      </Row>
      <hr></hr>

      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Dirección de destino</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{deliveryState.nameProductI}</td>
              <td>{deliveryState.destinoProductI}</td>
            </tr>
            {deliveryState.nameProductII && (
              <tr>
                <td>{deliveryState.nameProductII}</td>
                <td>{deliveryState.destinoProductII}</td>
              </tr>
            )}
            {deliveryState.nameProductIII && (
              <tr>
                <td>{deliveryState.nameProductIII}</td>
                <td>{deliveryState.destinoProductIII}</td>
              </tr>
            )}
            {deliveryState.nameProductIV && (
              <tr>
                <td>{deliveryState.nameProductIV}</td>
                <td>{deliveryState.destinoProductIV}</td>
              </tr>
            )}
            {deliveryState.nameProductV && (
              <tr>
                <td>{deliveryState.nameProductV}</td>
                <td>{deliveryState.destinoProductV}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default DeliveryDetails;
