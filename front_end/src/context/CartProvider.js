import { createContext, useState } from "react";
const CartContext = createContext({});

export const CartProvider = ({ children }) =>{
    const [cartInfo,setCartInfo]=useState({
        totalPay:0,
        discount:0,
        totalPay:0,
        tempPay:0,
        totalQuantity:0,
        totalWeight:0
    })

    const [weight,setWeight] = useState(0);

    const addItem = (id,quantity,isCheck,_weight) =>{
        //add items cart into local storage
        var cart = localStorage.getItem("cart");
        cart = cart ? JSON.parse(cart) : [];
        // Add new data to localStorage Array
        let flag = true;
        for(var i in cart){
            if(cart[i].itemID===id){
                cart[i].isChecked=isCheck;
                cart[i].quantity += quantity;
                flag = false;
                break;
            }
        }       
        if(flag){
            cart.push({itemID:id,quantity:quantity,isChecked:isCheck,weight:_weight});
        }
        // Save back to localStorage 
        localStorage.setItem("cart", JSON.stringify(cart));
        setCartInfo(prevState=>{return{...prevState,totalQuantity: prevState.totalQuantity+quantity}})
    }

    const removeItem = (id) =>{
        var cart = localStorage.getItem("cart");
        cart = cart ? JSON.parse(cart) : [];
        var i;
        for( i in cart){
            if(cart[i].itemID===id){
                setCartInfo(prevState=>{return{...prevState,totalQuantity: prevState.totalQuantity-cart[i].quantity}})
                cart.splice(i,1)
                break;
            }
        }       
        // Save back to localStorage 
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const upDateQuantity = (id,quantity) =>{
        //add items cart into local storage
        var cart = localStorage.getItem("cart");
        cart = cart ? JSON.parse(cart) : [];
        // Add new data to localStorage Array
        for(var i in cart){
            if(cart[i].itemID===id){
                setCartInfo(prevState=>{return{...prevState,totalQuantity: prevState.totalQuantity-cart[i].quantity+quantity}})
                cart[i].quantity = quantity;
                break;
            }
        }       
        // Save back to localStorage 
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const removeAllItems = ()=>{
        var cart = [];
        localStorage.setItem("cart",JSON.stringify(cart));
        setCartInfo(prevState=>{return{...prevState,totalQuantity: 0}})
        setCartInfo(prevState=>{return{...prevState,tempPay: 0}})
        
    }

    const getTempPay = ()=>{
        return cartInfo.tempPay;
    }

    const getTotalPay = ()=>{
        return cartInfo.totalPay;
    }

    const getTotalQuantity = () =>{
        return cartInfo.totalQuantity;
    }
    
    const getDiscount = () =>{
        return cartInfo.discount;
    }

    const setTempPay =(amount)=>{
        setCartInfo(prevState=>{return{...prevState,tempPay: amount}})
    }

    const updateItemCheck =(id)=>{
        var cart = localStorage.getItem("cart");
        cart = cart ? JSON.parse(cart) : [];
        for(var i in cart){
            if(cart[i].itemID===id){
                var isChecked = cart[i].isChecked;
                cart[i].isChecked = !isChecked;
                break;
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const calWeight = (weight) =>{
        setCartInfo((prevState)=>{return{...prevState,totalWeight:prevState.totalWeight+parseInt(weight)}});
    }


    const calTempPay = (amount) =>{
        setCartInfo((prevState) => {
            return { ...prevState, tempPay: prevState.tempPay + parseInt(amount) };
          });
    }

    const value = {addItem,removeItem, removeAllItems,upDateQuantity, 
        calTempPay,setTempPay,getTempPay,getTotalPay,
        getDiscount,getTotalQuantity,updateItemCheck,cartInfo,setCartInfo,calWeight,weight,setWeight}

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;