import React from "react";
// import Start from './Start'
// import Login from '../pages/Login';
import Navbar from '../components/Navbar';
import Projects from "../components/Projects";
import Auth from "../utils/auth";


function Dashboard() {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if(!token) {
        window.location.href = "/"
    }

    return (
        <section>
            <Navbar />
            <Projects />
        </section>
    );
}

export default Dashboard;