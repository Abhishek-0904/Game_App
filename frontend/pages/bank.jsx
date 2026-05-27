import React from 'react'
import './bank.css'

function Bank() {
    return (
        <div className="page-wrapper">
            <div className='container'>
                <h2>Bank Details Form</h2>

                <form>
                    <div className="form-group">
                        <label>Account Holder Name</label>
                        <input type="text" placeholder="Enter holder name" />
                    </div>

                    <div className="form-group">
                        <label>Bank Name</label>
                        <input type="text" placeholder="Enter bank name" />
                    </div>

                    <div className="form-group">
                        <label>Account Number</label>
                        <input type="number" placeholder="Enter account number" />
                    </div>

                    <div className="form-group">
                        <label>IFSC Code</label>
                        <input type="text" placeholder="Enter IFSC code" />
                    </div>

                    <button type="submit">Save Details</button>
                </form>
            </div>

            <div className="table-container">
                <table className="details-table">
                    <thead>
                        <tr>
                            <th>Account Holder</th>
                            <th>Bank Name</th>
                            <th>Account Number</th>
                            <th>IFSC Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{ }</td>
                            <td>{ }</td>
                            <td>{ }</td>
                            <td>{ }</td>
                            <td>
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Bank;