import React, { useState, useEffect } from "react"
import Swal from "sweetalert2"
import Stripe from "./forms/Stripe"

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    // const [editing, setEditing] = useState(false)
    // const [cartItem, setCartItem] = useState({})
    let total;
    useEffect( () => {
        setCartItems(JSON.parse(localStorage.getItem('cartItems')))
    }, [])

    if(cartItems.length){
        let subTotals = cartItems.map(item => parseInt(item.price)* parseInt(item.quantity))

        total = subTotals.reduce((accumulator, subPerItem) => {
            return accumulator + subPerItem
        })
    }
    const emptyCart = () => {
        let cartItems = []
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        window.location.href = "/cart"
    }

    const deleteCartItem = (itemId) => {
        let updatedCartItems = cartItems.filter(item => {
            return item._id !== itemId
        })
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
        window.location.href = "/cart"
    }

    // const onChangeHandler = (e) => {    
    //     setCartItem({...cartItem, quantity: e.target.value})
        
    //     let updatedCartItems = cartItems.find(item => {
    //         if(item._id === cartItem._id){
    //             item.quantity = cartItem.quantity
    //             localStorage.setItem('cartItems', JSON.stringify(cartItems))
                
    //         }
    //     })
    // }

    const checkout = () => {
        let orders = JSON.parse(localStorage.getItem('cartItems'))
        fetch("http://localhost:4000/transactions", {
            method: "POST",
            body: JSON.stringify({orders, total}),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem('token')
            }
        })
        .then(res=>res.json())
        .then(data=>{
            Swal.fire({
                'icon': 'success',
                'title': data.message
            })
            localStorage.setItem('cartItems', JSON.stringify([]))
            setCartItems(JSON.parse(localStorage.getItem('cartItems')))
        })
    }
    const quantityHandler = (quantity, productId) => {
        // alert("Quantity: "+ quantity +" - "+ productId)
        let itemToUpdate = cartItems.find(item => item._id === productId)
        itemToUpdate.quantity = parseInt(quantity)
        console.log(itemToUpdate.quantity)
        let updatedCart = cartItems.map(item=>{
            return item._id === productId ? {...itemToUpdate} : item
        })
        localStorage.setItem('cartItems', JSON.stringify(updatedCart))
        setCartItems(JSON.parse(localStorage.getItem('cartItems')))

    }

    // console.log(cartItem)
    // const editHandler = (itemId) => {
    //     // setEditing(!editing)
    //     // let cartItems = JSON.parse(localStorage.getItem('cartItems'))
    //     // cartItems.find(item => {
    //     //     if(item._id === itemId){
    //     //         setCartItem(item)
    //     //     }
    //     // })
    // }

    return(
        <div className="col-md-10 mx-auto">
            <h2>Cart</h2>
            {
                cartItems.length ? 
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item=> (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>     
                                    <input type="number" onChange={(e)=> quantityHandler(e.target.value, item._id)} value={item.quantity}/> 
                                </td>
                                <td>{item.quantity * item.price}</td>
                                <td>
                                    {/* <button className="btn btn-warning mr-2" >Edit</button> */}
                                    <button className="btn btn-danger" onClick={()=> deleteCartItem(item._id)}>Delete</button>
                                </td>
                                
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3">Total</td>
                            <td colSpan="2">{total}</td>
                            
                        </tr>
                        <tr>
                            <td colSpan="5" className="text-center">
                                <button className="btn btn-danger mr-3" onClick={()=> emptyCart()}>Empty Cart</button>
                                <button className="btn btn-success mr-3" onClick={checkout}>Checkout COD</button>
                                <Stripe amount={total} email={"irsupernano@gmail.com"}/>
                            </td>
                        </tr>
                    </tbody>

                </table>
                :
                <h3> Cart is empty</h3>
            }
            

        </div>
    )
}

export default Cart;