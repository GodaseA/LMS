import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { use } from 'react'
import { useEffect } from 'react'
import "./Requests.css"

const Requests = () => {

    const [requests, setRequests] = useState([])
    const [filter, setFilter] = useState("All")


    const fetchRequests = async () => {
        const res = await axios.get("http://localhost:5000/borrowRequests/getall");
        setRequests(res.data);
    };

    useEffect(() => {
        fetchRequests();
    }, []);



    const filteredRequests = filter === "All"
        ? requests
        : requests.filter(request => request.status === filter);

    const stutasOptions = ["All", "pending", "approved", "rejected","returned"];

    const handleFilterChange = (status) => {
        setFilter(status);
    };


    const handelApprove = async (requestId) => {
        try {
            const res = await axios.patch(`http://localhost:5000/borrowRequests/requests/approved/${requestId}`);
            console.log(res.data);
            fetchRequests(); // Refresh the list after updating
        } catch (error) {
            console.error("Error updating request status:", error);
        }
    }
    const handelReject = async (requestId) => {
        try {
            const res = await axios.patch(`http://localhost:5000/borrowRequests/requests/rejected/${requestId}`, {
                status: 'rejected'
            });
            console.log(res.data);
            fetchRequests(); // Refresh the list after updating
        } catch (error) {
            console.error("Error updating request status:", error);
        }
    }
    const handelReturn = async (requestId) => {
        try {
            const res = await axios.patch(`http://localhost:5000/borrowRequests/requests/return/${requestId}`);
            console.log(res.data);
            fetchRequests(); // Refresh the list after updating
        } catch (error) {
            console.error("Error updating request status:", error);
        }
    }
    const deleteRequest = async (requestId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/borrowRequests/delete/${requestId}`);
            console.log(res.data);

            fetchRequests(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting request:", error);
        }
    }


    return (
        <>
            <div className='filter'>
                <h2>Filter by Status:</h2>
                <div className='filter-options'>
                    {stutasOptions.map((status, index) => (
                        <button
                            key={index}
                            className={filter === status ? 'active' : ''}
                            onClick={() => handleFilterChange(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>



            <div className='requests'>

                <h1>All Borrow Requests</h1>
                <ul className='students-list'>
                    {filteredRequests.map((request, index) => (
                        <li key={index}>
                            <div className='request-card'>
                                <h3>Status: {request.status}</h3>
                                {request.book && (
                                    <p>
                                        <strong>Book:</strong> <strong> {request.book.title}</strong>   by - <em>{request.book.author}</em>
                                    </p>
                                )}
                                {request.student && (
                                    <p>
                                        <strong> Student:</strong>  <strong>{request.student.name}  </strong>, email : <em>{request.student.email}</em>
                                    </p>
                                )}
                                <p>
                                    <strong>Requested At:{" "}</strong>
                                    {request.requestedAt}
                                </p>
                            </div>
                            <div className="request-handel">

                                <ul className='action'>
                                    <button onClick={() => handelApprove(request._id)} className='approve'>Approve</button>
                                    <button onClick={() => handelReject(request._id)} className='reject'>Reject</button>
                                    {request.status === "approved" && (
                                        <button onClick={() => handelReturn(request._id)} className='reject'>
                                            Return
                                        </button>
                                    )}

                                </ul>
                                <ul className='close'>
                                    {request.status === "returned" && (
                                        <button onClick={() => deleteRequest(request._id)}>X</button>
                                    )}
                                    {request.status === "rejected" && (
                                        <button onClick={() => deleteRequest(request._id)}>X</button>
                                    )}
                                </ul>
                            </div>
                        </li>
                    ))

                    }
                </ul>
            </div >
        </>
    )
}

export default Requests