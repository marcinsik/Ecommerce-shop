import React from 'react'
import Rating from '../components/Rating'
import products from '../products'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

function ProductScreen() {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  
  return (
    <div>
      {product.name}
    </div>
  );
}

export default ProductScreen