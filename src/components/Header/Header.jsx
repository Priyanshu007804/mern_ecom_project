import React, { useContext, useState } from "react";
// import Logo from "../Logo/logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../../store/userSlice";
import ROLE from "../../common/role";
import Context from "../../context";
import Logo from "../../assets/banner/Logo.jpeg"

const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const searchInput = useLocation()
  const URLsearch= new URLSearchParams(searchInput?.search)
  const searchQuery = URLsearch.getAll("q")
  const [search, setSearch]= useState(searchQuery)


  const user = useSelector((state) => state?.user?.user);
  console.log("user header", user);
  const context = useContext(Context)
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate('/signin')
    }
    if (data.error) {
      toast.error(data.error);
    }
  };
  const onMenuClick = () => {
    setMenuDisplay(!menuDisplay);
  };
  console.log("Header add to cart count:",context)

  const handleSearch = (e)=>{
    const {value} = e.target
    setSearch(value)
    if(value){
    navigate(`/search?q=${value}`)
    }else{
      navigate('/search')
    }
  }
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <Link to={'/'} className="logo">
          {/* <Logo w={90} h={50} /> */}
          <img src={Logo} className="object-scale-down w-55 h-14 mix-blend-multiply"/>
        </Link>

        {
          user?._id && (
          <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
                    <input
                      type="text"
                      placeholder="Search Items here...."
                      className="w-full outline-none"
                      onChange={handleSearch}
                      value={search}
                    />
                    <div className="text-lg w-13 h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
                      <GrSearch />
                    </div>
                  </div>
          )
        }
        

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                onClick={onMenuClick}
                className="icons text-3xl cursor-pointer"
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay ? (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/products"}
                      className=" md:block hidden whitespace-nowrap hover:bg-slate-100 p-2"
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            ) : null}
          </div>

           
            {
              user?._id && (
                         <Link to={'/cart'} className="icons text-2xl relative cursor-pointer">
 
                 <span>
              <FaShoppingCart />
            </span>
             <div className="bg-red-600 text-white w-5 h-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">{context.cartCount}</p>
             </div> 
             </Link>

              )
            }
            
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/signin"}
                className="px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
