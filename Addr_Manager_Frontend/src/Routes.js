import React from 'react'
import { Switch,Route } from 'react-router-dom'
import View from './Components/View'
import Notfound from './Components/Notfound'
import Add from './Components/Add'
import Address from './Components/Address'
import Delete from './Components/Delete'
import Show from './Components/Show'
import EditUser from './Components/EditUser'
import EditAddress from './Components/EditAddress'



export default function Routes() {
    return (
        <div>
            <Switch>
                <Route exact path='/' render ={(props)=><View {...props} />} />
                <Route path='/add' render = {(props) => <Add {...props} />} />
                <Route path='/users/:user_id/editUser' render = {(props) => <EditUser {...props} />} />
                <Route path='/users/:user_id/address/:address_id/editAddress' render = {(props) => <EditAddress {...props} />} />
                <Route path='/users/:user_id/show' render = {(props) => <Show {...props}/>} />
                <Route path='/users/:user_id/address' render={(props) => <Address {...props} />} />
                <Route path='/users/:user_id/delete' render = {(props) => <Delete {...props}/>}/>
                <Route path='*' render={() =><Notfound />}></Route>
            </Switch>   
        </div>
    )
}
