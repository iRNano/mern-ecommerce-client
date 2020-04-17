import React, { useState, useEffect, Fragment } from "react"
import {useParams} from "react-router-dom"

const UserTransaction = () => {
    let {userId} = useParams()
    const [transactions, setTransactions] = useState([])
    const [statuses,setStatuses] = useState([])
    useEffect( () => {
        fetch("http://localhost:4000/transactions/"+userId, {
            headers: {
                "x-auth-token" : localStorage.getItem('token')
            }
        })
        .then(res=>res.json())
        .then(data => setTransactions(data))
        //statuses
        fetch("http://localhost:4000/statuses")
        .then(res=>res.json())
        .then(data => setStatuses(data))
    })

    return(
        <div className="container">
            <h2>My Transactions</h2>
            {
                transactions.length?
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Transaction Id</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => {
                            return(
                                <Fragment>
                                    <tr key={transaction._id}>
                                        <td>{transaction._id}</td>
                                        <td>
                                            {
                                                statuses.map(status=>{                                            
                                                    if(transaction.statusId === status._id) {
                                                        return status.name
                                                    }
                                                })
                                            }
                                        </td>
                                        <td>{transaction.total}</td>
                                        <td>{new Date(transaction.dateCreated).toLocaleString()}</td>
                                    </tr>
                                </Fragment>
                            )
                        })}
                    </tbody>
                </table>
                : null
            }
    
        </div>
    )
}

export default UserTransaction