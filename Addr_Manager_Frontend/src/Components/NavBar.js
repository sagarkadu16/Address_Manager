import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar() {
    return (
        <div className='container mb-2'>
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm bg-secondary">
            <Link className="navbar-brand text-white" to='/'>Address Manager</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <Link className="nav-item nav-link active text-white" to="/add">
                    <button className='btn btn-sm btn-danger mt-1 shadow'>Add User</button>    
                 </Link>
                </div>
            </div>
            </nav>
        </div>
    )
}
