import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

function SearchResultScreen() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('query');
  const [products, setProducts] = useState([]); // Stan na produkty

  useEffect(() => {
    // Wywołaj funkcję do pobierania danych z API lub bazy danych
    // Przykład użycia fetch:
    fetch(`/api/products?query=${searchTerm}`) // Załóżmy, że masz odpowiednie ścieżki do API
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Błąd pobierania danych produktów:', error));
  }, [searchTerm]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Wyniki wyszukiwania dla: {searchTerm}</h1>
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={3} xl={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SearchResultScreen;
