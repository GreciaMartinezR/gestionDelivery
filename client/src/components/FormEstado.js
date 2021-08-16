import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/userContext";
import axios from "axios";
import { navigate, Link } from "@reach/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faFileUpload,
  faEdit,
  faTrashAlt,
  faSpinner,
  faCheckCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./FormEstado.module.css";
import logo from "../imagen/logo.png";

const FormEstado = (props, { id }) => {

  const context = useContext(UserContext);

  const getAllDelivery = () => {
    axios
      .get("/api/delivery")
      .then((resp) => props.setDeliveryArray(resp.data))
      .catch((error) => console.log("error en data", error));
  };

  //Código para crear lista de requerimiento
  useEffect(() => {
    getAllDelivery();
  }, []);
  console.log("Aqui va el user", context.users)
  // Código para eliminar
  const deleteDelivery = (event, id) => {
    axios.delete(`/api/delivery/${id}`).then((res) => {
      const delivery = props.deliveryArray.filter((p) => p._id !== id);
      props.setDeliveryArray(delivery);
    });
  };

  //Código para actualizar estado
  const cambioEstado = (newStatus, infoDelivery) => {
    const updateDelivery = { ...infoDelivery, statusDelivery: newStatus };
    axios
      .put(`/api/delivery/${infoDelivery._id}`, updateDelivery)
      .then((res) => getAllDelivery())
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <Container className={styles.formCrearContainer}>
      <Row>
        <Col xs={6} md={6}>
          <img src={logo} className={styles.logo} alt="Logo Gestión Delivery" />
        </Col>

        <Col xs={6} md={6}>
        <FontAwesomeIcon
          icon={faSignOutAlt}
        />
          <h1 className={styles.title}>Gestión de Delivery</h1>
        </Col>

      </Row>
      <Row>
        <h2 align="center">Estado del Requerimiento</h2>
        <br></br>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Número de Requerimiento</th>
            <th>Cliente</th>
            <th>Cantidad de Productos</th>
            <th>Estado del Requerimiento</th>
          </tr>
        </thead>
        <tbody>
          {props.deliveryArray.map((delivery, index) => (
            <tr key={index}>
              <td>{delivery._id}</td>
              <td>{delivery.clientName}</td>
              <td>{delivery.productClient}</td>
              <td>{delivery.statusDelivery}</td>
              <td>
                <Link to={`/delivery/${delivery._id}`}>
                  {" "}
                  <FontAwesomeIcon
                    className={styles.iconDetails}
                    icon={faInfo}
                  />{" "}
                </Link>
                <FontAwesomeIcon
                  className={styles.iconDetails}
                  icon={faFileUpload}
                />
                {delivery.statusDelivery != "Finalizado" && (
                  <Link to={`/edit/${delivery._id}`}>
                    <FontAwesomeIcon
                      className={styles.iconDetails}
                      icon={faEdit}
                    />
                  </Link>
                )}
                <FontAwesomeIcon
                  className={styles.iconDetails}
                  onClick={(event) => deleteDelivery(event, delivery._id)}
                  icon={faTrashAlt}
                />
                {context.users.userType &&
                  context.users.userType == "Admin" && (
                    <FontAwesomeIcon
                      className={styles.iconDetails}
                      onClick={() => cambioEstado("En proceso", delivery)}
                      icon={faSpinner}
                    />
                  )}
                {context.users.userType &&
                  context.users.userType == "Admin" && (
                    <FontAwesomeIcon
                      className={styles.iconDetails}
                      onClick={() => cambioEstado("Finalizado", delivery)}
                      icon={faCheckCircle}
                    />
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FormEstado;
