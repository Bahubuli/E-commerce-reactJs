import React from 'react'
import { Link,Navigate,useLocation } from 'react-router-dom'
import {useForm} from 'react-hook-form';
import { selectLoggedInUser,createUserAsync, errorSelector, resetPasswordAsync} from '../../Store/authSlice';
import { useSelector, useDispatch} from 'react-redux';
export default function ResetPass() {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }

    const dispatch = useDispatch();
    const {register,handleSubmit,watch,formState:{errors}} = useForm();
    const query = useQuery();

    const user = useSelector(selectLoggedInUser);
    const error = useSelector(errorSelector)
    return (
    <div>
      {user && <Navigate to="/" replace={true}></Navigate>}
     <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Enter Your New Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit((data)=>{
        const verifyBody = {
            password:data.password,
            token: query.get('token'),
            email: query.get('email'),
        }
         dispatch(resetPasswordAsync(verifyBody))
        })}>


          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register("password", {required:"password is required",
                pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:"password should contain minimum 8 charactors and  at least 1 uppercase, lowercase, digit  "}})}
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        {error && <p className="text-red-500">{error.message}</p>}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
         
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Login
          </Link>
        </p>
      </div>
    </div>
  </></div>
  )
}