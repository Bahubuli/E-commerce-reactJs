import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import ProductList from '../ProductList/ProductList'
import { useDispatch } from 'react-redux'
import { autoLoginAsync } from '../../Store/authSlice';
export default function Home() {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(autoLoginAsync());
    },[])
  return (
    <div>
        <Navbar>
            <ProductList/>
        </Navbar>
    </div>
  )
}
