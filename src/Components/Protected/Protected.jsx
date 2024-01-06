import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import { autoLoginAsync, selectLoggedInUser } from '../../Store/authSlice';
import { useEffect } from 'react';

export default function Protected({children})
{
    const dispatch = useDispatch();

    const user = useSelector(selectLoggedInUser);
    if(!user)
        return <Navigate to="/login"></Navigate>
    if(!user && user.role!=='admin')
        return <Navigate to="/"></Navigate>
   return children
}
