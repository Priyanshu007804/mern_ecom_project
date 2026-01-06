const imgToBase64 = async (img)=>{
    const reader= new FileReader();
    reader.readAsDataURL(img);

    const data= await new Promise((res,rej)=>{
        reader.onload = ()=> res(reader.result)
        reader.onerror =(err)=> rej(err)
    })
    return data;
}
export default imgToBase64;