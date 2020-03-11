import React, { Component } from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import style from './show.module.css'

export default class Show extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : '',
            userData : [],
            addressData : []
        }
    }

    handleProfileEdit = () =>{
        let id = this.state.userData.id,
            name = this.state.userData.name,
            email = this.state.userData.email,
            mobile = this.state.userData.mobile

        this.props.history.push(`/users/${id}/editUser?id=${id}&name=${name}&email=${email}&mobile=${mobile}`)
    }

    handleAddressEdit = current_address =>{
        let addr_id = current_address.add_id,
            line_1 = current_address.add_1,
            line_2 = current_address.add_2,
            city = current_address.city,
            pincode = current_address.pincode

        this.props.history.push(`/users/${this.state.id}/address/${addr_id}/editAddress?id=${addr_id}&user_id=${this.state.id}&line_1=${line_1}&line_2=${line_2}&city=${city}&pincode=${pincode}`)
    }

    handleProfileDelete = () =>{
        let id = this.state.userData.id,
            name = this.state.userData.name,
            email = this.state.userData.email,
            mobile = this.state.userData.mobile
        this.props.history.push(`/users/${id}/delete?id=${id}&name=${name}&email=${email}&mobile=${mobile}`)
    }

    handleAddressDelete = (addr) =>{
        console.log('inside address delete')
        axios.delete(`http://127.0.0.1:5000/users/${this.state.id}/${addr.add_id}`)
            .then(res => this.setState({
                addressData : res.data.arr
            }))
            .catch(err => console.log(err))
    }

    handleAddAddress = () =>{
        this.props.history.push(`/users/${this.state.id}/address?id=${this.state.id}`)
    }


    findUser = (id) =>{
        return axios.get(`http://127.0.0.1:5000/users/${id}`)
    }

    findAddress = (id) =>{
        return axios.get(`http://127.0.0.1:5000/users/${id}/address`)
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search),
              id = query.get('id')
        
        axios.all([this.findUser(id),this.findAddress(id)])
            .then(axios.spread((userRes,addressRes) => {
                this.setState({
                    id : id,
                    userData : userRes.data.arr[0],
                    addressData: addressRes.data.arr
                })
            }))
    }

    render(){
        // console.log(this.state.userData,this.state.addressData)
        return (    
            <div className='container'>
                <NavBar />
                <div className={`bg-light mt-3 ${style.boxeffect} w-75 p-2 rounded border shadow-sm mx-auto`}>
                    <button className={style.button} onClick={() => this.handleProfileEdit()}>Edit Profile</button>
                    <button className={style.add} onClick={()=>this.handleAddAddress()}>Add Address</button>
                    <button className={style.delete} onClick={()=>this.handleProfileDelete()}>Delete</button>
                    <h5>User Profile</h5>
                    <p>User Id: {this.state.userData.id}</p>
                    <p>Name: {this.state.userData.name}</p>
                    <p>Mobile: {this.state.userData.mobile}</p>
                    <p>Email: {this.state.userData.email}</p>
                </div>
                <div className='w-75 mt-2 py-3 mx-auto'>
                    <h5 className='px-2'>Address</h5>
                    <small className='px-2'>Addresses registered with above user</small>
                    {this.state.addressData.map(addr =>
                        <div key={addr.add_id} className={`bg-light p-2 ${style.boxeffect} border border-success rounded shadow-sm my-2`}>
                            <button className={style.button} onClick={()=>this.handleAddressEdit(addr)}>Edit Address</button>
                            <button className={style.delete} onClick={()=>this.handleAddressDelete(addr)}>Delete</button>
                            <p className='my-1'><strong>Address Id: </strong>{addr.add_id}</p>    
                            <p className='my-1'><strong>Line 1:</strong> {addr.add_1}</p>
                            <p className='my-1'><strong>Line 2: </strong>{addr.add_2}</p>
                            <p className='my-1'><strong>City:</strong> {addr.city}</p>
                            <p className='my-1'><strong>Pincode:</strong> {addr.pincode}</p>
                        </div>
                    )}
                </div> 

            </div>
        )
    }
}
