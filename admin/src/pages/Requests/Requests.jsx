import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { use } from 'react'
import { useEffect } from 'react'
import "./Requests.css"

const Requests = () => {

    const [requests, setRequests] = useState([])
    const [filter, setFilter] = useState("All")
    const [searchTerm, setSearchTerm] = useState("")



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

    const stutasOptions = ["All", "pending", "approved", "rejected", "returned"];

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

            <div className="request-search-bar">
                <input
                    className='search-bar'
                    type="text"
                    placeholder="Search by student's name/email or bookname..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>


            <div className='request-info-container'>
                {filteredRequests.filter((request) =>
                    request.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    request.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    request.student.email.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((request, index) => (
                    <li key={index}>
                        <div className='request-info'>
                            <div className="request-statuse" data-status={request.status}>
                                Status: {request.status}
                            </div>

                            <div className="request-info-book">
                                {request.book && (
                                    <p>
                                        <strong>Book:</strong> <strong> {request.book.title}</strong>   by - <em>{request.book.author}</em>
                                    </p>
                                )}
                            </div>

                            <div className="request-info-stuudent">
                                {request.student && (
                                    <p>
                                        <strong> Student:</strong>  <strong>{request.student.name}  </strong>, email : <em>{request.student.email}</em>
                                    </p>
                                )}
                            </div>
                            <div className="request-info-time">
                                <p>
                                    <strong>Requested At:{" "}</strong>
                                    {request.requestedAt}
                                </p>
                            </div>
                        </div>

                        <div className="request-handel-action">
                            {request.status === "pending" && (
                                <button onClick={() => handelApprove(request._id)} className='approve'>Approve</button>
                            )}
                            {request.status === "pending" && (
                                <button onClick={() => handelReject(request._id)} className='reject'>Reject</button>
                            )}
                            {request.status === "approved" && (
                                <button onClick={() => handelReturn(request._id)} className='return'>
                                    Return
                                </button>
                            )}
                            {request.status === "returned" && (
                                <button onClick={() => deleteRequest(request._id)} className='delete'>delete request</button>
                            )}
                            {request.status === "rejected" && (
                                <button onClick={() => deleteRequest(request._id)} className='delete'>delete request</button>
                            )}
                        </div>
                    </li>
                ))}
            </div>
        </>
    )
}

export default Requests