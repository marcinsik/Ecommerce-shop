import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { useNavigate, useLocation } from "react-router-dom";


function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get("redirect") ?? "/";
  
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container fluid className="p-3 my-5 h-custom">
      {loading && <Loader />}
      <Row>
        <Col col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </Col>
        <Col col="4" md="6">
        <div className="login-info mb-4" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', minHeight: '100px', position: 'relative' }}>
          <p style={{ fontSize: '28px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            Logowanie
          </p>
        </div>

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Adres email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Hasło"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-between mb-4">
              <Form.Check type="checkbox" label="Zapamiętaj hasło" />
              <a href="!#">Nie pamiętasz hasła?</a>
            </div>

            
              <Button type="submit" variant="primary" className="w-100 mt-3">
                Zaloguj się
              </Button>
              
              <Row className='py-3'>
                <Col>
                    Nie posiadasz konta? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Zarejestruj się
                        </Link>
                </Col>
              </Row>        
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default LoginScreen;
