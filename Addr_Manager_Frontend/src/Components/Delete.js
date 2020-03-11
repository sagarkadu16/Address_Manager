import React, { Component } from 'react'
import NavBar from './NavBar'
import axios from 'axios'

export default class Delete extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : 0,
            name : '',
            email : '',
            mobile : ''
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search),
              id = query.get('id'),
              name = query.get('name'),
              email = query.get('email'),
              mobile = query.get('mobile')

        this.setState({
            id : id,
            name : name,
            email : email,
            mobile : mobile
        })
    }

    handleSubmitUser = e => {
        e.preventDefault();
        axios.delete(`http://127.0.0.1:5000/users/${this.state.id}`)
            .then(res => this.props.history.push('/'))
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
                            <input type="text" value={this.state.name} disabled className="form-control" id="name" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={this.state.email} disabled className="form-control" id="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="mobile" value={this.state.mobile} disabled className="form-control" id="mobile" />
                        </div>
                        <div className="alert alert-danger p-3 mx-auto" role="alert">
                            <strong>Warning:</strong> All the addresses associated with user will get deleted
                        </div>  
                        <button type="submit" className="btn btn-danger">Delete</button><br/>
                    </form>
                </div>
          
            </div>
        )
    }
}
