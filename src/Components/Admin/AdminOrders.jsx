import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../Store/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";
import { discountPrice } from "../../../constants";
import { updateOrder } from "../../API/orderApi";
import { Pagination } from "../ProductList/ProductList";
export default function AdminOrders() {
  const ITEMS_PER_PAGE = 10;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [editableItemId,setEditableItemId] = useState(-1);
  useEffect(() => {
    handlePage(page);
  }, [page]);

  const orders = useSelector(selectOrders);
  const totalOrders =orders.reduce((total,order)=> total+order.cartItems.length,0)
  const handleEdit = (order,item) => {
    setEditableOrderId(order.id);
    setEditableItemId(item.id)
  };

  const chooseColor = (status)=>{

     if(status==='canceled')
     return "bg-red-400"
     else if(status==='pending')
     return 'bg-yellow-400'
     else if(status==='dispatched')
     return 'bg-blue-400';
     else return 'bg-green-400'
  }

  const handleShow = () => {
    console.log("show");
  };

  const handlePage = (page)=>{
    setPage(page);
    const pagination = {_page:page,_limit:ITEMS_PER_PAGE};
    dispatch(fetchAllOrdersAsync(pagination));
  }
  const handleUpdate = (e, order,item) => {

    const idx = order.cartItems.findIndex(x=>x.id===item.id);
    let items = [...order.cartItems];
    let updatedItem = {...items[idx],status:e.target.value}
    items[idx] = updatedItem;
    let updatedOrder = {...order,cartItems:items}
    console.log(updatedOrder)
    dispatch(updateOrderAsync(updatedOrder))
    setEditableItemId(-1);
    setEditableOrderId(-1)
  };
  return (
    <Navbar>
      <div className="overflow-x-auto">
        <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  {
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Order Number</th>
                      <th className="py-3 px-6 text-left">Item</th>
                      <th className="py-3 px-6 text-center">Total Amount</th>
                      <th className="py-3 px-6 text-center">
                        Shipping Address
                      </th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  }
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders &&
                    orders.map((order) =>
                      order.cartItems.map((item) => (
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="mr-2"></div>
                              <span className="font-medium">
                                Order No #{order.id}{" "}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center gap-3">
                              <div className="mr-2"></div>
                              <img
                                className="w-6 h-6 rounded-lg border-gray-200 border -m-1 transform hover:scale-125"
                                src={item.thumbnail}
                              />
                              <span>
                                {item.title} # {item.quantity} ={" "}
                                {discountPrice(item)}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex items-center justify-center">
                              <span>{discountPrice(item) * item.quantity}</span>
                            </div>
                          </td>
                          <td>
                            <div>{order.selectedAddress.name}</div>
                            <div>{order.selectedAddress.phone}</div>
                            <div>{order.selectedAddress.street}</div>
                            <div>
                              {order.selectedAddress.city} ,{" "}
                              {order.selectedAddress.state}{" "}
                              {order.selectedAddress.pinCode}{" "}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">

                            {(order.id===editableOrderId && item.id===editableItemId) ?
                            <select
                              className="rounded-lg"
                              onChange={(e) => handleUpdate(e, order,item)}
                            >
                              <option value="pending">Pending</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="canceled">canceled</option>
                            </select>
                            :
                             <span className={`${chooseColor(item.status)} p-1  rounded`}>{item.status}</span>}
                          </td>

                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <EyeIcon onClick={handleShow} />
                              </div>
                              <div
                                onClick={() => handleEdit(order,item)}
                                className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems= {totalOrders}/>
    </Navbar>
  );
}
