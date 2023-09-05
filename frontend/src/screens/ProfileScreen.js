import React, { useState, useEffect } from "react";
import { Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col, Table, Tab, Tabs } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message"
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { useNavigate, useLocation } from "react-router-dom";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";

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

  const orderListMy = useSelector(state => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;



//PAGINATION
  const ordersPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders ? orders.slice(indexOfFirstOrder, indexOfLastOrder) : [];

  const totalPages = orders ? Math.ceil(orders.length / ordersPerPage) : 0;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pagination = (
    <Pagination>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      ))}
    </Pagination>
  );


  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !==user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails("profile"))
        dispatch(listMyOrders())
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, location, userInfo, user, success, orders]);


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
    <Row className="user-profile">
    <Col md={20} className="profile-form">
    <Tabs> 
    <Tab eventKey="profile" title="Profil użytkownika">
        <h2 className="text-center mt-5">Twoje dane</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
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
      </Tab>

      {/* ORDERS */}
      <Tab eventKey="orders" title="Moje zamówienia" className="mt-5">
        {/* Existing code */}
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <>
            <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Cena</th>
                <th>Opłacone</th>
                <th>Dostarczone</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">Szczegóły</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
            </Table>      
            {pagination}      
          </>
        )}
      </Tab>
        <Tab eventKey="settings" title="Ustawienia">

        </Tab>
        
      </Tabs>
    </Col>
  </Row>

  )
}

export default ProfileScreen
