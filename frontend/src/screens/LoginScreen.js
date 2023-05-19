import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import { useNavigate, useLocation } from 'react-router-dom';


function LoginScreen(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get('redirect') ?? '/';

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
          navigate(redirect);
        }
      }, [userInfo, redirect, navigate]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1 className="text-center mb-4">MyShop</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='e-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-3"
                    />
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='hasło'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-3"
                    />
                </Form.Group>

                <Button type='submit' variant='primary' className="w-100 mt-3">
                    Zaloguj się
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Nie posiadasz konta?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Zarejestruj się
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen