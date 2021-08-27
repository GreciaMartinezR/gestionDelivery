import React, { useState, useContext } from "react";
import UserContext from "../context/userContext";
import axios from "axios";
import { navigate } from "@reach/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styles from "./FormRegistroLogin.module.css";
import logo from "../imagen/logo.png";
import Swal from 'sweetalert2'

const FormRegistroLogin = () => {

  const context = useContext(UserContext);
  const {users, setUsers} = context;

  // Registro
  const [registroForm, setRegistroForm] = useState({
    userName: "",
    userEmail: "",
    userAddress: "",
    userType: "",
    userPhone: "",
    userPassword: "",
    userConfirmPassword: "",
  });

  const handleChangeLogin = (e) => {
    const { value, name } = e.target;
    setRegistroForm({
      ...registroForm,
      [name]: value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const user = {
      userName: registroForm.userName,
      userEmail: registroForm.userEmail,
      userAddress: registroForm.userAddress,
      userPhone: registroForm.userPhone,
      userPassword: registroForm.userPassword,
      userConfirmPassword: registroForm.userConfirmPassword,
    };
    axios
      .post("http://localhost:8000/api/registro", user)
      .then((res) => {
        if (res.data.error === true) {
          alert(res.data.mensaje);
        } else {
          
          setRegistroForm({
            userName: "",
            userEmail: "",
            userAddress: "",
            userPhone: "",
            userPassword: "",
            userConfirmPassword: "",
          });
          Swal.fire("Gracias por registrarte, inicia sesión");
        }
      })
      .catch((error) => console.log(error, "error"));
  };

  // Inicio de sesión
  const [inputs, setInputs] = useState({ userEmail: "", userPassword: "" });

  const actualizarFormulario = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    axios.post("/api/login/", inputs).then((resp) => {
      if (resp.data && !resp.data.error) {
        setUsers(resp.data.data)
        localStorage.setItem("user", JSON.stringify(resp.data.data));
        console.log("Por aqui el data data", resp.data.data)
        navigate("/inicio/");
      } else {

        Swal.fire('Error', resp.data.mensaje, 'error');
      }
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

      <Row>
        <Col xs={12} md={6}>
          <Form onSubmit={onSubmitHandler} className={styles.formulario}>
            <Row>
              <Col xs={12}>
                <h3>Registro de Usuario</h3>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nombre y Apellido</Form.Label>
                  <Form.Control
                    required
                    name="userName"
                    type="text"
                    placeholder="Ingrese nombre y apellido"
                    value={registroForm.userName}
                    onChange={handleChangeLogin}
                  />
                  {(registroForm.userName.length > 0 && registroForm.userName.length < 6) ? (<p style={{color: "red"}}>Nombre y apellido deben tener mas de 6 caracteres</p>) : "" }
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    required
                    name="userEmail"
                    type="email"
                    placeholder="Ingrese una dirección de correo electrónico válido"
                    value={registroForm.userEmail}
                    onChange={handleChangeLogin}
                  />
                  {(registroForm.userEmail.length > 0 && registroForm.userEmail.length < 5) ? (<p style={{color: "red"}}>Debe ingresar un correo electrónico name@mail.com</p>) : "" }
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    required
                    name="userAddress"
                    type="text"
                    placeholder="Ingrese dirección de local"
                    value={registroForm.userAddress}
                    onChange={handleChangeLogin}
                  />
                  {(registroForm.userAddress.length > 0 && registroForm.userAddress.length < 4) ? (<p style={{color: "red"}}>Debe ingresar su dirección </p>) : "" }
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Número telefónico</Form.Label>
                  <Form.Control
                    required
                    name="userPhone"
                    type="text"
                    placeholder="Ingrese número telefónico"
                    value={registroForm.userPhone}
                    onChange={handleChangeLogin}
                  />
                  {(registroForm.userPhone.length > 0 && registroForm.userPhone.length < 5) ? (<p style={{color: "red"}}>Debe ingresar su número telefónico</p>) : "" }
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    required
                    name="userPassword"
                    type="password"
                    placeholder="Contraseña"
                    value={registroForm.userPassword}
                    onChange={handleChangeLogin}
                  />
                  {(registroForm.userPassword.length > 0 && registroForm.userPassword.length < 8) ? (<p style={{color: "red"}}>La contraseña debe tener al menos 8 caracteres</p>) : "" }
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Repite tu contraseña</Form.Label>
                  <Form.Control
                    required
                    name="userConfirmPassword"
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={registroForm.userConfirmPassword}
                    onChange={handleChangeLogin}
                  />
                  {(registroForm.userPassword !== registroForm.userConfirmPassword) ? (<p style={{color: "red"}}>Las contraseñas deben coincidir </p>) : "" }
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Button variant="dark" type="submit">
                  Registrarse
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col xs={12} md={6}>
          <Form onSubmit={login} className={styles.formulario}>
            <Col xs={12}>
              <h3>Inicio de sesión</h3>
            </Col>

            <Col xs={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese una dirección de correo electrónico válido"
                  required
                  name="userEmail"
                  value={inputs.userEmail}
                  onChange={actualizarFormulario}
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  required
                  name="userPassword"
                  value={inputs.userPassword}
                  onChange={actualizarFormulario}
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Button variant="dark" type="submit">
                Inicia sesión
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormRegistroLogin;
