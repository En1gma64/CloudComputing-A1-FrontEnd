import React, { Component } from 'react'
import { Link} from 'react-router-dom';
 class UserHeader extends Component {
    //Usual Page && Navbar
    render() {
        return (
            <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
            <div className="container">
                <a className="navbar-brand" href="/dashboard">
                    E-Commerce
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                </button>
    
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/dashboard">
                                Dashboard
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/order">
                                Catalogue
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/orderList">
                                Orders
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/about">
                                About
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/terms-and-conditions">
                                Terms and Conditions
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/contact">
                                Contact
                            </a>
                        </li>
                    </ul>
    
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link " href="/dashboard">
                                Hi {this.props.username}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a  className="nav-link" onClick={() => {
                                localStorage.clear();
                                window.location.href = "/";
                            }}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
            </div>
        )
    }
}
export default UserHeader;