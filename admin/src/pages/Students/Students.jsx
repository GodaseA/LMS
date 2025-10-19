import React, { useState, useEffect } from 'react'
import "./Students.css"
import { NavLink } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';


const Students = () => {

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")


  const fetchStudens = async () => {
    fetch("http://localhost:5000/auth/students")
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Error:", err));

  }




  useEffect(() => {
    fetchStudens();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deleted = await axios.delete(`http://localhost:5000/auth/student/profile/delete/${id}`);
      // fetchBooks();
      fetchStudens()
      console.log("book deleted ", deleted)
      toast.success("student deleted succesfully")
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  return (
    <div className='all-students-list'>

      <div className="student-info-title">
        <h1> Student's Details </h1>
        <p>List of students display here</p>
      </div>

      <div className="student-search-bar">
        <input
          className='search-bar'
          type="text"
          placeholder="Search Student's Name or Email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="student-info-container"><ul>
        {students.filter((student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((student, index) => (
          <li key={index}>
            <div className="student-info">
              <strong>{student.name}</strong> <em>{student.email} </em>
            </div>
            <div className="student-action">
              <NavLink to={`/profile/${student._id}`}>view profile</NavLink>
              <button onClick={() => handleDelete(student._id)} >Delete</button>
            </div>

          </li>
        ))}
      </ul></div>
    </div>
  )
}

export default Students