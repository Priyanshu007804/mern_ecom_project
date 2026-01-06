import React, { useContext, useState } from 'react'
import sigin from '../../assets/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import Context from '../../context';

const Login = () => {
    const [showPassword, setShowPassword]= useState(false)
    const navigate= useNavigate();
    const generalContext= useContext(Context)
    console.log(generalContext)
    const [data,setData]=useState({
        email:'',
        password:'',
        profile_pic:''
    });

    const onHandleChange=(e)=>{
        const {name, value}=e.target;
        setData((preve)=>{
            return{
                ...preve,
                [name]: value
            }
        })
    }

    const onClickEye=()=>{
        setShowPassword(!showPassword)
    }
    
    const handleSubmit=async (e)=>{
        e.preventDefault()

        const dataResponse= await fetch(SummaryApi.signIn.url,{
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(data)
        })
        const dataApi= await dataResponse.json()
        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/');
            generalContext.fetchUserDetails()
            generalContext.fetchAddtoCartCount()


        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }
  return (
    <div>
        <section id='login'>
            <div className='mx-auto container p-4 pt-20'>
                <div className='bg-white p-4 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={sigin} />
                    </div>

                    <form className="pt-6 flex flex-col gap-2"  onSubmit={handleSubmit}>
                        <div className='grid'>
                        <label>Email :</label>
                        <div className='bg-slate-100 p-2'>
                        <input type='email' name='email' value={data.email} onChange={onHandleChange} placeholder='Enter your Email...' className='w-full h-full outline-none bg-transparent' />
                        </div>
                        </div>

                        <div>
                        <label>Password :</label>
                        <div className='bg-slate-100 p-2 flex'>
                        <input type={showPassword? 'text':'password'} name='password' value={data.password} onChange={onHandleChange} placeholder='Enter Password...' className='w-full h-full outline-none bg-transparent' />
                        <div className='cursor-pointer'>
                            <span onClick={onClickEye}>
                               {
                                showPassword?(
                                    <FaEyeSlash/>
                                ):
                                (
                                    <FaEye/>
                                )
                               }
                            </span>

                        </div>
                        </div>
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'> Forget Password? </Link>
                        </div>
                       
                    
                        <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'>Login</button>

                    </form>

                    <p className='my-6'> Don't have an account? <Link to={'/signup'} className='hover:text-red-700 text-red-600 hover:underline'>Sign Up</Link></p>
                </div>
            </div>
        </section>

    </div>
  )
}

export default Login