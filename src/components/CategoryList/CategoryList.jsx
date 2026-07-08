import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common';
import { Link } from 'react-router-dom';
import "./CategoryList.css"

const CategoryList = () => {

    const [categoryProduct, setCategoryProduct]= useState([]);
    const [loading,setLoading]= useState(false)
    const categoryLoading= new Array(13).fill(null)
    const fetchCategoryProduct= async()=>{
        setLoading(true);
        const response= await fetch(SummaryApi.catergoryProduct.url);
        const dataResponse = await response.json()
        setLoading(false);
        setCategoryProduct(dataResponse.data);
    }
    useEffect(()=>{
        fetchCategoryProduct();
    },[])
  return (
    <div className='container mx-auto p-4 pt-20'>
        <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
            {
                loading ? (
                    
                        categoryLoading.map((el,index)=>(
                            <div className='h=16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>

                    </div> 
                        ))       
                ):
                (
                 categoryProduct?.map((product, index)=>{
                    return(
                        <Link to={'/product-category?category='+product?.category} className='cursor-pointer' key={product?.category+index}>
                            <div className='w-16 h-16 md:w-25 md:h-25 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                <img src={product?.productImage[0]} alt={product?.category} className='object-scale-down h-full mix-blend-multiply hover:scale-125 transition-all'/>
                            </div>
                            <p className='text-center text-sm md:text-base capitalize '>{product?.category}</p>
                        </Link>
                    )
                })
            )
            }
        </div>
            
           
    </div>
  )
}

export default CategoryList