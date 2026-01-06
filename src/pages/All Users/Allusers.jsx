import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common'
import './allUsers.css'
import { toast } from 'react-toastify'
import moment from 'moment/moment'
import { MdModeEditOutline } from "react-icons/md";
import ChangeUserRole from '../../components/ChangeUserRole/ChangeUserRole'

const Allusers = () => {
  const [allUser,setAllUser]= useState([])
  const [updateRole, setUpdateRole]=useState(false)
  const [updateUserDetails, setUpdateUserRole]= useState({
    email:'',
    name: "",
    role:"",
    _id:""
  })
  const fetchApi=async()=>{
    const fetchData= await fetch(SummaryApi.allUser.url,{
      method: SummaryApi.allUser.method,
      credentials: 'include'
    })
    const dataResponse= await fetchData.json()
    if(dataResponse.success){
      setAllUser(dataResponse.data);
    }
    if(dataResponse.error){
      toast.error(dataResponse.message)
    }
    
    console.log(dataResponse);
  }

  useEffect(()=>{
    fetchApi()
  },[])
  return (
    <div className='bg-white p-4'>
      <table className='w-full userTable'>
        <thead className='bg-black text-white'>
          <th>Sr.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Created Date</th>
        <th>Action</th>
        </thead>
        <tbody>
          {
            allUser.map((el,index)=>{
              return(
                <tr>
                  <td>{index+1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('ll')}</td>
                  <td><button className='bg-green-100 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' onClick={()=>{setUpdateUserRole(el), setUpdateRole(!updateRole)}}><MdModeEditOutline /></button></td>
                </tr>
              )
            })
          }
        </tbody>
        
      </table>
      {
        updateRole && (
      <ChangeUserRole name={updateUserDetails.name} email={updateUserDetails.email} callFunc={fetchApi} role={updateUserDetails.role} userId={updateUserDetails._id} onClose={()=> setUpdateRole(false)}/>
        )
      }


    </div>
    
  )
}

export default Allusers