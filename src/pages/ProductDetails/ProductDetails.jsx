import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

import './ProductDetail.css'
import displayINRCurrency from '../../helpers/displayCurrency';
import VerticalCardProduct from '../../components/VerticalCardProduct/VerticalCardProduct';
import addtoCart from '../../helpers/addtoCart';
import CategoryWiseProductDisplay from '../../components/CategoryWiseProductDisplay/CategoryWiseProductDisplay';
import Context from '../../context';

const ProductDetails = () => {
  const [data,setData]= useState({
    productName: "",
    brandName:  "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })
  const navigate = useNavigate()
  const [loading,setLoading]= useState(true)
  const [activeImage,setActiveImage]= useState("");
  const productImageList= new Array(data.productImage.length).fill(null)
  const [zoomCoordinate,setZoomCoordinate]= useState({
    x: 0,
    y: 0
  })
  const [zoomImage,setZoomImage] = useState(false)
  const params= useParams()
  const {fetchAddtoCartCount} = useContext(Context)

  const fetchProductDetails= async()=>{
    setLoading(true)
    const dataResponse= await fetch(SummaryApi.productDetail.url,{
      method: SummaryApi.productDetail.method,
      headers:{
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    const response = await dataResponse.json()
    setLoading(false)
    
    setData(response?.data)
    setActiveImage(response?.data.productImage[0])
  }

  console.log(data)
  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct= (imgURL)=>{
    setActiveImage(imgURL)
  }


  const handleZoomImage= useCallback((e)=>{
    setZoomImage(true)
    const {left,top, width, height}= e.target.getBoundingClientRect()
    console.log('coodinates', left, top, width, height)
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomCoordinate({x,y})
    
  },[zoomCoordinate])

const handleLeaveZoomOut =()=>{
  setZoomImage(false)
}
const handleAddtoCart = async(e,id)=>{
  await addtoCart(e,id)
  fetchAddtoCartCount()
}
const handleBuyProduct = async(e,id)=>{
  await addtoCart(e,id)
  fetchAddtoCartCount()
  navigate('/cart')
}
  return (
    <div className='container mx-auto p-4 pt-20'>
      <div className=' min-h-[350px] flex flex-col lg:flex-row gap-4'>

        {/* Product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4' >

          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 mx-auto bg-slate-200 relative p-2'>
              <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onClick={handleZoomImage} onMouseLeave={handleLeaveZoomOut}/>
            {/* product zoom */}
            {
              zoomImage && (
                <div className='absolute hidden lg:block min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                <div className='w-full h-full min-h-[400px] min-w-[500px]  mix-blend-multiply scale-125' style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: `${zoomCoordinate.x * 100}% ${zoomCoordinate.y * 100}% `
                }}>

                </div>
              </div>
              )
            }
              
          </div>

          <div className='h-full'>
            {
              loading?(
                <div className='flex gap-2 lg:flex-col overflow-x-scroll scrollbar-none h-full'>
                  {
                productImageList.map((el)=>{
                  return(
                    <div className='bg-slate-200 h-25 w-25 rounded animate-pulse' key={"loadingImage"}>
                </div>
                  )
                  })
                  }
                  </div>                
                 
              ):(

                 <div className='flex gap-2 lg:flex-col overflow-x-scroll scrollbar-none h-full pb-3'>
                  {
                data?.productImage?.map((imgURL,index)=>{
                  return(
                    <div className='bg-slate-200 h-25 w-25 rounded p-1' key={imgURL}>
                      <img src={imgURL} className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)} onClick={()=>handleMouseEnterProduct(imgURL)}/>
                </div>
                  )
                  })
                  }
                  </div> 

              )
            }
          </div>


        </div>

      {/* Product Details */}
      {
        loading? (
          <div className='grid w-full gap-1'>
            <p className='bg-red-200 text-red-600 animate-pulse h-4 lg:h-8 w-full rounded-full inline-block '></p>
            <h2 className='text-2xl lg:text-4xl font-medium animate-pulse h-6 bg-slate-200 lg:h-8 w-full'></h2>
            <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p>
            <div className='flex text-md bg-red-200 gap-1 animate-pulse h-6 items-center lg:h-8 w-full'>
              
            </div>

            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-2 h-6 animate-pulse w-full'>
              <p className='text-red-600 bg-red-200 lg:h-8 w-full'></p>
              <p className='text-slate-400 line-through bg-slate-200 lg:h-8 w-full'></p>
            </div>

            <div className='flex items-center gap-3 my-2 w-full'>
              <button className='h-6 bg-slate-200 rounded animate-pulse lg:h-8 w-full'></button>
              <button className='h-6 bg-slate-200 rounded animate-pulse lg:h-8 w-full'></button>
            </div>
            <div>
              <h3 className='h-6 animate-pulse bg-slate-200 lg:h-8 w-full'></h3>
              <p className='h-6 animate-pulse bg-slate-200 lg:h-8 w-full'></p>
            </div>
      </div>
        ):(
            <div className='flex flex-col gap-1 '>
            <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-medium'>{data.productName}</h2>
            <p className='capitalize text-slate-400'>{data.category}</p>
            <div className='flex text-md text-red-600 gap-1'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>

            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
              <p className='text-red-600'>{displayINRCurrency(data.sellingPrice)}</p>
              <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
            </div>

            <div className='flex items-center gap-3 my-2'>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white transition-all' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy Now</button>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] bg-red-600 font-medium text-white hover:bg-white hover:text-red-600 transition-all' onClick={(e)=>handleAddtoCart(e,data?._id)}>Add to Cart</button>
            </div>
            <div>
              <h3 className='text-slate-600 font-medium my-1'>Description: </h3>
              <p>{data?.description}</p>
            </div>
      </div>
        )
      }
      
      </div>
      
      {
        data.category && (
            <CategoryWiseProductDisplay category={data.category} heading={"Also Recomended for you:"} />
        )
      }
          
    </div>
  )
}

export default ProductDetails