import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message"
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { useNavigate, useLocation } from "react-router-dom";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const redirect = queryParams.get("redirect") ?? "/"
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails)
  const { error, loading, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

 

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success ) {
        dispatch({type: USER_UPDATE_PROFILE_RESET})
        dispatch(getUserDetails("profile"))
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, location, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
            setMessage('Hasła różnią się od siebie')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
      }

  return (
    <Col md={6} className="profile-form">   
      <h2 className="text-center">Profil użytkownika</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form className="my-4" onSubmit={submitHandler}>
        {/* Name */}
        <Form.Group controlId="name">
          <Form.Label className="form-label">Imię</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Imię"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </Form.Group>

        {/* Email */}
        <Form.Group controlId="email">
          <Form.Label className="form-label">Adres Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </Form.Group>

        {/* Password */}
        <Form.Group controlId="password">
          <Form.Label className="form-label">Hasło</Form.Label>
          <Form.Control
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group controlId="passwordConfirm">
          <Form.Label className="form-label">Powtórz hasło</Form.Label>
          <Form.Control
            type="password"
            placeholder="Hasło"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
          />
        </Form.Group>

        {/* Submit Button */}
        <Button type="submit" variant="primary" className="w-100">
          Zapisz
        </Button>
      </Form>
    </Col>
  );
}

export default ProfileScreen;
