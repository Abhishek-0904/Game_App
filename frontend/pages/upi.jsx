import React from 'react'
import './upi.css'

function Upi() {
    return (
        <div className="page-wrapper">
            <div className='container'>
                <h2>UPI Details Form</h2>

                <form>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" placeholder="Enter Phone Number" />
                    </div>

                    <div className="form-group">
                        <label>Paytm Number</label>
                        <input type="text" placeholder="Enter Paytm Number" />
                    </div>

                    <div className="form-group">
                        <label>Google Pay Number</label>
                        <input type="number" placeholder="Enter Google Pay Number" />
                    </div>

                    <div className="form-group">
                        <label>Upi ID</label>
                        <input type="text" placeholder="Enter Upi ID" />
                    </div>

                    <button type="submit">Save Details</button>
                </form>
            </div>

            <div className="table-container">
                <table className="details-table">
                    <thead>
                        <tr>
                            <th>Phone Number</th>
                            <th>Paytm Number</th>
                            <th>GPay Number</th>
                            <th>UPI ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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

export default Upi
