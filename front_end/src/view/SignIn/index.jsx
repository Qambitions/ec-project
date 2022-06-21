import React from "react";
import './style.css';
import SignInForm from "../../components/SignInForm";
import SignHeader from "../../components/SignHeader";
import Footer from "../../components/Footer";



export default function SignInWindow(){
    return(
        <div className="signin-screen">
            <SignHeader/>
            <div className="body">
            <SignInForm/>
            </div>
            <Footer/>
        </div>
    )
}