import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { NavLink, useParams } from 'react-router-dom';
import { toast } from "react-toastify";


const Profile = () => {

    const { id } = useParams();
    const [requests, setRequests] = useState([]);
    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const profile = await axios.get(`http://localhost:5000/auth/student/profile/${id}`);
            console.log("Profile data:", profile.data);
            setProfileData(profile.data);

        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/auth/student/requests/${id}`);
            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handelApprove = async (requestId) => {
        try {
            const res = await axios.patch(`http://localhost:5000/borrowRequests/requests/approved/${requestId}`);
            console.log(res.data);
            fetchRequests();// Refresh the list after updating
            toast.success("status updated to aproved")
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
            toast.success("status updated to rejected")
        } catch (error) {
            console.error("Error updating request status:", error);
        }
    }
    const handelReturn = async (requestId) => {
        try {
            const res = await axios.patch(`http://localhost:5000/borrowRequests/requests/return/${requestId}`);
            console.log(res.data);
            fetchRequests(); // Refresh the list after updating
            toast.success("status updated to return")
        } catch (error) {
            console.error("Error updating request status:", error);
        }
    }
    const deleteRequest = async (requestId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/borrowRequests/delete/${requestId}`);
            console.log(res.data);

            fetchRequests(); // Refresh the list after deletion
            toast.success("request delete from database")
        } catch (error) {
            console.error("Error deleting request:", error);
        }
    }

    return (
        <>

            <div className="profile-container">
                <div className="profile-rigth">
                    <h1>Student's Profile</h1>
                    <NavLink to={"/students"}><button >back</button></NavLink>

                </div>
                <div className="profile">

                    <h2>{`Welcome to ${profileData.name}'s profile page`}</h2>
                    <p>Name: {profileData.name}</p>
                    <p>Email: {profileData.email}</p>

                    <button onClick={fetchRequests}>Refresh Requests</button>
                </div>
            </div>


            <div className="requests">
                <h1>My Borrow Requests</h1>
                <ul className="requests-list">
                    {requests.length === 0 ? (
                        <p>No borrow requests yet.</p>
                    ) : (
                        requests.map((request) => (
                            <li key={request._id}>
                                <div className="request-info">
                                   <div className="request-info-a">
                                     <strong>
                                        Book Title: {request.book?.title || "Book info not available"}
                                    </strong>
                                    <em>Author: {request.book?.author || "Unknown"}</em>
                                    <p>Category: {request.book?.category || "Unknown"}</p>
                                   </div>
                                    <div className="request-info-b">
                                        <div className="request-status">Status: {request.status}</div>
                                    <p>
                                        Requested At:{" "}
                                        {request.requestedAt
                                            ? new Date(request.requestedAt).toLocaleString()
                                            : "Unknown"}
                                    </p>
                                    </div>
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
                    )}
                </ul>
            </div>
        </>
    );
};

export default Profile;
