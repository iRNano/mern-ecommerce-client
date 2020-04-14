import React from "react"
import {Link} from 'react-router-dom'

const Auth = () => {
    return(
        <h2>
            You have no access on this page please <Link to="/login">login</Link> or view all 
            <Link to="/">products</Link>
        </h2>
    )
}

export default Auth