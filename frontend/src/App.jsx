import React, { useEffect } from 'react' // 👈 useEffect import add kiya
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/ui/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Verify from './pages/Verify'
import VerifyEmail from './VerifyEmail'
// import { CardFooter } from './components/ui/card' // Iski zaroorat nahi thi yahan
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/userSlice' 
import Profile from './pages/Profile'

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