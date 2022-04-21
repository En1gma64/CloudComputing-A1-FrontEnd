import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import UserHeader from './UserHeader';
import AdminHeader from './AdminHeader';
import Header from './Header';

class About extends Component {
    render() {
        if(!localStorage.getItem("jwtToken")) {
            return (
                <>
                <Header/>
                <div className="landing">
                    <div className="light-overlay landing-inner text-dark">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">
                            E-Commerce
                            </h1>
                            <p className="lead">
                            About us!
                            </p>
                            {/*  */}
                            <p>We rent clothes</p>
                            <p>That look amazing</p>
                            <p>So that don't need to keep buying expensive ones</p>      
                            {/*  */}
                            <hr />
                            
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </>
            );
        }
    
        //Logic to get the current user from the jwt token
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;

        //Checks the role of the user and gives him the necessary actions to do 
        const actions = () => {
            if(localStorage.urole == "Customer") {
                return <></>;
            }
            if(localStorage.urole == "Admin") {
                return <></>;
            }
        }

        //Renders header based on role
        const headerRender = () => {
            if (localStorage.urole == "Customer") {
                return <UserHeader username={username}/>
            }

            if (localStorage.urole == "Admin") {
                return <AdminHeader username={username}/>
            }
        }
        return (
            <>
            {headerRender()}
            <div className="landing">
                <div className="light-overlay landing-inner text-dark">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="display-3 mb-4">
                        E-Commerce
                        </h1>
                        <p className="lead">
                        About us!
                        </p>
                        {/*  */}
                        <p>We rent clothes</p>
                        <p>That look amazing</p>
                        <p>So that don't need to keep buying expensive ones</p>      
                        {/*  */}
                        <hr />
                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </>
        );
    }
}

export default About;