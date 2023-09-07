import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card, ListGroupItem, Form } from "react-bootstrap";
import { Nav, Navbar, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { listProductsDetails, createProductReview } from "../actions/productActions";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductScreen() {

  const { id } = useParams();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    dispatch(listProductsDetails(id))

  }, [dispatch, id, successProductReview, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(
      id, {
      rating,
      comment
    }
    ))
  }

  //ilość do dodania do koszyka
  const [qty, setQty] = useState(1);


  //dodanie do koszyka
  const navigate = useNavigate();
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  }

  //Scroll
  const [activeLink, setActiveLink] = useState("description");
  const handleNavClick = (link) => {
    setActiveLink(link);
    const element = document.getElementById(link);
    const offset = 100; // add some offset to adjust the scrolling position
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  // previous page
  const handleGoBack = () => {
    window.history.back();
  };


  return (
    <div>
      <div className="back-button">
        <button className="btn btn-dark mb-" onClick={handleGoBack}>
          Powrót
        </button>
      </div>

      {loading ?
        <Loader />
        : error
          ? <div>s</div>
          : (
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid style={{ width: "600px", maxHeight: "350px" }} />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>{product.name}</ListGroup.Item>

                  <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} opinii`} />
                  </ListGroup.Item>

                </ListGroup>
              </Col>

              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Cena:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? 'Dostępne' : 'Brak'}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col className="d-flex align-items-center">Ilość</Col>
                          <Col xs lg="0" className='my-0'>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {

                                [...Array(product.countInStock).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))
                              }

                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button className='btn-block' disabled={product.countInStock <= 0} type='button' onClick={addToCartHandler}>
                        Dodaj do koszyka
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>


              <Navbar bg="light" variant="light" style={{ marginTop: '30px' }}>
                <Container>
                  <Nav className="details">
                    <Nav.Link active={activeLink === "description"} onClick={() => handleNavClick("description")}> Opis</Nav.Link>

                    <Nav.Link active={activeLink === "specification"} onClick={() => handleNavClick("specification")}>Specyfikacja</Nav.Link>

                    <Nav.Link active={activeLink === "accessories"} onClick={() => handleNavClick("accessories")}>Akcesoria</Nav.Link>

                    <Nav.Link active={activeLink === "reviews"} onClick={() => handleNavClick("reviews")}>Opinie (liczba)</Nav.Link>
                  </Nav>
                </Container>
              </Navbar>
              <Container style={{ marginTop: '20px' }}>
                <div id="description">
                  <h2>Opis</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <ListGroup.Item>{product.description}</ListGroup.Item>
                </div>

                <div id="specification">
                  <h2>Specyfikacja</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>

                <div id="accessories">
                  <h2>Akcesoria</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>

                <div id="reviews">
                  <h2>Opinie </h2>
                  <Row>
                    <Col md={6}>
                     
                      {product.reviews.length === 0 && <Message variant='info'>Brak opinii</Message>}

                      <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                          <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} color='#f8e825' />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                          </ListGroup.Item>
                        ))}

                        <ListGroup.Item>
                          <h4>Dodaj opinie.</h4>

                          {loadingProductReview && <Loader />}
                          {successProductReview && <Message variant='success'>Opinia została dodana.</Message>}
                          {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                          {userInfo ? (
                            <Form onSubmit={submitHandler}>
                              <Form.Group controlId='rating'>
                                <Form.Label>Ocena</Form.Label>
                                <Form.Control
                                  as='select'
                                  value={rating}
                                  onChange={(e) => setRating(e.target.value)}
                                >
                                  <option value=''>Wybierz...</option>
                                  <option value='1'>1 </option>
                                  <option value='2'>2 </option>
                                  <option value='3'>3 </option>
                                  <option value='4'>4 </option>
                                  <option value='5'>5 </option>
                                </Form.Control>
                              </Form.Group>

                              <Form.Group controlId='comment'>
                                <Form.Label>Recenzja</Form.Label>
                                <Form.Control
                                  as='textarea'
                                  row='5'
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                              </Form.Group>

                              <Button
                                disabled={loadingProductReview}
                                type='submit'
                                variant='primary'
                              >
                                Dodaj
                              </Button>

                            </Form>
                          ) : (
                            <Message variant='info'>Zaloguj się <Link to='/login'>login</Link> aby dodać recenzje.</Message>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>

                </div>
              </Container>
            </Row>

          )
      }

    </div>
  );
}


export default ProductScreen;
