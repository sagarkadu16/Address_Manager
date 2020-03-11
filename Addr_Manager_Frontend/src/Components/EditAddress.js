import React, { Component } from 'react'
import NavBar from './NavBar'
import axios from 'axios'

export default class Address extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId:0,
            id : '',
            line1 : '',
            line2 : '',
            city : '',
            pincode : '',
            helpText:''
        }
    }
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search)
        this.setState({
            id : query.get('id'),
            line1:query.get('line_1'),
            line2:query.get('line_2'),
            city:query.get('city'),
            pincode:query.get('pincode'),
            userId:query.get('user_id')
        })
    }

    handleChange = e =>{
        this.setState({
            [e.target.id] : e.target.value,
            helpText:''
        })
    }

    handleSubmitAddress = e => {
        e.preventDefault()
        console.log('userid',this.state.userId,'addr id',this.state.id)
        axios.put(`http://127.0.0.1:5000/users/${this.state.userId}/${this.state.id}`,{
            add_1: this.state.line1,
            add_2: this.state.line2,
            city : this.state.city,
            pincode : this.state.pincode
        })
            .then(res => this.setState({
                helpText : res.data.message
            }))
    }

    render(){
        return (
                <div className='container'>
                    <NavBar />
                    <form className='w-50 mx-auto mt-3' onSubmit={(e) => this.handleSubmitAddress(e)}>
                        <h4>Edit User Address</h4>
                        <div className="form-group w-25">
                            <label htmlFor="userId">User Id:</label>
                            <input type="text" value={this.state.userId} className="form-control" id="userId" disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="line1">Address Line 1:</label>
                            <input type="text" value={this.state.line1} onChange={this.handleChange} className="form-control" id="line1" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="line2">Address Line 2:</label>
                            <input type="text" value={this.state.line2} onChange={this.handleChange} className="form-control" id="line2" required/>
                        </div>
                        <div className='form-row'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="city">City:</label>
                                    <input type="text" value={this.state.city}  onChange={this.handleChange}  className="form-control" id="city" required/>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="pincode">Pincode:</label>
                                    <input type="text" value={this.state.pincode}  onChange={this.handleChange}  className="form-control" id="pincode" required/>
                                </div>
                            </div>
                        </div>
                       
                        {this.state.helpText && <div className="alert alert-success px-2 py-1 mx-auto" role="alert">
                            {this.state.helpText} <br/>
                        </div>}
                        <button type="submit" className="btn btn-success">Edit Address</button><br/>
                    </form>
                    {this.state.helpText && <div className='w-50 mx-auto mt-1'>
                            <button className='btn btn-sm btn-outline-success mt-2' onClick={() => this.props.history.push(`/users/${this.state.userId}/show?id=${this.state.userId}`)}>Show User</button>
                        </div>}
            </div>
        )
    }
}
