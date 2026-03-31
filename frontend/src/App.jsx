import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/ui/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Verify from './pages/Verify'
import VerifyEmail from './VerifyEmail'

import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/userSlice' 
import Profile from './pages/Profile'
import Products from './pages/Products'
import Cart from './pages/Cart'

const router = createBrowserRouter([
  {
    path : "/",
    element :<><Navbar/><Home/></>
  },
  {
    path : "/login",
    element : <><Login/></>
  },
  {
    path :"/signup",
    element : <><Signup/></>
  },
  {
    path : "/verify",
    element : <><Verify/></>
  },
  {
    path : "/verify/:token",
    element : <><VerifyEmail/></>
  },
  {
    path : "/profile/:userId",
    element : <><Navbar/><Profile/></>
  },
   {
    path : "/products",
    element : <><Navbar/><Products/></>
  },
  {
    path : "/cart",
    element : <><Navbar/><Cart/></>
  }
]);

function App() {
  const dispatch = useDispatch(); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser && storedUser !== "undefined") {
      try {
        dispatch(setUser(JSON.parse(storedUser)));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App