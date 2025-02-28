import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Product from "./pages/Product/Product"
import UserCarts from "./pages/UserCarts/UserCarts";

export const AppRoutes = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/carts" element={<UserCarts />} />
            </Routes>
        </Router>
    )
}


