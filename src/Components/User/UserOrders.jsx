import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser,autoLoginAsync } from "../../Store/authSlice";
import { discountPrice } from "../../../constants";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserOrders,
} from "../../Store/userSlice";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import {
  selectCartItems,
  updateCartAsync,
  deleteFromCartAsync,
} from "../../Store/cartSlice";
import { fetchUserOrdersAsync } from "../../Store/orderSlice";
import { selectOrders } from "../../Store/orderSlice";
export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  let orders = useSelector(selectOrders);
  if(orders)
  orders = [...orders].reverse();
  console.log(orders);
  useEffect(() => {
    dispatch(fetchUserOrdersAsync(user));
  }, []);



  return (
    <div>
        <h1 className="mx-auto text-xl">My Orders</h1>
      {orders &&
        orders.map((order) => (
          <div className="flex h-full flex-col overflow-y-scroll mx-auto max-w-7xl px-4 bg-white shadow-xl mt-12">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start justify-between">
                  <h1
                    className="text-xl font-medium text-gray-900"
                    id="headlessui-dialog-title-:r2:"
                    data-headlessui-state="open"
                  >
                    Order id #{order._id}
                  </h1>
                </div>
              </div>
              <h3
                className="text-md font-medium text-gray-900"
                id="headlessui-dialog-title-:r2:"
                data-headlessui-state="open"
              >
                Order Status : {order.status}
              </h3>
              <div className="mt-8">
                <div className="flex">

                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={order.thumbnail}
                            alt={order.thumbnail}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={"/product-details/" + order._id}>
                                  {order.name}
                                </Link>
                              </h3>

                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              brand {order.company}
                            </p>
                          </div>
                          <div className="">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty {order.quantity}
                              </label>
                            </div>
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                  price ₹ {discountPrice(order)}
                              </label>
                            </div>
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                  Total Price ₹ {discountPrice(order)*order.quantity}
                              </label>
                            </div>
                            <div>


              </div>
                          </div>
                        </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <p>Shipping Address</p>
              <li className="flex border-2 rounded-lg gap-x-6 m-2 p-2 justify-between py-5 flex-wrap">
                <div className="flex min-w-0 gap-x-4 item-center ">
                  <div className="min-w-0 flex-auto ">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order?.address?.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order?.address?.email}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 px-8 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {order?.address?.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                   {order?.address?.city} {order?.address?.state} ( pin: {order?.address?.pinCode})
                  </p>
                </div>
              </li>
            </div>
          </div>
        ))}
    </div>
  );
}
