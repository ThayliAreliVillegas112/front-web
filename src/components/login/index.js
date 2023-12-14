import React, { useState, Fragment } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Utileria from '../../util';
import routeConstant from '../../router/routeConstant';
import LoginService from '../../services/LoginService';
import { useAuth } from '../../Layout/AppMain/AuthContext';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const parametros = { usuario: username, contrasena: password }

    LoginService.login(parametros).then(({ data }) => {

      localStorage.setItem('info', JSON.stringify(data))
      localStorage.setItem('tkn', data.token)


      login();

      history.push(routeConstant.PRODUCTO);

    }).catch((e) => {
      Utileria.errorhttp(e);
    }).finally(() => {
    });
  };

  return (
    
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'white' }}>
      {/* <link rel="manifest" href="manifest.json"></link>
      <script src="js/app.js"></script> */}
      <Row className="m-0">
        <Col lg={6} className="p-0">
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', padding: '20px', width: '100%', height: '100%' }}>
            <CardBody>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }} className="text-center mb-3">Iniciar sesión</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }} for="username">Usuario: *</Label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </FormGroup>


                <FormGroup>
                  <Label  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }} for="password">Contraseña: *</Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </FormGroup>
                <Button
                  className="mb-2 mt-4"
                  style={{
                    background: '#ffcc99',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '1.2rem',
                  }}
                  block
                >
                  Ingresar
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>


        <Col lg={6} className="p-0">
          <Card className="mb-0" style={{ background: 'linear-gradient(to left, #D5C8FF, #ffcc99)', borderRadius: '10px', padding: '20px', width: '100%', height: '100%' }}>
            <CardBody className="d-flex align-items-center justify-content-center">
              <img src={require('../../assets/utils/images/logo_background.png')} alt="" style={{ width: '50%' }} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;





