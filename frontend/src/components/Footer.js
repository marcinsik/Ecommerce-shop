import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
function Footer() {
  return (
    <div>
        <footer class = 'bg-dark'>
            <Container>
                <Row>
                    <Col className='text-center py-4'>Copyright &copy; Marcin Sikorski</Col>
                </Row>
            </Container>

        </footer>
    </div>
  )
}

export default Footer