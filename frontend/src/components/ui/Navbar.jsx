// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingCart, Store, Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useSelector, useDispatch } from "react-redux";
// import { setUser } from "@/redux/userSlice";

// function Navbar() {
//   const { user } = useSelector((store) => store.user);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const isLoggedIn = !!user;
//   const userName = user?.firstName || "User";
//   const cartCount = 0;

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     dispatch(setUser(null));
//     navigate("/login");
//   };

//   return (
//     <nav className="w-full bg-gradient-to-r from-pink-700 to-pink-800 text-white shadow-xl px-6 py-4">
//       <div className="flex justify-between items-center">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center gap-2 text-2xl font-bold text-white"
//         >
//           <Store className="w-6 h-6" />
//           EKART
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           <Link to="/" className="hover:text-pink-200 transition">
//             Home
//           </Link>

//           <Link to="/products" className="hover:text-pink-200 transition">
//             Products
//           </Link>
//         {isLoggedIn && (
//   <Link
//     to={`/profile/${user._id}`}
//     className="flex items-center gap-2 font-medium text-pink-100 hover:text-white cursor-pointer transition"
//   >
//               {/* 👇 User ki choti si profile photo */}
//               <img
//                 src={user?.profilePic || "/Niraj.jpeg"}
//                 alt="Profile"
//                 className="w-8 h-8 rounded-full object-cover border border-pink-300"
//               />
//               Hello, {userName}
//             </Link>
//           )}

//           {/* Cart */}
//           <Link to="/cart" className="relative">
//             <ShoppingCart className="w-6 h-6 hover:text-pink-200 transition" />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-white text-pink-700 text-xs px-2 py-0.5 rounded-full font-semibold">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           {!isLoggedIn ? (
//             <>
//               <Link to="/login" className="hover:text-pink-200 transition">
//                 Login
//               </Link>
//               <Link to="/signup">
//                 <Button className="bg-white text-pink-700 hover:bg-pink-100 font-semibold">
//                   Sign Up
//                 </Button>
//               </Link>
//             </>
//           ) : (
//             <Button
//               onClick={handleLogout}
//               className="bg-white text-pink-700 hover:bg-pink-200 font-semibold"
//             >
//               Logout
//             </Button>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-white"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? <X /> : <Menu />}
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       {menuOpen && (
//         <div className="md:hidden mt-4 flex flex-col gap-4 text-white">
//           <Link to="/" onClick={() => setMenuOpen(false)}>
//             Home
//           </Link>

//           <Link to="/products" onClick={() => setMenuOpen(false)}>
//             Products
//           </Link>

//           {isLoggedIn && <span>Hello, {userName}</span>}

//           <Link to="/cart" onClick={() => setMenuOpen(false)}>
//             Cart ({cartCount})
//           </Link>

//           {!isLoggedIn ? (
//             <>
//               <Link to="/login" onClick={() => setMenuOpen(false)}>
//                 Login
//               </Link>
//               <Link to="/signup" onClick={() => setMenuOpen(false)}>
//                 Sign Up
//               </Link>
//             </>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="bg-white text-pink-700 px-4 py-2 rounded-md font-semibold w-fit"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Store, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

function Navbar() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const admin = user?.role === "admin" ? true : false;
  const isLoggedIn = !!user;
  const userName = user?.firstName || "User";

  //   console.log("USER DATA:", user);
  // console.log("ROLE:", user?.role);

  const cartState = useSelector((store) => store.cart);
  const cartItems = cartState?.cartItems || cartState || [];
  const cartCount = cartItems.length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setUser(null));
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-pink-700 to-pink-800 text-white shadow-xl px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-white"
        >
          <Store className="w-6 h-6" />
          EKART
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-pink-200 transition">
            Home
          </Link>

          <Link to="/products" className="hover:text-pink-200 transition">
            Products
          </Link>
          {admin && (
            <Link
              to="/dashboard/sales"
              className="hover:text-pink-200 transition font-semibold"
            >
              Dashboard
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to={`/profile/${user._id}`}
              className="flex items-center gap-2 font-medium text-pink-100 hover:text-white cursor-pointer transition"
            >
              <img
                src={user?.profilePic || "/Niraj.jpeg"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-pink-300"
              />
              Hello, {userName}
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 hover:text-pink-200 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-md border border-pink-800">
                {cartCount}
              </span>
            )}
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-pink-200 transition">
                Login
              </Link>
              <Link to="/signup">
                <Button className="bg-white text-pink-700 hover:bg-pink-100 font-semibold">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              className="bg-white text-pink-700 hover:bg-pink-200 font-semibold"
            >
              Logout
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-white">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          {admin && (
            <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}

          {isLoggedIn && <span>Hello, {userName}</span>}

          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart ({cartCount})
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-white text-pink-700 px-4 py-2 rounded-md font-semibold w-fit"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
