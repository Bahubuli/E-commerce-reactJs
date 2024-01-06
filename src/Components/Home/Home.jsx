import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import ProductList from '../ProductList/ProductList'
import { useDispatch } from 'react-redux'
import { autoLoginAsync } from '../../Store/authSlice';
export default function Home() {

    
  return (
    <div>
        <Navbar>
            <ProductList/>
        </Navbar>
    </div>
  )
}
