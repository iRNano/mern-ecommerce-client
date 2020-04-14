import React, { useState } from "react"
import Swal from "sweetalert2"

const Register = () => {
    const [formData, setFormData] = useState({
        fullname:"",
        username:"",
        password:"",
        password2:""
    })
    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        // console.log(formData)
        e.preventDefault()
        fetch("http://localhost:4000/users", {
            method: "POST",
            body: JSON.stringify(formData),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 200){
                Swal.fire({
                    icon: 'success',
                    text: data.message
                })
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
    return(
        <form className="col-sm-6 mx-auto" onSubmit={onSubmitHandler}>
            <h2 className="justify-content-center mx-auto">Register</h2>
            <div className="form-group">
                <label htmlFor="fullname">Full name</label>
                <input className="form-control" type="text" id="fullname" name="fullname" onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input className="form-control" type="text" id="username" name="username" onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control" type="password" id="password" name="password" onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input className="form-control" type="password" id="password2e" name="password2" onChange={onChangeHandler}/>
            </div>
            <button className="btn btn-success">Register</button>
        </form>
    )
}

export default Register;