import React, { useEffect, useState, Fragment } from "react"
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import EditProduct from "./forms/EditProduct"

const Product = ({user, token}) => {
    let {id} = useParams();
    const [product, setProduct] = useState({})
    const [editing, setEditing] = useState(false)
    useEffect( ()=>{
        fetch(`http://localhost:4000/products/${id}`)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[])
    
    const deleteProduct = (productId) => {
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.value) {
                fetch("http://localhost:4000/products/"+productId,{
                    method: "DELETE",
                    headers:{
                        "x-auth-token": token
                    }
                })
                .then(res=>res.json())
                .then(data=>{    
                    if(data.status === 200){
                        Swal.fire(
                            'Deleted!',
                            `${data.message}`,
                            'success'
                        )
                        window.location.href = "/"
                    }
                })
                
            }
        })
        
        
    }
    return(
        <div className="container">
            <h2>Product Details</h2>
            <div className="card">
                {editing ? 
                    <EditProduct product={product} setEditing={setEditing}/> :
                    <Fragment>
                    <img src={"http://localhost:4000"+product.image}/>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <h6>{product.price}</h6>
                    {user && token && user.isAdmin? 
                        <div className="card-footer">
                            <button className="btn btn-warning mr-2" onClick={()=>setEditing(true)}>Edit</button>
                            <button className="btn btn-danger" onClick={()=>deleteProduct(product._id)}>Delete</button>
                        </div> :
                        null
                    }
                    </Fragment>
                }
                
                
            </div>
        </div>
    )
}

export default Product