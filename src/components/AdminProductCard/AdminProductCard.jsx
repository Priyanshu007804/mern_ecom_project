import React, { useState } from 'react'
import { MdOutlineModeEditOutline } from "react-icons/md";
import AdminProductEdit from '../AdmintProductEdit/AdminProductEdit';
import displayINRCurrency from '../../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchData
}) => {
  const [editProduct,setEditProduct]= useState(false)
  return(
              <div className='bg-white p-4 rounded'>
                <div className='w-40'>
                  <div className='w-32 h-32 flex justify-center items-center'>
                      <img src={data?.productImage[0]}  className='object-fill mx-auto h-full' />
                  </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
                <div>
                  <p className='font-semibold'>
                    Price:  { displayINRCurrency(data.sellingPrice)}
                  </p>

                   <div className='w-fit ml-auto bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdOutlineModeEditOutline />
                </div>
                </div>
               
                </div>
                
                  {
                    editProduct && (
                      <AdminProductEdit prevdata={data} onClose={()=>setEditProduct(false)} fetchData={fetchData}/>
                    )
                  }
                
              </div>
            )
          

        }
export default AdminProductCard