import React from "react";
// import Start from './Start'
// import Login from '../pages/Login';
import Navbar from '../components/Navbar';
import Goals from "../components/Goals";
import Auth from "../utils/auth";


function Dashboard() {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if(!token) {
        window.location.href = "/"
    }

    return (
        <section>
            <Navbar />
            <Goals />
        </section>
    );
}

export default Dashboard;