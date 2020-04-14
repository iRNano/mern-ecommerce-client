import React, { useState } from "react"
import Swal from 'sweetalert2'

const Login = () => {
    const [formData,setFormData] = useState({
        username:"",
        password:"",
    })
    
    const onSubmitHandler = (e) => {
        e.preventDefault()
        let reqOptions = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch("http://localhost:4000/users/login", reqOptions)
        .then(res =>res.json())
        .then(data => {
            if(data.auth){
                Swal.fire({
                    icon: 'success',
                    text: data.message,
                    timer: 1500,
                    showConfirmButton: false
                })
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('token', data.token)
                let cartItems = []
                localStorage.setItem('cartItems', JSON.stringify(cartItems))
                window.location.href = "/"
            }else{
                Swal.fire({
                    icon: 'error',
                    text: data.message,
                    timer: 1500,
                    showConfirmButton: false
                })
            }
        })
    }

    const onChangeHandler = (e) => {
        setFormData({
            ...formData, 
            [e.target.name] : e.target.value
        })
    }
    
    return(
        <form className="mx-auto col-sm-6" onSubmit={onSubmitHandler}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" onChange={onChangeHandler}/>
            </div>
            <button className="btn btn-primary">Login</button>    
        </form>
    )
}

export default Login