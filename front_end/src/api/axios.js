import axios from "axios";
const {REACT_APP_BEHOST} = process.env;

export default axios.create({
    baseURL: REACT_APP_BEHOST
});