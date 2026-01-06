import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../../helpers/fetchCategoryWiseProduct';
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import './VerticalCardProduct.css'
import displayINRCurrency from '../../helpers/displayCurrency';
import addtoCart from '../../helpers/addtoCart';
import { Link } from 'react-router-dom';
import Context from '../../context';
const VerticalCardProduct = ({category, heading}) => {
    const [data,setData]= useState([]);
    const [loading, setLoading]= useState(true);
    const loadingList= new Array(13).fill(null)

    const [scroll,setScroll]= useState(0)

     const {fetchAddtoCartCount} = useContext(Context)

    const handleAddtoCart=async(e,id)=>{
      await addtoCart(e,id)
      await fetchAddtoCartCount()

    }
    const scrollElement =useRef()

    const fetchData= async()=>{
      setLoading(true)
      const categoryProduct= await fetchCategoryWiseProduct(category)
      setLoading(false)

      setData(categoryProduct?.data)
    }

useEffect(()=>{
  fetchData();
},[])

const scrollRight=()=>{
  scrollElement.current.scrollLeft +=300
}
const scrollLeft =()=>{
  scrollElement.current.scrollLeft -= 300
}
  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
          <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all ' ref={scrollElement}>
            <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
            <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>
        {
            
                loading?(
           loadingList.map((product,index)=>(
            
            <div className='w-full min-w-[280px] md:min-w-[340px] max-w-[280px] md:max-w-[340p] h-36 bg-white rounded-sm shadow flex '  key={product+index}>
            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'> 
            </div>

            <div className='p-4 grid w-full gap-2'>
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse'></h2>
                <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse'></p>
                <div className='flex gap-3 w-full'>
                  <p className='text-red-600 font-medium p-1 bg-slate-200 animate-pulse rounded-full'></p>
                  <p className='text-slate-500 line-through p-1 bg-slate-200 animate-pulse rounded-full'></p>
                  </div>

                  <button className=' text-white px-2 py-0.5 rounded-full text-sm p-1 animate-pulse w-full'></button>
            </div>
            </div>
              
          ))
                ):(
                    data.map((product,index)=>(
            
                 <Link to={'product/'+product?._id} className='w-full min-w-[280px] md:min-w-[340px] max-w-[280px] md:max-w-[340p] bg-white rounded-sm shadow ' key={product+index}>
            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'> 
                <img src={product.productImage[0]} className='object-scale-down h-full mx-auto hover:scale-110 transition-all mix-blend-multiply'/>
            </div>

            <div className='p-4 grid'>
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                <p className='capitalize text-slate-500'>{product?.category}</p>
                <div className='flex gap-3'>
                  <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice) }</p>
                  <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                  </div>

                <button className='bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded-full text-sm' onClick={(e)=>handleAddtoCart(e,product?._id)}>Add to Cart</button>
            </div>
            </Link>
              
          )) 
                )
            

         
        }
        </div>
     </div>
)
}

export default VerticalCardProduct