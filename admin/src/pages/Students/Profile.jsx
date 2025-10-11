import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { NavLink, useParams } from 'react-router-dom';


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
            const response = await axios.delete(`http://localhost:5000/auth/student/requests/${id}`);
            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <>

            <div className="profile-container">
                <div className="profile-rigth">
                    <h1>Student's Profile</h1>
                    <NavLink to={"/students"}><button >back</button></NavLink>
                    
                </div>
                <div className="profile">

                    <h2>Welcome to your profile page</h2>
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
                                <h3>
                                    Book Title: {request.book?.title || "Book info not available"}
                                </h3>
                                <p>Author: {request.book?.author || "Unknown"}</p>
                                <p>Category: {request.book?.category || "Unknown"}</p>
                                <p>Status: {request.status}</p>
                                <p>
                                    Requested At:{" "}
                                    {request.requestedAt
                                        ? new Date(request.requestedAt).toLocaleString()
                                        : "Unknown"}
                                </p>
                                <p>Requested By: {request.student?.name || "Unknown student"}</p>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
};

export default Profile;
