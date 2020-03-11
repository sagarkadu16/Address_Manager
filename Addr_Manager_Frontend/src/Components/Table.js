import React, { Component } from 'react'
import axios from 'axios'

export default class Table extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:[]
        }
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:5000/users')
            .then(res => res.data.arr)
            .then(res => {
                this.setState({
                    data:res
                })
            })
            .catch(err => console.log(err))
    }

    handleDelete = user =>{
        this.props.history.push(`/users/${user.id}/Delete?id=${user.id}&name=${user.name}&email=${user.email}&mobile=${user.mobile}`)
    }

    handleAddress = (id) =>{
        this.props.history.push(`/users/${id}/address?id=${id}`)
    }

    handleShow = id =>{
        this.props.history.push(`/users/${id}/show?id=${id}`)
    }

    render(){
        return (
            <div className='container'>
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Email</th>
                    <th scope="col">Show</th>
                    <th scope="col">Add Address</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.data.map(user =>
                            
                                <tr key={user.id}>
                                    <th>{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className='btn btn-sm btn-outline-info' onClick={() => this.handleShow(user.id)}>Show</button>
                                    </td>
                                    <td>
                                        <button className='btn btn-sm btn-outline-success' onClick={() => this.handleAddress(user.id)}>Address</button>
                                    </td>
                                    <td>
                                        <button className='btn btn-sm btn-outline-danger' onClick={() => this.handleDelete(user)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        
                    }
                </tbody>
                </table>
            </div>
        )
    }
}
