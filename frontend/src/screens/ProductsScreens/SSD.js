import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { Card } from "react-bootstrap";


function SSD() {
  const [brandNames, setBrandNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const [filteredBrand, setFilteredBrand] = useState("Wszystkie");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceFilter, setPriceFilter] = useState([0, 1000]); // [min, max]


  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    const filteredByBrand = filteredBrand === "Wszystkie"
      ? products.filter(product => product.subSubCategory === 1)
      : products.filter(product => product.brand === filteredBrand && product.subSubCategory === 1);

    const filteredByPrice = filteredByBrand.filter(product => product.price >= priceFilter[0] && product.price <= priceFilter[1]);

    setFilteredProducts(filteredByPrice);
  }, [filteredBrand, products, priceFilter]);

  const handleBrandClick = (brand) => {
    setFilteredBrand(brand);
  };

  const handlePriceChange = (e, index) => {
    const newPrices = [...priceFilter];
    newPrices[index] = Number(e.target.value);
    setPriceFilter(newPrices);
  };


  useEffect(() => {
    const fetchBrandNames = async () => {
      try {
        setLoading(true);

        // Make an API request to retrieve the products
        const response = await axios.get("/api/products");

        // extract the products from the API response
        const { data } = response;
        const filteredProducts = data.filter(
          (product) => product.subSubCategory === 1
        );

        // extract the brand names from the filtered products
        const brandNames = Array.from(
          new Set(filteredProducts.map((product) => product.brand))
        );

        setBrandNames(["Wszystkie", ...brandNames]);

        setLoading(false);
      } catch (error) {
        setError("Error retrieving brand names.");
        setLoading(false);
      }
    };

    fetchBrandNames();
  }, []);




  return (
    <Row>
      <Col>
        <Card className="p-3 rounded product-card-filter">
          <div className="filter-menu">
            <h2>Producent</h2>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <ul className="brandlist">
                {brandNames.map((brandName) => (
                  <li
                    key={brandName}
                    onClick={() => handleBrandClick(brandName)}
                    className={filteredBrand === brandName ? "selected" : ""}
                  >
                    {brandName}
                  </li>
                ))}
              </ul>
            )}
            <h2>Cena</h2>
            <div>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceFilter[0]}
                onChange={e => handlePriceChange(e, 0)}
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceFilter[1]}
                onChange={e => handlePriceChange(e, 1)}
              />
              <div>
                Cena: {priceFilter[0]} - {priceFilter[1]}
              </div>
            </div>
          </div>
        </Card>
      </Col>

      <Col md={8}>
        <div className="product-list">
          <Card className="category-name">
            <h1> Dyski SDD </h1>
          </Card>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : filteredProducts.length === 0 ? (
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

export default SSD;
