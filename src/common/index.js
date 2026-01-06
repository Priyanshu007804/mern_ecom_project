const backendDomain = "http://localhost:5000"
 const SummaryApi= {
    signUp:{
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn:{
        url: `${backendDomain}/api/signin`,
        method: 'post'
    },
    current_user:{
        url: `${backendDomain}/api/user-details`,
        method: 'get'
    },
    logout_user:{
        url: `${backendDomain}/api/userLogout`,
        method: 'get'
    },
    allUser:{
        url: `${backendDomain}/api/all-user`,
        method:'get'
    },
    updateUser:{
        url:`${backendDomain}/api/update-user`,
        method: 'post'
    },
    uploadProduct:{
        url:`${backendDomain}/api/upload-product`,
        method: 'post'
    },
    getProduct:{
        url:`${backendDomain}/api/get-product`,
        method:"get"
    },
    updateProduct:{
        url:`${backendDomain}/api/update-product`,
        method: 'post'
    },
    catergoryProduct:{
        url: `${backendDomain}/api/get-categoryProduct`,
        method: 'get'
    },
    catergoryWiseProduct:{
        url: `${backendDomain}/api/category-product`,
        method :'post'
    },
    productDetail: {
        url:`${backendDomain}/api/product-details`,
        method: 'post'
    },
    addToCartProduct:{
        url:`${backendDomain}/api/addtocart`,
        method: 'post'
    },
    addToCartCount:{
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: 'get'
    },
    viewCartProduct:{
        url:`${backendDomain}/api/viewProductsInCart`,
        method: 'get'
    },
    updateAddtoCart:{
        url:`${backendDomain}/api/updateAddtoCart`,
        method: 'post'
    },
    deleteAddToCart:{
        url:`${backendDomain}/api/deleteProduct`,
        method: 'post'
    },
    searchproducts:{
        url: `${backendDomain}/api/search`,
        method: 'get'
    },
    filteredProducts:{
        url:`${backendDomain}/api/filter-product`,
        method: 'post'
    }
}

export default SummaryApi;