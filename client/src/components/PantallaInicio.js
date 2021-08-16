import React, { useState } from "react";
import axios from "axios";
import { Link, Router, navigate } from "@reach/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styles from "./FormRegistroLogin.module.css";
import logo from "../imagen/logo.png";

const PantallaInicio = () => {
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

      <Row>
        <Col xs={12}>
          <div className="d-grid gap-2">
            <Button variant="secondary" size="lg">
              <Link to={`/requerimiento/`}>Crear Requerimiento</Link>
            </Button>

            <Button variant="danger" size="lg">
              <Link to={`/consulta/`}>Consultar Estado del Requerimiento</Link>
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={6}></Col>
      </Row>
    </Container>
  );
};

export default PantallaInicio;
