import React, { useState } from 'react'
import {Container, Col, Card, CardTitle, CardText, Button, CardImg, CardBody} from "reactstrap"
import {Link} from 'react-router-dom'

const Catalog = ({products, user, token}) => {
    const [quantity, setQuantity] = useState(0)
    const addToCartHandler = (e, product) => {
        let cartItems = JSON.parse(localStorage.getItem('cartItems'))
        let matched = cartItems.find(item => {
            return item._id === product._id
        })

        if(matched) {
            matched.quantity += parseInt(e.target.previousElementSibling.value)
        }else {
            cartItems.push({
                ...product,
                quantity: parseInt(e.target.previousElementSibling.value)
            })
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        
    }
    const showProducts = products.map(product => (        
        <Col sm="4" key={product._id}>
            <Card >
                <Link to={`/products/${product._id}`}><CardTitle>{product.name}</CardTitle></Link>
                <CardBody>                    
                    <CardImg src={"http://localhost:4000"+product.image}></CardImg>
                    <CardText>{product.description}</CardText>
                    <h6>{product.price}</h6>
                </CardBody>
                {user && token && user.isAdmin === false ?
                    <div className="card-footer">
                        <input type="number" min="1" name="quantity" onChange={(e)=> setQuantity(e.target.value)}/>
                        <Button onClick={(e)=>{
                            addToCartHandler(e, product)
                            e.target.previousElementSibling.value = ""
                        }}>
                            Add to Cart
                            </Button>
                    </div>:
                    null
                }
                

            </Card>
        </Col>
        
    ))
    return(
        <Container>
            <h2>All Products</h2>
            <div className="row">
                {showProducts}
            </div>    
        </Container>
        
    )
}

export default Catalog