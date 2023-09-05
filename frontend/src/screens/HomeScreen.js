import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/productCarousel'


function HomeScreen() {

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())

  }, [dispatch])

  return (
    <div>
      <ProductCarousel />
      <p style={{ marginTop: '40px', fontSize: '32px' }}>Najnowsze produkty</p>

      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          :
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
      }

<section class="home-newsletter">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="single">
                    <h2 class="text-center">Subskrybuj nasz newsletter!</h2>
                    <p class="text-center">Zapisz się do naszego newslettera, aby nie przegapić nowości, promocji i rabatów w naszym sklepie.</p>
                    <div class="input-group">
                        <input type="email" class="form-control" placeholder="Twój adres email"></input>
                        <span class="input-group-btn">
                            <button class="btn btn-theme" type="submit">Zapisz się</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<div class="row g-5 mb-5">
					<div class="col-lg-4">
						<div class="mb-4 footer-logo-wrap"><a href="#" class="footer-logo">MyShop<span>.</span></a></div>
						<p class="mb-4">DLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

							<li><a href="#"><span class="fa fa-brands fa-facebook-f"></span></a></li>
							<li><a href="#"><span class="fa fa-brands fa-twitter"></span></a></li>
							<li><a href="#"><span class="fa fa-brands fa-instagram"></span></a></li>
							<li><a href="#"><span class="fa fa-brands fa-linkedin"></span></a></li>
					</div>

					<div class="col-lg-8">
						<div class="row">
							<div class="col-6 col-sm-6 col-md-3">
									<li><a href="#">O nas</a></li>
									<li><a href="#">Usługi</a></li>
									<li><a href="#">Kontakt</a></li>
							</div>

							<div class="col-6 col-sm-6 col-md-3">
								<ul class="list-unstyled">
									<li><a href="#">Pomoc</a></li>
									<li><a href="#">Live Czat</a></li>
								</ul>
							</div>
						</div>
					</div>

				</div>

    </div>

  )
}

export default HomeScreen