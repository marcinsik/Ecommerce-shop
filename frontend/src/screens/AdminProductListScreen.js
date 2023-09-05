import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import AdminScreen from "./AdminScreen";
import { listUsers, deleteUser } from "../actions/userActions";
import { listProducts } from '../actions/productActions'


function AdminProductListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
        }
        else {
            navigate('/login')
        }
        
    }, [dispatch, userInfo])

    return (

        <div>
            <AdminScreen />

                <h1 className="admin-productlist-title">Produkty <Form className="admin-product-search">
                    <Form.Control
                        type="search"
                        placeholder="Znajdź produkt"
                        className="admin-product-search-form"
                        aria-label="Search"
                    />
                    <Button variant="dark">Wyszukaj</Button>
                </Form></h1>


                <Col className='text-right'>
                    <Button className='my-3' >
                        <i className='fas fa-plus'></i> Dodaj produkt
                    </Button>
                </Col>


            {/* {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>} */}


            {/* {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>} */}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Zdjęcie</th>
                                        <th>Nazwa</th>
                                        <th>Cena</th>
                                        <th>Kategoria</th>
                                        <th>Producent</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td><img src={product.image} alt={product.name} style={{ width: '75px', height: '75px' }} /></td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>

                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
        </div>
    )
}

export default AdminProductListScreen