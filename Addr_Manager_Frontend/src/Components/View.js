import React from 'react'
import NavBar from './NavBar'
import Table from './Table'

export default function View(props) {
    return (
        <div>
            <NavBar />
            <Table {...props} />
        </div>
    )
}
