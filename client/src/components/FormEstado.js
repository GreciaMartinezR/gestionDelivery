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
  faFileDownload
} from "@fortawesome/free-solid-svg-icons";
import styles from "./FormEstado.module.css";
import logo from "../imagen/logo.png";
import Swal from 'sweetalert2'

const FormEstado = (props, { id }) => {

  const context = useContext(UserContext);
  const [file, setFile] = useState({});

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
    Swal.fire({
      title: 'Estás seguro que deseas borrar?',
      text: 'No podrás recuperar este archivo',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No.'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/delivery/${id}`).then((res) => {
      const delivery = props.deliveryArray.filter((p) => p._id !== id);
      props.setDeliveryArray(delivery);
    });
      }
    })
    
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

  //Código para subir archivo
  const subirArchivo = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
        'file',
        file,
        file.name
    )

    axios.post('/api/file', formData, {enctype:"multipart/form-data"})
        .then(resp => {
          Swal.fire("Archivo cargado con éxito");
          navigate("/inicio/")
        })
        .catch(error => {
          console.log(error)
          Swal.fire("No se cargó el archivo")
        });
}

  //Código para el Logout
  const Logout = (e) =>{
    e.preventDefault();
    localStorage.removeItem('user');
    navigate('/');
}

  return (
    <Container className={styles.spaceContainer}>
      <Row>
        <Col xs={6} md={6}>
        <Link to= {`/inicio/`}><img src={logo} className={styles.logo} alt="Logo Gestión Delivery" /></Link>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.deliveryArray.map((delivery, index) => (
            <tr key={index}>
              <td>{delivery._id}</td>
              <td>{delivery.clientName}</td>
              <td>{delivery.productClient}</td>
              <td>{delivery.statusDelivery}</td>

              {context.users.userType &&
                  context.users.userType == "Client" && (
              <td>
              <form onSubmit={subirArchivo} encType="multipart/form-data">
                    <input type="file" name="file" onChange={e => setFile(e.target.files[0])}/>
                    <Button size="sm" type="submit">
                <FontAwesomeIcon
                  className={styles.iconDetails}
                  icon={faFileUpload}
                /></Button>
                </form>
              </td>
              )}
              <td>
                <Link to={`/delivery/${delivery._id}`}>
                  {" "}
                  <FontAwesomeIcon
                    className={styles.iconDetails}
                    icon={faInfo}
                  />{" "}
                </Link>

                {(delivery.statusDelivery != "En proceso" || delivery.statusDelivery != "Finalizar") ? "" : (
                  <Link to={`/edit/${delivery._id}`}>
                    <FontAwesomeIcon
                      className={styles.iconDetails}
                      icon={faEdit}
                    />
                  </Link>
                )}

                {delivery.statusDelivery != "En proceso" &&(
                <FontAwesomeIcon
                  className={styles.iconDetails}
                  onClick={(event) => deleteDelivery(event, delivery._id)}
                  icon={faTrashAlt}
                />
                )}

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

                  {/* {context.users.userType &&
                  context.users.userType == "Admin" && (
                    <FontAwesomeIcon
                      className={styles.iconDetails}
                      icon={faFileDownload}
                    />
                  )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FormEstado;
