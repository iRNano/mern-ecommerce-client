import React from 'react'
import {Container, Col, Card, CardTitle, CardText, Button, CardImg, CardBody} from "reactstrap"
import {Link} from 'react-router-dom'

const Catalog = ({products}) => {
    
    const showProducts = products.map(product => (
        
        <Col sm="4" key={product._id}>
            <Card>
                <Link to={`/products/${product._id}`}><CardTitle>{product.name}</CardTitle></Link>
                <CardBody>                    
                    <CardImg src={"http://localhost:4000"+product.image}></CardImg>
                    <CardText>{product.description}</CardText>
                    <h6>{product.price}</h6>
                </CardBody>
                <Button>Add to Cart</Button>

            </Card>
        </Col>
        
    ))
    return(
        <Container>
            <h2>All Products</h2>    
            {showProducts}
        </Container>
        
    )
}

export default Catalog