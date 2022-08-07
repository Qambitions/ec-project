import axios from "axios";
const {REACT_APP_BEHOST} = process.env;

export default axios.create({
    baseURL: REACT_APP_BEHOST
});

const fetchProductDetail = async(id) =>{
    let res = await axios({
        method:'get',
        url:process.env.REACT_APP_GET_PRODUCT_DETAIL,
        params:{masp:id}
    }) 
    return res;
}

export {fetchProductDetail};