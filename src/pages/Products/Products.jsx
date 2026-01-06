import React, { useEffect, useState } from 'react'
import UploadedProducts from '../../components/UploadedProducts/UploadedProducts'
import SummaryApi from '../../common';
import AdminProductCard from '../../components/AdminProductCard/AdminProductCard';

const Products = () => {
  const [allProducts, setAllProduct]= useState([]);
  
    const fetchAllProduct = async()=>{
        const response = await fetch(SummaryApi.getProduct.url,{
          method: SummaryApi.getProduct.method,
          credentials: 'include'
        })

        const dataResponse= await response.json();

        setAllProduct(dataResponse?.data || [])

    }

    useEffect(()=>{
      fetchAllProduct();
  },[])

  
  const [openUploadedProducts, setOpenUploadedProducts]= useState(false)
  return (
    <div >
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border border-red-600 hover:bg-red-600 hover:text-white px-2 transition-all py-3 rounded-full' onClick={()=>setOpenUploadedProducts(true)}>Upload Product</button>
      </div>


    {/* All Products */}

    <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-300px)] overflow-y-scroll'>
        {
          allProducts.map((product,index)=>{
            return(
                      <AdminProductCard data={product} key={index+"allProduct"} fetchData={fetchAllProduct} />
    
            )

            
        })
}
    </div>











      {/* {Upload Product Component} */}
      {
        openUploadedProducts && (
           <UploadedProducts onClose={()=>setOpenUploadedProducts(false)} fetchData={fetchAllProduct}/>
        )
      }

    </div>
  )
}

export default Products