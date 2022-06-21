const [inputType, setInputType]=useState('password');
const [iconType, setIconType]=useState(faEye);
const handleToggle=()=>{
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