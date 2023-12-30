import { useEffect, useState } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProductList from './Components/ProductList/ProductList'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import { fetchItemsByUserIdAsync } from './Store/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser,autoLoginAsync } from './Store/authSlice'
import { fetchLoggedInUserAsync } from './Store/userSlice'
function App() {


  return (
    <>
     <Home/>
   </>
  )

}

export default App
