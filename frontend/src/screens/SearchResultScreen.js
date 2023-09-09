import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { Card } from "react-bootstrap";
import Message from '../components/Message';

function SearchResultScreen() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('query');
  const [products, setProducts] = useState([]);
  
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); 
  const [priceFilter, setPriceFilter] = useState([0, 1000]); // [min, max]

  useEffect(() => {
    fetch(`/api/products?query=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Błąd pobierania danych produktów:', error));
  }, [searchTerm]);

  const handlePriceChange = (e, type) => {
    if (type === "min") {
        setMinPrice(e.target.value);
        setPriceFilter([e.target.value, priceFilter[1]]);
    } else if (type === "max") {
        setMaxPrice(e.target.value);
        setPriceFilter([priceFilter[0], e.target.value]);
    }
  };

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => product.price >= priceFilter[0] && product.price <= priceFilter[1]);

  return (
    <Row>
    {/* Left column: Filter Menu */}
    <Col md={4}>
      <Card className="p-3 rounded product-card-filter">
        <div className="filter-menu">
          
          {/* Search Term Header */}
          <h2>Wyniki wyszukiwania dla: {searchTerm}</h2>
          
          {/* Price Range Filter */}
          <h2>Cena</h2>
          <div>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceFilter[0]}
              onChange={e => handlePriceChange(e, "min")}
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={priceFilter[1]}
              onChange={e => handlePriceChange(e, "max")}
            />
            <div>
              Cena: {priceFilter[0]} - {priceFilter[1]}
            </div>
          </div>
        </div>
      </Card>
    </Col>

    {/* Right column: Product Listing */}
    <Col md={8}>
      <div className="product-list">
          
        {/* Product List */}
        {filteredProducts.length === 0 ? (
          <Message variant="info">Nie znaleziono produktów.</Message>
        ) : (
          <Row>
            {filteredProducts.map((product) => (
              <Col className="products-lists-page" key={product._id} sm={4} md={4} lg={6} xl={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Col>
  </Row>
);
}

export default SearchResultScreen;
