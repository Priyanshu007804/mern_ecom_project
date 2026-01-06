import { Routes,Route, Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Login from './pages/Login/Login'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import SignUp from './pages/SignUp/SignUp'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react'
import SummaryApi from './common'
import Context from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import AdminPanel from './pages/AdminPanel/AdminPanel'
import Allusers from './pages/All Users/Allusers'
import Products from './pages/Products/Products'
import CategoryProduct from './pages/CategoryProduct/CategoryProduct'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Cart from './pages/Cart/Cart'
import SearchProduct from './pages/SearchProduct/SearchProduct'

function App() {
  const dispatch = useDispatch()
  const [cartCount,setCardCount]= useState(0)
  const fetchUserDetails=async()=>{
    const dataResponse= await fetch(SummaryApi.current_user.url,{
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });
    const dataApi= await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
    console.log(dataApi)
  }
  

  const fetchAddtoCartCount= async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartCount.url,{
      method: SummaryApi.addToCartCount.method,
      credentials: 'include'
    })

    const response = await dataResponse.json()
    console.log(response)
    setCardCount(response?.data?.count)
  }

  useEffect(()=>{
     fetchUserDetails()
     fetchAddtoCartCount()
  },[])
  return (
    <>
    <Context.Provider value={{
      fetchUserDetails, 
      cartCount,
      fetchAddtoCartCount
      }}>
    <ToastContainer position='top-center'/>
      <Header/>
       <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signin' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/signup' element={<SignUp />}/> 
        <Route path='search' element={<SearchProduct/>} />

        <Route path='/admin-panel' element={<AdminPanel/>} >
        <Route path='all-users'element={<Allusers/>}  />
        <Route path='products'element={<Products/>} />
        </Route>

        <Route path='product-category' element={<CategoryProduct/>} />
        <Route path='product/:id' element={<ProductDetails />} />
        <Route path='cart' element={<Cart/>} />

        <Route path='*' element={<div>Route not Found, current route: {window.location.pathname}</div>} />
        
      </Routes>

            <main className='min-h-[calc(18vh-100px)] '>

      <Outlet/>
    </main>
             <Footer/>

     </Context.Provider>
    </>
  )
}

export default App
