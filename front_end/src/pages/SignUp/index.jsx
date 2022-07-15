import React from "react";
import SignUpForm from "../../components/SignUpForm";
import SignHeader from "../../components/SignHeader";
import Footer from "../../components/Footer";

export default function SignUpWindow(){
    return(
        <div className="signup-screen">
            <SignHeader/>
            <div className="body">
            <SignUpForm/>
            </div>
            <Footer/>
        </div>
    )
}