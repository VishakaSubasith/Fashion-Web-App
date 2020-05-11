import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import './Styles/OrderCompleteDet.css';

const queryString = require('query-string');

class OrderCompleteDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            UserDetails:[],
            OrderID: '',
            Name: '',
            Address:'',
            Number:'',
            TrackNum:'',
            success: false

        }
    }
    componentDidMount() {
        this.getUser()
    }

    async getUser () {
        var values = queryString.parse(this.props.location.search)
        console.log(this.props.location.search)

        const response = axios({
            method: 'get',
            url: 'http://localhost:5000/cart/findUserOrder/' + values.username,
        }).then(response => {
            this.setState({
                UserDetails :  response.data.map(product=>product),
            })
        });
        console.log(this.state.UserDetails)
}

myFun = () =>{
    this.setState({
        success: true
    })
}

render() {
        if( this.state.success){
            return <Redirect to={"/ViewProduct"} ></Redirect>
        }

    return (
<div>

    {this.state.UserDetails.map( val => (
                            <div className="container" style={{width: "40%", height:"50%", textAlign: "center"}}>
                                <h1 style={{color: "#5e35b1"}} > ORDER DETAILS </h1>
                                <div className="table-bordered" style={{background: "#edd5ff"}}>
                                    <div className="col-md" style={{textAlign: "left" }} >
                                        <label htmlFor="exampleDisabled" className="disabled" style={{color: "#140403", fontsize:"100px"}}>FULL NAME:</label>
                                        <input type="text" id="exampleDisabled" className="form-control" placeholder={val.fullname} disabled />
                                        <br />

                                        <label htmlFor="exampleDisabled" className="disabled">ADDRESS:</label>
                                        <input type="text" id="exampleDisabled" className="form-control" placeholder={val.address} disabled />
                                        <br />

                                        <label htmlFor="exampleDisabled" className="disabled">TOTAL COST:</label>
                                        <input type="text" id="exampleDisabled" className="form-control" placeholder={val.TotalCost} disabled />
                                        <br />

                                        <label htmlFor="exampleDisabled" className="disabled">ORDER ID:</label>
                                        <input type="text" id="exampleDisabled" className="form-control" placeholder={val.OrderId} disabled />
                                        <br />

                                        <label htmlFor="exampleDisabled" className="disabled">TRACKING ID:</label>
                                        <input type="text" id="exampleDisabled" className="form-control" placeholder={val.TrackingNum} disabled />
                                        <br />
                                        <button style={{width: "100%"}} type="button" className="btn btn-secondary" onClick={() => this.myFun()}>Back To Home</button>
                                    </div>
                                </div>
                            </div>
                        ))}
</div>

    );
}
};

export default OrderCompleteDetails;