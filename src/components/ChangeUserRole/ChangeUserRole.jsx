import React, { useState } from 'react'
import ROLE from '../../common/ROLE.JS'
import { MdClose } from "react-icons/md";
import SummaryApi from '../../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({name,callFunc,email,role,userId, onClose}) => {
    const [userRole, setUserRole]= useState(role);
    const handleOnRoleChange=(e)=>{
        setUserRole(e.target.value);
    }

    const updateUserRole= async()=>{
        const fetchResponse= await fetch(SummaryApi.updateUser.url,{
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                userId: userId,
                role:userRole
            })
        })
        const responseData= await fetchResponse.json();

        if(responseData.success){
            toast.success('Role Updated')
            onClose();
            callFunc();
        }
        console.log("role updated",responseData);
    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex w-full h-full z-10 justify-between items-center bg-slate-200/50 '>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

            <button className='block ml-auto' onClick={onClose}>
                <MdClose />
            </button>
            <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
            <p>Name: {name}</p>
            <p>Email: {email}</p>

            <div className='flex justify-between items-center my-4'>
              <p>Role:</p>
            <select className='border px-4 py-1' value={userRole} onChange={handleOnRoleChange}>
                {
                    Object.values(ROLE).map(el=>(
                        <option value={el} key={el}>{el}</option>
                    ))
                }
            </select>  
            </div>
            <button className='w-fit mx-auto py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700 block' onClick={updateUserRole}>Change Role</button>
        </div>
    </div>
  )
}

export default ChangeUserRole