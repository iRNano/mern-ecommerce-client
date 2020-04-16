import React from "react"
import StripeCheckout from "react-stripe-checkout"
import { PUBLISHABLE_KEY} from "../../config/index"

const Stripe = ({amount, email}) => {
    const checkout = (token) => {
        let body = {
            token,
            amount
        }
        console.log(body)
        fetch("http://localhost:4000/transactions/stripe", {
            method: "POST",
            body: JSON.stringify({token, amount}),
            headers: {
                "x-auth-token" : localStorage.getItem('token')
            }
        })
        .then(res=> res.json())
        .then(data => {

        })
    }
    return (
        <StripeCheckout 
            stripeKey={PUBLISHABLE_KEY}
            email={email}
            label="Card Payment"
            name="B49 Ecommerce"
            description="Tag line"
            panelLabel="submit"
            amount={amount*100}
            billingAddress={false}
            currency="PHP"
            allowRememberMe={false}
            token={checkout}
        />
    )
}

export default Stripe