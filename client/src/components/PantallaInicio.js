import React, { useState, useContext } from "react";
import UserContext from "../context/userContext";
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

  const context = useContext(UserContext);

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
              <Button onClick={() => window.open("https://chatwsp.web.app/")}><img src="https://png.pngitem.com/pimgs/s/275-2755516_whatsapp-icon-and-vector-icone-whatsapp-preto-png.png"  width="35" height="35" alt="chatImage"/> Comunicate con nosotros</Button>
            </Col>
            <Col xs={6}>
              <Button onClick={Logout} variant="dark" style={{width:"10rem", height:"2.9rem"}}>Cerrar sesión <FontAwesomeIcon icon={faSignOutAlt}/></Button>{' '}
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
          {context.users.userType &&
                  context.users.userType == "Client" && (
            <Button variant="secondary" size="lg">
              <Link to={`/requerimiento/`} className={styles.linkText}>Crear Requerimiento</Link>
            </Button>
          )}
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
