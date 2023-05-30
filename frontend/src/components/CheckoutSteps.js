import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="justify-content-center mb-5">
      <Nav.Item className="step-item">
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Logowanie</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Logowanie</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="step-item">
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Dostawa</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Dostawa</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="step-item">
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Płatność</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Płatność</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="step-item">
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Podsumowanie</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Podsumowanie</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;
