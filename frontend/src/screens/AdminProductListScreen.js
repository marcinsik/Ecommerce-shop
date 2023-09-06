import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import AdminScreen from "./AdminScreen";
import { listUsers, deleteUser } from "../actions/userActions";
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from "../constants/productConstants";
import { Pagination } from 'react-bootstrap';

function AdminProductListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    const createProductHandler = () => {
        dispatch(createProduct())
    }


    const deleteHandler = (id) => {
        if (window.confirm('Na pewno chcesz usunąć ten produkt?'))
        {
            dispatch(deleteProduct(id))
        }
    }


    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            navigate(`/login`)
        }
        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }
        else {
            dispatch(listProducts())
        }

    }, [dispatch, userInfo, successDelete, successCreate, createdProduct])


    // Filter orders based on searchKeyword
    const filteredProducts = products.filter((product) => {
        const idMatch = String(product._id).toLowerCase().includes(searchKeyword.toLowerCase());
        const userMatch = product.name && String(product.name).toLowerCase().includes(searchKeyword.toLowerCase());
        return idMatch || userMatch;
    });


    // Pagination
    const productsPerPage = 5;
    
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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

                <h1 className="admin-productlist-title">Produkty <Form className="admin-product-search">
                <Form.Control
                    type="search"
                    placeholder="Znajdź produkt"
                    className="admin-user-search-form"
                    aria-label="Search"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                    <Button variant="dark">Wyszukaj</Button>
                </Form> </h1>


                <Col className='text-right'>
                    <Button className='my-3' onClick = {createProductHandler} >
                        <i className='fas fa-plus'></i> Dodaj produkt
                    </Button>
                </Col>


            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

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
                                    {currentProducts.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td><img src={product.image} alt={product.name} style={{ width: '75px', height: '75px' }} /></td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category_name}</td>
                                            <td>{product.brand}</td>
                                            
                                            <td style={{ display: 'grid', justifyContent: 'center' }}>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='dark' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            {pagination}
                        </div>
                    )}
        </div>
    )
}

export default AdminProductListScreen