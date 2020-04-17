import React, { useState, Fragment } from 'react'
import {Navbar, Collapse, NavbarToggler, Nav, NavItem} from "reactstrap"
import {Link} from "react-router-dom"

const TopNav = ({user, token, logout}) => {
    const [collapsed, setCollapsed] = useState(true)
    let guestLinks, authLinks;
    
    if(!user && !token){
        guestLinks=(
            <Fragment>
                <NavItem>
                        <Link to="/login" className="nav-link">Login</Link>                    
                </NavItem>
                <NavItem>
                        <Link to="/register" className="nav-link">Register</Link>                    
                </NavItem>
            </Fragment>
        )
    }else{
        authLinks=(
            <Fragment>
                {user && user.isAdmin === false ? 
                    <Fragment>
                        <NavItem>
                            <Link to="/cart" className="nav-link">Cart</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={"/transactions/"+user._id} className="nav-link">Transactions</Link>
                        </NavItem>
                    </Fragment>
                    : null                    
                }
                
                {user.isAdmin? 
                    <Fragment>
                        <NavItem>
                            <Link to="/add-product" className="nav-link">Add Product</Link>
                        </NavItem> 
                        <NavItem>
                            <Link to="/transactions" className="nav-link">Transactions</Link>
                        </NavItem>
                    </Fragment> :
                    null
                }
                
                <NavItem>
                    <Link to="/" className="nav-link" onClick={logout}>Logout</Link>
                </NavItem>
            </Fragment>
        )
    }
        
    
    return(
        <Navbar color="dark" dark expand="md">
            <Link to="/" className="navbar-brand">
                B49 Store
            </Link>
            <NavbarToggler onClick={()=>setCollapsed(!collapsed)} className="mr-2"/>
            <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                    <NavItem>
                        <Link to="/" className="nav-link">Catalog</Link>
                    </NavItem>
                    {authLinks}
                    {guestLinks}                    
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default TopNav;