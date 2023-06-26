import React from "react";
import { Card } from "react-bootstrap";
import Rating from './Rating'
import { Link } from  'react-router-dom'

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded product-card">
      <Link to={`/product/${product._id}`}>
        <Card.Img className="product-image" src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title className="product-name">{product.name}</Card.Title>
        </Link>
        <Card.Text className="product-price">{product.price} PLN</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;