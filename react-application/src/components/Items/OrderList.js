import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import UserHeader from '../Layout/UserHeader';
import { Container, Row, Card, Table, Image, ButtonGroup, Button } from "react-bootstrap";
import axios from 'axios';

class OrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders : []
        };
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders() {
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.username;
        axios.get(`http://cloudcomputinga1ordermicroservice-env.eba-dkisjigt.us-east-1.elasticbeanstalk.com/api/orders/findOrderByUsername/`+username)
            .then(response => response.data)
            .then((data) => {
                this.setState({orders:data})
            });
    }

    delete = (orderId) => {
        axios.delete(`http://cloudcomputinga1ordermicroservice-env.eba-dkisjigt.us-east-1.elasticbeanstalk.com/api/orders/deleteById/`+orderId)
            .then(response => {
                if (response.data != null) {
                    alert("Order Removed")
                    window.location.reload(false);
                }
            })
    };
    

    render() {
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const email = user.username;
        return (
            <>
            <UserHeader username={username}/>
            <Container>
            <Card className={"border border-dark bg-light text-black"}>
            <h5 className="display-4 text-center">Orders</h5>             
                <Card.Body>
                    <Table bordered hover striped variant='light'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Item Name</th>
                                <th>Username</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.length === 0 ?
                                <tr align="center">
                                    <td colSpan="5">No orders</td>
                                </tr> :
                                this.state.orders.map((order) => (
                                    <tr key={order.id}>
                                        <td></td>
                                        <td>{order.itemName}</td>
                                        <td>{order.username}</td>
                                        <td>{order.price}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <Button variant='danger' onClick={this.delete.bind(this, order.id)}>Cancel</Button>
                                        </td>
                                    </tr>
                                ))
                            } 
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            </Container>
            </>
        );
    }
}

export default OrderList;