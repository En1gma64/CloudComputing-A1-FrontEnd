import React, { Component } from 'react';
import UserHeader from '../Layout/UserHeader';
import jwtDecode from 'jwt-decode';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

class OrderForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemName: this.props.location.state.itemName,
            orderUsername: this.props.location.state.username,
            pricePD: this.props.location.state.pricePD,
            price: '',
            numDays: ''
        }
    }

    consoleLog() {
        console.log(this.props.location.state);
    }


    onSubmit=()=>{
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const email = user.username;
        const order={itemName: this.state.itemName, 
            username: email,
            price: this.state.pricePD * this.state.numDays, 
            numDays: this.state.numDays,
            status: "Pending"}
        console.log(order)
        fetch(`http://cloudcomputinga1ordermicroservice-env.eba-dkisjigt.us-east-1.elasticbeanstalk.com/api/orders/addOrder`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(order)

        }).then(()=>{
            console.log("New Item Added")
            window.location.href = '/orderList'
        })
    };

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render() {
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const email = user.username;

        return (
            <>
            <UserHeader username={email}/>
            <h5 className="display-4 text-center">{this.props.location.state.itemName}</h5>
            <div className="Item">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <hr />
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                                <input type="text" className="form-control form-control-lg " 
                                placeholder={this.state.itemName} 
                                name="itemName"
                                value= {this.state.itemName}
                                disabled
                                required
                                />
                    </div>
                    <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder={this.state.orderUsername}
                                name="username"
                                value= {this.state.orderUsername = email}
                                disabled
                                required
                                    />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Number of Days You Wish to Rent"
                                name="numDays"
                                value= {this.state.numDays}
                                onChange = {this.onChange}
                                required
                            />
                            </div><br></br>
                            <PayPalScriptProvider options={{ "client-id": "test" }}>
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: this.state.pricePD * this.state.numDays,
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        const name = details.payer.name.given_name;
                                        this.onSubmit();
                                    });
                                }}
                            />
                            </PayPalScriptProvider>
                    </form>
                    </div>
                </div>
            </div>
        </div>
            </>
        )
    }
}

export default OrderForm;