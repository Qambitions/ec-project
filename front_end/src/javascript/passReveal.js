import React, { useState } from 'react';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const handleToggle=()=>{
    const [inputType, setInputType]=useState('password');
    const [iconType, setIconType]=useState(faEye);
    if(inputType==='password'){
        setIconType(faEye);
        setInputType('text');
    }
    else{
        setIconType(faEyeSlash);
        setInputType('password');
    }
}

export default handleToggle;

const usePassRevealToggle =()=>{
    const [visible, setVisibility] = useState(false);
    const Icon = <FontAwesomeIcon icon={visible ? "faEyeSlash" : "faEye"} onClick={()=>setVisibility(visibility =>!visibility)}/>;
    const InputType = visible ? "text":"password";
    return [InputType,Icon];
}