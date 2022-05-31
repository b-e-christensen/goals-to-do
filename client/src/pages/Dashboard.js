import React, { useState } from "react";
// import Start from './Start'
// import Login from '../pages/Login';
import Navbar from '../components/Navbar';
import TODO from "../components/TODO";
import Goals from "../components/Goals";
import Auth from "../utils/auth";


function Dashboard() {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if(!token) {
        window.location.href = "/"
    }

    const [currentPage, setCurrentPage] = useState("TODO");

    const renderPage = () => {
        if (currentPage === "TODO") {
            return <TODO />;
        }
        if (currentPage === "GOALS") {
            return <Goals />;
        }

        return;
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (

        <section>
            <Navbar currentPage={currentPage} handlePageChange={handlePageChange} /> 
            {renderPage()}
        </section>

    );
}

export default Dashboard;