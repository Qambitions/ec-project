import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";


export default function Homepage(){
    return(
        <div className="home-page">
            <Header/>
            <NavBar/>
            <Footer/>
        </div>
    )
}