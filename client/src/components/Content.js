import React, { useState } from "react";
import Start from './Start'
import Login from '../pages/Login';


function Container() {
    const [currentPage, setCurrentPage] = useState("START");

    const renderPage = () => {
        if (currentPage === "START") {
            return <Start />;
        }
        if (currentPage === "LOGIN") {
            return <Login />;
        }
        //   if (currentPage === "TODO") {
        //     return <Todo />;
        //   }

        return;
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section>
            <Start currentPage={currentPage} handlePageChange={handlePageChange} /> 
            {renderPage()}
        </section>
    );
}

export default Container;