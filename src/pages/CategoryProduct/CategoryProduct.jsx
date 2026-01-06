import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../../helpers/productCategory';
import CategoryWiseProductDisplay from '../../components/CategoryWiseProductDisplay/CategoryWiseProductDisplay';
import VerticalProductCard from '../../components/VerticalProductCardForSearch/VerticalProductCard';
import SummaryApi from '../../common';

const CategoryProduct = () => {
  const params= useParams();
  const [data,setData]= useState([])

  const [loading,setLoading]= useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const URLsearch = new URLSearchParams(location.search)
  const UrlCategoryListinArray = URLsearch.getAll("category")
  const [sortBy,setSortBy]= useState("")

  const urlCategoryListObject = {}

  UrlCategoryListinArray.forEach(el =>{
    urlCategoryListObject[el] = true
  })

  const [selectCategory, setSelectCategory]= useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])
  const fetchData= async()=>{
    const response = await fetch(SummaryApi.filteredProducts.url,{
      method:SummaryApi.filteredProducts.method,
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    })

    const dataResponse = await response.json()
    setData(dataResponse.data || [])
  }

  const handleSelectCategory = (e)=>{
    const {name,value, checked}= e.target

    setSelectCategory((prev)=>{
      return{
        ...prev,
        [value]: checked
      }
    })
  }

  const handleOnChangeSortBy = (e)=>{
    const {value} = e.target
    setSortBy(value)
    if(value === 'asc'){
      setData(prev=> prev.sort((a,b)=>a.sellingPrice-b.sellingPrice))
    }
    if(value === 'dsc'){
      setData(prev=> prev.sort((a,b)=>b.sellingPrice-a.sellingPrice))
    }
  }
  useEffect(()=>{

  },[sortBy])
 


  useEffect(()=>{
    fetchData()
  },[filterCategoryList])
  useEffect(()=>{
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName=>{
      if(selectCategory[categoryKeyName]){
        return categoryKeyName
      }
      return null
       
    }).filter(el => el)

    setFilterCategoryList(arrayOfCategory)

    // format for url change when change on the checkbox
    const urlFormat =arrayOfCategory.map((el,index)=>{
      if((arrayOfCategory.length - 1) === index){
        return `category=${el}`
      }
      return `category=${el}&&`
    })
    navigate("/product-category?"+urlFormat.join(""))
  },[selectCategory])

//       {params?.categoryName}

  return (
    <div className='container mx-auto p-4 pt-16'>
      {/* Desktop version */}
      <div className=' lg:grid grid-cols-[240px_1fr] gap-4'>
        {/* Left Side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/* Sort By  */}
            <div className='mb-6'>
              <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300 mb-3'>Sort by</h3>
              <form className='text-sm flex flex-col gap-2 py-2'>
                <div className='flex items-center gap-3'>
                  <input type='radio' name='sortBy' value={"asc"} checked={sortBy === "asc"} onChange={handleOnChangeSortBy}/>
                  <label>Price - Low to High</label>
                </div>

                 <div className='flex items-center gap-3'>
                  <input type='radio' name='sortBy' value={"dsc"} checked={sortBy === "dsc"} onChange={handleOnChangeSortBy} />
                  <label>Price - High to Low</label>
                </div>
              </form>
            </div>

            {/* Filter By  */}
            <div className=''>
              <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300'>Category</h3>
              <form className='text-sm flex flex-col gap-2 py-2'>
                {
                  productCategory.map((categoryName, index)=>{
                    return(
                      <div className='flex items-center gap-3' key={categoryName.id+index}>
                        <input type='checkbox' checked={selectCategory[categoryName?.value]} name={"category"} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>                      
                        </div>
                    )
                  })
                }
              </form>
            </div>

            
        </div> 
        {/* Right Side */}
        <div className='p-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>
            Search Results: {data.length}
          </p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'> 
                {
                  data.length!==0 &&  (
                    <VerticalProductCard data={data} loading={loading} />

                  )
                }
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default CategoryProduct


