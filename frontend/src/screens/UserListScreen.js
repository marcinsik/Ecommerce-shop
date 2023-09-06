import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import AdminScreen from "./AdminScreen";
import { listUsers, deleteUser } from "../actions/userActions";
import { Pagination } from 'react-bootstrap';

function UserListScreen( ) {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);


    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }

    }, [dispatch, successDelete, userInfo])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }


    const filteredUsers = users
  ? users.filter((user) => {
      const idMatch = String(user._id).toLowerCase().includes(searchKeyword.toLowerCase());
      const userMatch = user.name && String(user.name).toLowerCase().includes(searchKeyword.toLowerCase());
      const emailMatch = user.email && String(user.email).toLowerCase().includes(searchKeyword.toLowerCase());
      return idMatch || userMatch || emailMatch
    })
  : [];

//PAGINATION
    const usersPerPage = 5;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = users ? Math.ceil(users.length / usersPerPage) : 0;

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
            <h1 className="admin-userlist-title">Lista użytkowników <Form className="admin-user-search">
            <Form.Control
                    type="search"
                    placeholder="Znajdź użytkownika"
                    className="admin-user-search-form"
                    aria-label="Search"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
            <Button variant="dark">Wyszukaj</Button>
          </Form></h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                    <>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>IMIĘ</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fas fa-check' style={{ color: 'red' }}></i>
                                        )}</td>

                                        <td style={{ display: 'flex', justifyContent: 'center' }}>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='dark' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>            
                        </Table>
                        {pagination}
                    </>
                              
                                           
                    )}
        </div>
    )
}

export default UserListScreen