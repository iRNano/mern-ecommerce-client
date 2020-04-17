import React, {useState, useEffect, Fragment} from 'react'

const Transactions = () => {
    let statusname
    const [transactions, setTransactions] = useState([])
    const [statuses, setStatuses] = useState([])
    useEffect(()=> {
        fetch("http://localhost:4000/transactions")
        .then(res => res.json())
        .then(data => {
            setTransactions(data)
        })
        fetch("http://localhost:4000/statuses")
        .then(res=>(res.json()))
        .then(data => setStatuses(data))
    }, [])

    const updateStatus = (statusId, transactionId) => {
        let body = {
            statusId
        }

        fetch("http://localhost:4000/transactions/"+transactionId, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "x-auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            }
        })
        .then(res=>res.json())
        .then(data=> {
            alert(data.message)
        })
    }

    return(
        <div>
            <h2>Transactions</h2>
            {transactions.length ? 
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Transaction ID</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Action/s</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => {
                            return(
                                <tr key={transaction._id}>
                                    <td>{transaction._id}</td>                                    
                                    <td>{statuses.map(status => {
                                        if(status._id === transaction.statusId){                                            
                                            return status.name
                                        }
                                    })}
                                    </td>
                                    <td>{transaction.total}</td>
                                    <td>
                                        <select>
                                            <option disabled selected>Select Action</option>
                                            {/* {status.map} */}
                                        </select>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                :<h2>No transactions to show</h2>
            }
        </div>
    )
}

export default Transactions