import React, { useState } from "react";
import axios from "axios";
import { Link, Router, navigate } from "@reach/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styles from "./PantallaInicio.module.css";
import logo from "../imagen/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

const PantallaInicio = () => {

  //Código para el Logout
  const Logout = (e) =>{
    e.preventDefault();
    localStorage.removeItem('user');
    navigate('/');
}

  return (
    <Container>
     <Row>
        <Col xs={6} md={6}>
          <img src={logo} className={styles.logo} alt="Logo Gestión Delivery" />
        </Col>

        <Col xs={6} md={6}>
          <Row style={{justifyContent: "flex-end"}}>
            <Col xs={6}>
              <Button onClick={Logout} variant="dark">Cerrar sesión <FontAwesomeIcon icon={faSignOutAlt}/></Button>{' '}
            </Col>
          </Row>
          <Row style={{marginTop: "20%"}}>
            <h1 className="text-center">Gestión de Delivery</h1>
          </Row>
        </Col>

      </Row>

      <Row>
        <Col xs={12}>
          <div className="d-grid gap-2" style={{marginTop: "10%"}}>
            <Button variant="secondary" size="lg">
              <Link to={`/requerimiento/`} className={styles.linkText}>Crear Requerimiento</Link>
            </Button>

            <Button variant="danger" size="lg">
              <Link to={`/consulta/`} className={styles.linkText}>Consultar Estado del Requerimiento</Link>
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
