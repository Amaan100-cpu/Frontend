import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from "react-toastify"
import { toastError, toastSuccess } from "../Utils.jsx"
import "./AddProduct.css"
import { useLocation } from 'react-router-dom'
import {colorData,categoryData,subCategoryData} from "./Data.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import BlackLoader from "../components/BlackLoader.jsx"

const AddProduct = () => {

  const location = useLocation();
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState()
  const [productData, setProductData] = useState({
    productName: "", description: "", category: "Men",
    subCategory: "T-Shirts", price: "", color: "White", discount: "", brand: ""
  })
  const allSizes = {
  men: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  boys: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y', '7-8Y', '8-9Y', '9-10Y', '10-11Y', '11-12Y'],
  babies: ['Newborn', '0-3M', '3-6M', '6-9M', '9-12M', '12-18M', '18-24M']
};
  const [sizes, setSizes] = useState([])

  const handleSizes = (size) => {
   if(!sizes.includes(size)){
    setSizes([...sizes,size])
   }
   else{
    setSizes(sizes.filter((v)=>v!=size))
   }
  }

  const sendFile = async (e) => {
  e.preventDefault();
  setLoading(true)
  
  const { productName, description, category, subCategory, price, color, brand, discount } = productData;
  const formData = new FormData();
  formData.append("img", file);
  formData.append("imgName", file?.name);
  formData.append("productName", productName);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("subCategory", subCategory);
  formData.append("price", price);
  formData.append("color", color);
  formData.append("sizes", JSON.stringify(sizes));
  formData.append("brand", brand);
  formData.append("discount",discount);

  try {
    const data = await fetch(`${import.meta.env.VITE_NODEJS_URL}/product/post`, {
      method: "POST",
      credentials:"include",
      body: formData,
    }).then((x) => x.json());

    if (!data.success && !toast.isActive("alreadyShow")) {
      setLoading(false)
      toastError(data.message, { toastId: "alreadyShow" });
    } else if (data.success && !toast.isActive("alreadyShow")) {
      setLoading(false)
      setFile("")
      setSizes([])
      setProductData({
    productName: "", description: "", category: "Men",
    subCategory: "T-Shirts", price: "", color: "White", discount: "", brand: ""
  })
      toastSuccess(data.message, { toastId: "alreadyShow" });
    }
  } catch (error) {
    setLoading(false)
    if (!toast.isActive("alreadyShow")) {
      toastError("server error", { toastId: "alreadyShow" });
    }
  }
};



  // useEffect(() => {
  //   if (location.state?.toastMessage) {
  //     toastSuccess(location.state.toastMessage);
  //     redirect(location.pathname, {state:{}})
  //   }
  // }, [location]);
if(loading){
  return(
    <BlackLoader/>
  )
}
  return (
    <div className='addProductContainer'>
      <form onSubmit={sendFile} encType="multipart/form-data">
        <h2>Add Product</h2>
        <input name="productName" value={productData.productName} placeholder="productName" onChange={(e) => setProductData({ ...productData, productName: e.target.value })} />
        <textarea name="description" value={productData.description} placeholder="description" onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
        <select name="category" value={productData.category} placeholder="category" onChange={(e) => setProductData({ ...productData, category: e.target.value })} >
          {categoryData.map((v,i)=><option key={i}>{v}</option>)}
        </select>
        <select name="subCategory" value={productData.subCategory} placeholder="subCategory" onChange={(e) => setProductData({ ...productData, subCategory: e.target.value })}>
          {subCategoryData.map((v,i)=><option key={i}>{v}</option>)}
        </select>
        <select name="color" placeholder="color" value={productData.color} onChange={(e) => setProductData({ ...productData, color: e.target.value })} >
          {colorData.map((v,i)=><option key={i}>{v}</option>)}
        </select>
        <input name="brand" value={productData.brand} placeholder="brand" onChange={(e) => setProductData({ ...productData, brand: e.target.value })} />
        <input name="discount" value={productData.discount} placeholder="dicount" onChange={(e) => setProductData({ ...productData, discount: e.target.value })} />
        <input name="price" value={productData.price} placeholder="price" type='number' onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
        <input type="file" name='img' onChange={(e) => setFile(e.target.files[0])} id="abc" style={{display:"none"}} />
        <div className='uploadImgContainer1'>
        <label className='uploadLabel' htmlFor='abc'><FontAwesomeIcon style={{fontSize:"20px",marginRight:"7px"}} icon={faUpload} />Upload File</label>
        <h4 style={{margin:"0px 0px 5px 26px"}}>image</h4> 
        <div className='uploadImgContainer2'>
        <img  src={file && URL.createObjectURL(file)}/>
        <p>{file?.name}</p>
        </div>
        </div>
        <div className='AllSizesContainer'>
        <div className='sizeContainer'>
          Men and Women : 
        {
          allSizes.men.map((size,i) => {
            return (
              
                <div className="sBoxLayot" key={i} onClick={()=>handleSizes(size)} style={{color:sizes.includes(size)&&"white",backgroundColor:sizes.includes(size)&&"#232f3e",border:sizes.includes(size)&&"1px solid black"}}>{size} </div>
            )
          })
        }
         </div>
         <div className='sizeContainer'>
          Boys and Girls : 
        {
          allSizes.boys.map((size,i) => {
            return (
              
                <div className="sBoxLayot" key={i} onClick={()=>handleSizes(size)} style={{color:sizes.includes(size)&&"white",backgroundColor:sizes.includes(size)&&"#232f3e",border:sizes.includes(size)&&"1px solid black"}}>{size} </div>
            )
          })
        }
         </div>

        <div className='sizeContainer'>
          Babies : 
        {
          allSizes.babies.map((size,i) => {
            return (
              
                <div className="sBoxLayot" key={i} onClick={()=>handleSizes(size)} style={{color:sizes.includes(size)&&"white",backgroundColor:sizes.includes(size)&&"#232f3e",border:sizes.includes(size)&&"1px solid black"}}>{size} </div>
            )
          })
        }
         </div>
         </div>
         <button disabled={loading}>Submit</button>
      </form>
    </div>
  )
}

export default AddProduct
