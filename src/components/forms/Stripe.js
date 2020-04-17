import React from "react"
import StripeCheckout from "react-stripe-checkout"
import { PUBLISHABLE_KEY} from "../../config/index"
import { Router } from "react-router-dom"

const Stripe = ({amount, cartItems, setCartItems}) => {
    const checkout = (token) => {
        let body = {
            token,
            amount,
            cartItems
        }
        console.log(body)
        fetch("http://localhost:4000/transactions/stripe", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token" : localStorage.getItem('token')
            }
        })
        .then(res=> res.json())
        .then(data => {
            localStorage.setItem('cartItems', JSON.stringify([]))
            setCartItems(localStorage.getItem('cartItems'))
        })
    }
    return (
        <StripeCheckout 
            stripeKey={PUBLISHABLE_KEY}
            label="Card Payment"
            name="B49 Ecommerce"
            description="Tag line"
            panelLabel="submit"
            amount={amount}
            billingAddress={false}
            currency="PHP"
            allowRememberMe={false}
            token={checkout}
        />
    )
}


export default Stripe