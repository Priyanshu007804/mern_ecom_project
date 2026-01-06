import SummaryApi from "../common"

const fetchCategoryWiseProduct = async (category)=>{
    const response= await fetch(SummaryApi.catergoryWiseProduct.url,{
        method: SummaryApi.catergoryWiseProduct.method,
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            category: category
        })
    })

    const dataResponse= await response.json()

    return dataResponse;
}

export default fetchCategoryWiseProduct