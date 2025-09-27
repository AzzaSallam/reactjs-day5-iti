import React from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TiPlus } from "react-icons/ti";
import { FaMinus } from "react-icons/fa6";
import { MdRemoveShoppingCart } from "react-icons/md";
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../store/slices/cartSlice';


const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const cartItems = useSelector((state)=>state.cart.cartItems);
  const totalAmount = useSelector((state)=>state.cart.totalAmount);



  return (
    <div>
      <div className='container mx-auto my-5 '>
        <h3 className=' fw-bold'>Cart</h3>
        {cartItems.length === 0 ? 
          <div className='border m-auto text-center w-75 rounded-4 py-5'>
            <p className=' fw-semibold text-primary fs-4'> Your Cart Is Empty </p>
            <Button variant="outline-primary" className='px-5 py-2 rounded-5 ' onClick={()=>navigate('/')}>Go To Shoppind</Button>
          </div>
          : <div className=' w-75 mx-auto my-3 '>
            <div className='border-bottom row py-2  text-center '>
              <div className='col-md-4'>Discription</div>
              <div className='col-md-2'>Quantity</div>
              <div className='col-md-2'>Remove</div>
              <div className='col-md-2'>Price</div>
            </div>
            <div>
              {
                  cartItems.map(item => (
                    <div key={item.id} className='row d-flex align-items-center border-bottom'>
                      <div className='col-md-4 '><img className=' w-50' src={item.image}/></div>
                      <div className='col-md-2 d-flex align-items-center justify-content-center '>
                        <span className=' bg-dark text-white  p-2 rounded-2 pointer' onClick={()=>dispatch(increaseQuantity(item.id))}> <TiPlus/> </span>
                        <span className=' fw-semibold p-2'>{item.quantity}</span>
                        <span className=' bg-light p-2 rounded-2 pointer' onClick={()=>dispatch(decreaseQuantity(item.id))}> <FaMinus/> </span>
                      </div>
                      <div className='col-md-2 d-flex align-items-center justify-content-center pointer' onClick={()=>dispatch(removeFromCart(item.id))}> 
                        <MdRemoveShoppingCart size={25} color='#f40707'/> 
                      </div>
                      <div className='col-md-2 d-flex align-items-center justify-content-center fw-semibold'> ${item.totalPrice}</div>
                    </div>
                  ))
              }
            </div>
            <div className="d-flex justify-content-end mt-4">
              <div className="border rounded p-3 " style={{ minWidth: "220px" }}>
                <p className="m-0 d-flex justify-content-evenly fw-semibold">
                  <span>Total :</span>
                  <span>$ {totalAmount}</span>
                </p>
              </div>
            </div>
          </div>
        } 
      </div>
    </div>
  )
}

export default Cart;
