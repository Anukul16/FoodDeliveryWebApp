import React from "react";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
// import Cart from "./Screens/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from "./Screens/Signup";
import MyOrder from "./Screens/MyOrder"
import { CartProvider } from "./Components/ContextReducer";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myOrders" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
