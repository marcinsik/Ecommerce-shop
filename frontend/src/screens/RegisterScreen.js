import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import { useNavigate, useLocation } from 'react-router-dom';


function RegisterScreen(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister


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

        if (password != confirmPassword) {
            setMessage('Hasła nie są takie same')
        } else {
            dispatch(register(name, email, password))
        }

    }
    return (
        <FormContainer>
            <h1>Rejestracja</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Imie</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Imie'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='e-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Hasło'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Powtórz hasło</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Zarejestruj się
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Posiadasz już konto? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Zaloguj się
                        </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}
export default RegisterScreen