import React, { Component } from 'react'
import NavBar from './NavBar'
import axios from 'axios'

export default class Add extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : 0,
            name : '',
            email : '',
            mobile : '',
            helpText:'',
            userSaved:false
        }
    }

    handleChange = e =>{
        this.setState({
            [e.target.id] : e.target.value,
            userSaved : false
        })
    }

    handleSubmitUser = e => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/users/',{
            name:this.state.name,
            mobile:this.state.mobile,
            email:this.state.email
        })
            .then(res => this.setState({
                helpText:res.data.message,
                id:res.data.id,
                userSaved:true
            }))
    }

    handleAddress = () =>{
        this.props.history.push(`/users/${this.state.id}/address?id=${this.state.id}`)
    }

    render() {
        return (
            <div>
                <NavBar />
               
                <div className='container'>
                    <form className='w-50 mx-auto' onSubmit={(e) => this.handleSubmitUser(e)}>
                        <h4>User Information</h4>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" value={this.state.name} onChange={this.handleChange} className="form-control" id="name" aria-describedby="emailHelp" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="email" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="text" value={this.state.mobile} pattern='\d*' maxLength='10' onChange={this.handleChange} title='Mobile Details in numbers' className="form-control" id="mobile" required/>
                        </div>
                        {this.state.helpText && <p className='text-success'>{this.state.helpText}</p>}
                        <button type="submit" className="btn btn-success">Submit</button><br/>
                    </form>
                    <div className=' w-50 mx-auto mt-3'>
                        <div className="alert alert-secondary p-2 mx-auto" role="alert">
                            Submit User Details before adding address
                        </div>
                        <button className='btn btn-outline-success btn-sm mx-auto' disabled={this.state.userSaved ? false:true} onClick={()=>this.handleAddress()}>Add Address</button>
                    </div>

                </div>
          
            </div>
        )
    }
}
