import React, { useState, useEffect } from 'react'
import "./Students.css"
import { NavLink } from 'react-router-dom';


const Students = () => {

   const [students, setStudents] = useState([]);


    useEffect(() => {
      fetch("http://localhost:5000/auth/students")
        .then(res => res.json())
        .then(data => setStudents(data))
        .catch(err => console.error("Error:", err));
    }, []);

     const handleDelete = async (id) => {
    try {
      const deleted = await axios.delete(`http://localhost:5000/auth/student//delete/${id}`);
      fetchBooks();
      console.log("book deleted ", deleted)
    } catch (error) {
      console.error("Delete error:", error);
    }
  }





  return (
    <div className='students'>
      <h1> Student's Details </h1>
      <p>List of students display here</p>
      <ul className='students-list'>
        {students.map((student, index) => (
          <li key={index}>
            <h2>{student.name}</h2> <h3>{student.email}</h3>
            <NavLink to={`/profile/${student._id}`}>view profile</NavLink>
            <button onClick={() => handleDelete(student.id)} >Delete</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Students