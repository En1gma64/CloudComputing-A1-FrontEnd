import React, { Component, useRef } from 'react'
import jwtDecode from 'jwt-decode';
import AdminHeader from '../Layout/AdminHeader';

export default function AddItem() {

    const[itemName, setItemName] = React.useState('');
    const[desc, setDesc] = React.useState('');
    const[category, setCategory] = React.useState('');
    const[pricePD, setPricePD] = React.useState('');
    const[colour, setColour] = React.useState('');
    const[size, setSize] = React.useState('');
    const[sex, setSex] = React.useState('');
    const[available] = React.useState('Yes');
    const[imageLink] = React.useState('https://images.unsplash.com/photo-1578932750294-f5075e85f44a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlcyUyMHNob3B8ZW58MHx8MHx8&w=1000&q=80');


    function refreshPage() {
        window.location.reload(false);
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        const item={itemName, desc, category, pricePD, colour, size, sex, available, imageLink}
        console.log(item)
        fetch(`http://cloudcomputinga1itemmicroservice-env.eba-btrpvvm3.us-east-1.elasticbeanstalk.com/api/items/addItem`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(item)

        }).then(()=>{
            refreshPage()
            alert("New Item Added")
            console.log("New Item Added")
        })
    };


    //To verify the existing username
    const jwt = localStorage.getItem("jwtToken");
    const user = jwtDecode(jwt);
    const username = user.fullName;
    return (
        <>
        <AdminHeader username={username}/>
        <div className="Item">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Add Item</h5>
                    <hr />
                    <form onSubmit={onSubmit}>
                    <div className="form-group">
                                <input type="text" className="form-control form-control-lg " 
                                placeholder="Item Name" 
                                name="itemName"
                                value= {itemName}
                                onChange = {(e)=>setItemName(e.target.value)}
                                required
                                />
                    </div>
                    <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Item Description"
                                name="desc"
                                value= {desc}
                                onChange = {(e)=>setDesc(e.target.value)}
                                required
                                    />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Category"
                                name="category"
                                value= {category}
                                onChange = {(e)=>setCategory(e.target.value)}
                                required
                                    /><br></br>
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Price Per Day ($)"
                                name="pricePD"
                                value= {pricePD}
                                onChange = {(e)=>setPricePD(e.target.value)}
                                required
                                    />
                            </div>
                            <div className="form-group">
                                <select className="form-control form-control-lg" value={size} onChange = {(e)=>setSize(e.target.value)} 
                                required placeholder='Select Size'>
                                    <option value={""}>Select Size</option>
                                    <option value="Extra Small">Extra Small</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Extra Medium">EXTRA MEDIUM</option>
                                    <option value="Large">Large</option>
                                    <option value="Extra Large">Extra Large</option>
                                </select>
                            </div><br></br>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Colour"
                                name="colour"
                                value= {colour}
                                onChange = {(e)=>setColour(e.target.value)}
                                required
                                    />
                            </div><br></br>
                            <div className="form-group">
                            <select className="form-control form-control-lg" value={sex} onChange = {(e)=>setSex(e.target.value)} 
                                required placeholder='Select Sex'>
                                    <option value={""}>Select Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Uni-Sex">Uni-Sex</option>
                                </select>
                            </div><br></br>
                    <input type="submit" className="btn btn-primary btn-block mt-4"/>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        </>
  );
}