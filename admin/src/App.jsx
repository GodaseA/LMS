import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddBook from './pages/AddBook/AddBook'
import BookList from './pages/BookList/BookList'
import Sidebar from './Components/Sidebar/Sidebar'
import Students from './pages/Students/Students'
import Requests from './pages/Requests/Requests'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateBook from './pages/UpdateBook/UpdateBook'
import Profile from './pages/Students/Profile'




const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<AddBook />} />

          <Route path='/updateBook/:id' element={<UpdateBook />} />
          <Route path='/addBook' element={<AddBook />} />
          <Route path='/bookList' element={<BookList />} />
          <Route path='/students' element={<Students />} />
          <Route path='/request' element={<Requests />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"


      />
    </>
  )
}

export default App