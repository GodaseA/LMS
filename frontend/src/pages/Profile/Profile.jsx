import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [requests, setRequests] = useState([]);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profile = await axios.post("http://localhost:5000/auth/profile",
        {},
        { withCredentials: true }
      );
      console.log("Profile data:", profile.data);
      setProfileData(profile.data);

    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  const fetchRequests = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/profile/requests",
        {},
        { withCredentials: true }
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);


  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/auth/logout", { withCredentials: true });
      // Optionally, you can redirect the user to the login page or home page after logout
      window.location.href = "/login"; // Adjust the path as needed
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <>

      <div className="profile-container">
        <div className="profile-rigth">
          <h1>My Profile</h1>
          <button onClick={handleLogout} >logout</button>
        </div>
        <div className="profile">
          
          <h2>Welcome to your profile page</h2>
          <p>Name: {profileData ? profileData.name : "Loading..."}</p>
          <p>Email: {profileData ? profileData.email : "Loading..."}</p>

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
