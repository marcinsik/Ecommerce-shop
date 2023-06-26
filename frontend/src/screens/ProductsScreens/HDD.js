import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";

function HDD() {
  const [brandNames, setBrandNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const [filteredBrand, setFilteredBrand] = useState("Wszystkie");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    if (filteredBrand === "Wszystkie") {
      setFilteredProducts(products.filter((product) => product.subSubCategory === 2));
    } else {
      setFilteredProducts(products.filter((product) => product.brand === filteredBrand && product.subSubCategory === 2));
    }
  }, [filteredBrand, products]);

  const handleBrandClick = (brand) => {
    setFilteredBrand(brand);
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
          (product) => product.subSubCategory === 2
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

        <div className="filter-menu">
          <h2>Producent</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <ul>
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
          <h2>Price Range</h2>
          <ul>
            <li>TODO</li>
            <li>TODO</li>
            <li>TODO</li>
            {/* Add more price range options as needed */}
          </ul>
        </div>
      </Col>
      <Col md={8}>
        <div className="product-list">
          <h1 style={{ marginTop: "0px" }}>Dyski HDD</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : filteredProducts.length === 0 ? (
            <Message variant="info">Nie znaleziono produktów.</Message>
          ) : (
            <Row>
              {filteredProducts.map((product) => (
                <Col className="products-lists-page" key={product._id} sm={12} md={4} lg={2} xl={6}>
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

export default HDD;
