import { toast } from "react-toastify"
import SummaryApi from "../common"
import { useContext } from "react"
import Context from "../context"

const addtoCart = async (e,id)=>{
    e?.stopPropagation()
    e?.preventDefault()

    const response =await fetch(SummaryApi.addToCartProduct.url,{
        method: SummaryApi.addToCartProduct.method,
        credentials: "include",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(
        {productId: id}
        )
    })
    const dataResponse = await response.json()
    if(dataResponse.success){
        toast.success(dataResponse.message)

    } 
    if(dataResponse.error){
        toast.error(dataResponse.message)
    }
    return dataResponse
}

export default addtoCart