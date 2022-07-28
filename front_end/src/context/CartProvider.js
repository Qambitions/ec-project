import { createContext, useState } from "react";
const CartContext = createContext({});



export const CartProvider = ({ children }) =>{
    const [selectAllChecked,setSelectAllChecked] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [tempPay, setTempPay] = useState(0);
    const [totalPay, setTotalPay]=useState(0);
    const [discount, setDiscount]=useState(0);

    const addToLocalStore = (id,quantity) =>{
        //add items cart into local storage
        var cart = localStorage.getItem("cart");
        cart = cart ? JSON.parse(cart) : [];
        // Add new data to localStorage Array
        console.log(cart);
        let flag = true;
        for(var i in cart){
            if(cart[i].itemID===id){
                cart[i].quantity += quantity;
                flag = false;
                break;
            }
        }       
        if(flag){
            cart.push({itemID:id,quantity:quantity});
        }
       console.log(cart);
        // Save back to localStorage 
        localStorage.setItem("cart", JSON.stringify(cart));

    }

    const addItem = (id,quantity) =>{
        //set global state for store cart
        setTotalQuantity(totalQuantity+1);
        // setItmes(items.push({itemID:id,quantity:quantity}));
        addToLocalStore(id,quantity);
    }

    const removeItem = (id) =>{
        var cart = localStorage.getItem("cart");
        cart = cart ? JSON.parse(cart) : [];
        console.log(cart);
        var i;
        for( i in cart){
            if(cart[i].itemID===id){
                cart.splice(i,1)
                break;
            }
        }       
       console.log(cart);
        // Save back to localStorage 
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const upDateQuantity = (id,oldQuantiy,newQuantity) =>{
    }

    const removeAllItems = ()=>{
        var cart = [];
        localStorage.setItem("cart",JSON.stringify(cart));
    }

    const getTempPay = ()=>{
        return tempPay;
    }

    const calTempPay = (amount) =>{
        setTempPay(tempPay+amount);
    }

    return (
        <CartContext.Provider value={{addItem,removeItem, removeAllItems,upDateQuantity, calTempPay,getTempPay,setSelectAllChecked}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;