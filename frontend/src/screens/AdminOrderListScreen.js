import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import AdminScreen from "./AdminScreen";
import { listOrders } from "../actions/orderActions";
import { Pagination } from 'react-bootstrap';

function AdminOrderListScreen( ) {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate])

    

    // Check if orders is undefined or empty
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Message variant='danger'>{error}</Message>;
    }

    // Filter orders based on searchKeyword
    const filteredOrders = orders.filter((order) => {
        const idMatch = String(order._id).toLowerCase().includes(searchKeyword.toLowerCase());
        const userMatch = order.user && String(order.user.name).toLowerCase().includes(searchKeyword.toLowerCase());
        return idMatch || userMatch;
    });


    // Pagination
    const ordersPerPage = 5;
    
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder= indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

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

    return (
        <div>
            <AdminScreen />
            <h1 className="admin-userlist-title">Lista zamówień
                <Form className="admin-user-search">
                <Form.Control
                    type="search"
                    placeholder="Znajdź zamówienie"
                    className="admin-user-search-form"
                    aria-label="Search"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                    <Button variant="dark">Wyszukaj</Button>
                </Form>
            </h1>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UŻYTKOWNIK</th>
                        <th>DATA</th>
                        <th>KWOTA</th>
                        <th>OPŁACONE</th>
                        <th>DOSTARCZONE</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 20).replace("T"," || ")}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (
                                    order.paidAt.substring(0,10)
                                ) : (
                                    <i className='fas fa-check' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                    order.deliveredAt.substring(0, 10)
                                ) : (
                                    <i className='fas fa-check' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td style={{ display: 'flex', justifyContent: 'center' }}>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='dark' className='btn-sm'>
                                        Szczegóły
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {pagination}
        </div>
    );
}

export default AdminOrderListScreen;
