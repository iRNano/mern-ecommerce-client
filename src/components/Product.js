import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

const Product = ({user, token}) => {
    let {id} = useParams();
    console.log(id)
    const [product, setProduct] = useState({})
    useEffect( ()=>{
        fetch(`http://localhost:4000/products/${id}`)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[])
    
    return(
        <div className="container">
            <h2>Product Details</h2>
            <img src={"http://localhost:4000"+product.image}/>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h6>{product.price}</h6>
        </div>
    )
}

export default Product