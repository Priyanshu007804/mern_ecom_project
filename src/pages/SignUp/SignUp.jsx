import React from "react";
import { useState } from "react";
import sigin from "../../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imgToBase64 from "../../helpers/imgToBase64";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confimPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    profilePic: ''
  });

  const navigate= useNavigate()

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const onClickEye = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(data.password=== data.confirmpassword){
        const dataResponse= await fetch(SummaryApi.signUp.url,{
      method: SummaryApi.signUp.method,
      headers:{
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const dataApi= await dataResponse.json();
    if(dataApi.success){
      toast.success(dataApi.message);
      navigate('/signin');
    }
    if(dataApi.error){
      toast.error(dataApi.message);
    }

    }else{
      toast.error("Please Check Password & Confirm Password...")
      console.log("Please Check Password & Confirm Password...")
    }
  };
  const handleUploadClick= async (e)=>{
    const file= e.target.files[0];

    const imgPic= await imgToBase64(file)
    setData((prev)=>{
      return{
        ...prev,
        profilePic: imgPic
      }
    })
  }

  return (
    <div>
      <section id="signup">
        <div className="mx-auto container p-4">
          <div className="bg-white p-4 w-full max-w-sm mx-auto">
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
              <div>
              <img src={data.profilePic || sigin} />
              </div>
              <form>
                <label>
                  <div className="text-xs opacity-80 bg-white pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                Upload Photo
              </div>
              <input type="file" className="hidden" onChange={handleUploadClick}/>
                </label>
                
              </form>
              
            </div>

            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="grid">
                <label>Name :</label>
                <div className="bg-slate-100 p-2">
                  <input
                    required
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={onHandleChange}
                    placeholder="Enter your name"
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="grid">
                <label>Email :</label>
                <div className="bg-slate-100 p-2">
                  <input
                    required
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={onHandleChange}
                    placeholder="Enter your Email..."
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label>Password :</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={onHandleChange}
                    placeholder="Enter Password..."
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div className="cursor-pointer">
                    <span onClick={onClickEye}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label>Confirm Password :</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    required
                    type={confimPassword ? "text" : "password"}
                    name="confirmpassword"
                    value={data.confirmpassword}
                    onChange={onHandleChange}
                    placeholder="Confirm Password..."
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div className="cursor-pointer">
                    <span
                      onClick={() => setShowConfirmPassword(!confimPassword)}
                    >
                      {confimPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>

              <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700">
                Sign Up
              </button>
            </form>

            <p className="my-6">
              {" "}
              Already have an account?{" "}
              <Link
                to={"/signin"}
                className="hover:text-red-700 text-red-600 hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
