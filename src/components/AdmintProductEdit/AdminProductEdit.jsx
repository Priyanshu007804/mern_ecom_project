import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../../helpers/productCategory'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../../helpers/uploadImage';
import DisplayImage from '../DisplayImage/DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../../common';
import { toast } from 'react-toastify';


const AdminProductEdit = ({ onClose,prevdata,fetchData }) => {
  const [data,setData]= useState({
    ...prevdata,
    productName: prevdata?.productName,
    brandName: prevdata?.brandName,
    category: prevdata?.category,
    productImage: prevdata?.productImage || [],
    description: prevdata?.description,
    price: prevdata?.price,
    sellingPrice:prevdata?.sellingPrice
  })

  const [openFullScreenImage, setOpenFullScreenImage]= useState(false)
  const [fullScreenImage, setFullScreenImage]= useState("");
  const [uploadProductInput, setUploadProductInput]=useState("")
  const handleOnChange=(e)=>{
    const {name, value}=e.target

    setData((prev)=>{
      return{
        ...prev,
        [name]: value
      }})
  }
  const handleUploadProduct= async(e)=>{
    const file= e.target.files[0];
    console.log("file",file)
    setUploadProductInput(file.name)
    const uploadImageCloudinary= await uploadImage(file)
    setData((prev)=>{
      return{
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url]
      }
    })
    console.log("upload Image",uploadImageCloudinary.url)
  }

  const handleDeleteProductImage= async (index)=>{
      const newProductImage=[...data.productImage]
      newProductImage.splice(index,1);

      setData((prev)=>{
      return{
        ...prev,
        productImage: [...newProductImage]
      }
    })
  }

// Upload Product
const handleSubmit = async (e)=>{
  e.preventDefault();
  const response= await fetch(SummaryApi.updateProduct.url,{
    method: SummaryApi.updateProduct.method,
    credentials: 'include',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const responseData= await response.json()

  if(responseData.success){
    toast.success(responseData?.message)
    onClose();
    fetchData();
  }
  if(responseData.error){
    toast.error(responseData?.message);
  }

}
console.log(data.productImage)

  return (
    <div className='fixed w-full h-full bg-slate-200/35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>

        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
           <div className='flex justify-between items-center py-3'>
               <h2 className='font-bold text-lg'>Edit Product</h2> 
               <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}> 
                <IoMdClose />
                </div> 
            </div> 

          <form className='grid p-4 gap-3 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
            <label htmlFor='productName'>Product Name:</label>
            <input type='text' id='productName' name='productName' className='p-2 bg-slate-100 border rounded' placeholder='Enter product name' value={data.productName} onChange={handleOnChange} required/>

             <label htmlFor='brandName' className='mt-3'>Brand Name:</label>
            <input type='text' id='brandName' name='brandName' className='p-2 bg-slate-100 border rounded' placeholder='Enter brand name' value={data.brandName} onChange={handleOnChange} required/>

             <label htmlFor='category' className='mt-3'>Category:</label>
              <select value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' required>
                <option value={""}>Select Category</option>
                {
                  productCategory.map((el,index)=>{
                    return(
                      <option value={el.value} key={el.value+index}>{el.label}</option>
                    )
                  })
                }
              </select>

              <label htmlFor='productImage' className='mt-3'>Product Image:</label>
               <label htmlFor='uploadImageInput'>
              <div className='p-2 bg-slate-100 border h-48 rounded w-full flex justify-center items-center cursor-pointer'>
               
                  <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                  <span className='text-5xl'>
                    <FaCloudUploadAlt />
                  </span>
                  <p className='text-sm'>Upload Product Image</p>
                  <input type='file' id='uploadImageInput' className='hidden'  onChange={handleUploadProduct}/>
                </div>
    
              </div>
              </label>
              <div>
                {
                  data?.productImage[0] ? (
                    <div className='flex items-center gap-2'>
                      {
                        data.productImage.map((el,index)=>{
                      return(
                        <div className='relative group'>
                         <img src={el} alt={el} height={100} width={100} key={el+index} className='bg-slate-100 border mb-3 cursor-pointer' onClick={()=>{setOpenFullScreenImage(true),setFullScreenImage(el)}}/>
                         <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                          <MdDelete/>
                         </div>
                      </div>
                      )
                    })
                      }
                      </div>
                    
                  ):(
                    <p className='text-red-600 text-xs mb-3'>*Please upload product Image</p>
                  )
                }
              
              
              </div>
               <label htmlFor='price' className='mt-3'>Enter Price:</label> 
               <input type='number' id='price' name='price' className='p-2 bg-slate-100 border rounded' required  placeholder='Enter Price' value={data.price} onChange={handleOnChange}/>
              
              <label htmlFor='sellingPrice' className='mt-3'>Enter Selling Price:</label> 
               <input type='number' id='sellingPrice' name='sellingPrice' className='p-2 bg-slate-100 border rounded' required placeholder='Enter Selling Price' value={data.sellingPrice} onChange={handleOnChange}/>
              
               <label htmlFor='description' className='mt-3'>Description:</label> 
               <textarea className='h-20 bg-slate-100 border resize-none p-1' rows={3} name='description' required value={data.description} onChange={handleOnChange} placeholder='Enter Product Description'>

               </textarea>
              
              <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 '>Update Product</button>
          </form>


        </div>
        {/* ******Display Image Full screen************* */}
        {
          openFullScreenImage && (
              <DisplayImage imgUrl={fullScreenImage} onClose={()=>setOpenFullScreenImage(false)}/>
          )
        }
    </div>
  )
}

export default AdminProductEdit