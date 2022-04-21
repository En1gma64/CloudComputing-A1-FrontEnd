import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import AdminHeader from '../Layout/AdminHeader';
import { Container, Row, Card, Table, Image, ButtonGroup, Button } from "react-bootstrap";
import axios from 'axios';

class DeleteItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items : []
        };
    }

    componentDidMount() {
        this.getItems();
    };

    getItems() {
        axios.get(`http://cloudcomputinga1itemmicroservice-env.eba-btrpvvm3.us-east-1.elasticbeanstalk.com/api/items/findItems`)
            .then(response => response.data)
            .then((data) => {
                this.setState({items:data})
            });
    };

    delete = (itemId) => {
        axios.delete(`http://cloudcomputinga1itemmicroservice-env.eba-btrpvvm3.us-east-1.elasticbeanstalk.com/api/items/deleteByID/`+itemId)
            .then(response => {
                if (response.data != null) {
                    alert("Item Removed")
                    window.location.reload(false);
                }
            })
    };

    render() {
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        return (
            <>
            <AdminHeader username={username}/>
            <Container>
            <Card className={"border border-dark bg-light text-black"}>
                <h5 className="display-4 text-center">Catalogue</h5>             
                <Card.Body>
                    <Table bordered hover striped variant='light'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Item Name</th>
                                <th>Item Description</th>
                                <th>Category</th>
                                <th>Colour</th>
                                <th>Sex</th>
                                <th>Size</th>
                                <th>Price Per Day</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.items.length === 0 ?
                                <tr align="center">
                                    <td colSpan="7">No items in catalogue</td>
                                </tr> :
                                this.state.items.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <Image src={item.imageLink} square width="100" height="100"/>
                                        </td>
                                        <td>{item.itemName}</td>
                                        <td>{item.desc}</td>
                                        <td>{item.category}</td>
                                        <td>{item.colour}</td>
                                        <td>{item.sex}</td>
                                        <td>{item.size}</td>
                                        <td>{item.pricePD}</td>
                                        <td>
                                            <Button variant='danger' onClick={this.delete.bind(this, item.id)}>Delete</Button>
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

export default DeleteItem;