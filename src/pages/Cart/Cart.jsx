import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../../common';
import Context from '../../context';
import displayINRCurrency from '../../helpers/displayCurrency';
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';


const Cart = () => {
    const [data,setData]= useState([]);
    const [loading,setLoading]= useState(false)
    const context = useContext(Context)
    const LoadingCart = new Array(context.cartCount).fill(null)
    const fetchData = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.viewCartProduct.url,{
            method: SummaryApi.viewCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            }
        })
        setLoading(false)
        const responseData = await response.json();

        if(responseData.success){
            setData(responseData)
        }

    }
    console.log("View Cart Product:",data)


    const increaseQty = async(id,qty)=>{
        const response = await fetch(SummaryApi.updateAddtoCart.url,{
            method: SummaryApi.updateAddtoCart.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty+1
            })
        })
        const responseData= await response.json()
        if(responseData.success){
            fetchData()
        }
    }

    const decreaseQty = async(id,qty)=>{
        if(qty>=2){
        const response = await fetch(SummaryApi.updateAddtoCart.url,{
            method: SummaryApi.updateAddtoCart.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty-1
            })
        })
        const responseData= await response.json()
        if(responseData.success){
            fetchData()
        }
    } 
    }

    const deleteAddToCartProduct = async(id)=>{
        const dataResponse = await fetch(SummaryApi.deleteAddToCart.url,{
            method:SummaryApi.deleteAddToCart.method,
            credentials:'include',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                _id:id
            })
        })

        const response = await dataResponse.json()
        if(response.success){
            toast.success(response.message);
            fetchData();
            context.fetchAddtoCartCount()
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    const totalQty= data?.data?.reduce((previousValue,currentValue)=>previousValue+currentValue?.quantity,0)
    const totalPrice= data?.data?.reduce((previousValue,currentValue)=>previousValue+(currentValue?.quantity * currentValue?.productId?.sellingPrice),0)

  return (
    <div className='container mx-auto pt-20'>
        <div className='text-center text-lg my-3'>
            {
            data.length === 0 && !loading && (
                <p className='bg-white py-5'>No Data...</p>
            )
        }
        </div>
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
            {/* View Product */}
            <div className='w-full max-w-3xl '>
                {
                    loading ? (
                        LoadingCart.map((el,index)=>{
                            return(
                              <div key={el+"loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                            
                            </div>  
                            )
                            
                        })
                        
                    ):(
                        
                           data?.data?.map((product,index)=>{
                            return(
                                <div key={product.productId._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded flex overflow-hidden'>
                                <div className='w-32 h-32 bg-slate-200 flex-shrink-0 p-2'>
                                        <img src={product?.productId.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                    </div>
                                    <div className='px-4 py-2 flex-grow relative'>
                                        {/* Delete Prooduct */}
                                        <div onClick={()=>deleteAddToCartProduct(product?._id)} className='absolute right-0 text-red-600 rounded-full p-3 hover:bg-red-600 hover:text-white cursor-pointer '>
                                            <MdDeleteForever />
                                            </div>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text text-slate-500'>{product?.productId?.category}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product.productId.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product.productId.sellingPrice * product?.quantity) }</p>
                                        </div>
                                        
                                        <div className='flex items-center gap-3 mt-2'>
                                            <button className=' border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white transition-all cursor-pointer' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                            <span>{product?.quantity}</span>
                                            <button className=' border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white transition-all cursor-pointer' onClick={()=>decreaseQty(product?._id, product?.quantity)}>-</button>
                                            </div>
                                    </div>
                            </div>  
                            )
                        }) 
                        
                        
                    )
                }
            </div>
            {/* Total Product */}
           
            <div className='mt-5 lg:mt-0 w-full max-w-md'>
                 {
                loading ? (
                    <div className='h-36 bg-slate-200 border border-slate-200 animate-pulse'>
                        
                        </div>
                ):(
                    <div className='h-36 bg-slate-200'>
                        <h2 className='text-white bg-red-600 px-4 py-1'>Summary:</h2>
                        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600 '>
                            <p>Quantity</p>
                            <p>{totalQty}</p>
                            </div>

                        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                            <p>Total Price:</p>
                            <p>{displayINRCurrency(totalPrice)}</p>
                            </div>

                            <button className='bg-blue-600 p-4 text-white w-full hover:bg-blue-700 transition-all '>Payment</button>
                        </div>
                )
            }
            </div>
        </div>
    </div>
  )
}

export default Cart