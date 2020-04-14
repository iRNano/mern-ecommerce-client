import React, {useState, useEffect} from 'react';
import Catalog from './components/Catalog';
import TopNav from './components/layouts/Navbar';
import Auth from './components/Auth'
import Product from './components/Product'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AddProduct from './components/forms/AddProduct'
import Register from './components/forms/Register';
import Login from './components/forms/Login';
import jwt_decode from 'jwt-decode'



const App = () => {
  const [products,setProducts] = useState([])
  const [user, setUser] = useState({})
  const [token, setToken] = useState("")
  const logout= () => {
    localStorage.clear()
    setUser({})
    setToken("")
    window.location.href = "/"
  }
  useEffect(()=>{
    fetch("http://localhost:4000/products")
    .then(res=>res.json())
    .then(data=>{
      setProducts(data)
    })
    if(token){
      let decoded = jwt_decode(token)
      let now = new Date()
      if(decoded.exp === now.getTime()){
        localStorage.clear()
      }
    }
    setUser(JSON.parse(localStorage.getItem("user")))
    setToken(localStorage.getItem("token"))
  }, [])
  
  return(    
      <Router>
        <TopNav user={user} token={token} logout={logout}/>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/add-product">
            {user && token && user.isAdmin ? 
              <AddProduct /> : <Auth />
            } 
          </Route>
          <Route path="/products/:id">
            <Product user={user} token={token}/>
          </Route>
          <Route exact path="/">
            <Catalog products={products}/>
          </Route>
        </Switch>
      </Router>

  )
}

export default App;
