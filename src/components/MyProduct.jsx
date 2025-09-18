import {useContext, useState} from "react";
import "./MyProduct.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faTrash } from '@fortawesome/free-solid-svg-icons';
import Mycontext from '../Mycontext.jsx';
import EmptyDataPage from "./EmptyDataPage.jsx";
import Confirm from "./Confirm.jsx"
import {toastError,toastSuccess} from "../Utils.jsx"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import BlackLoader from "../components/BlackLoader.jsx"

const products = [
  {
    name: "Arctic Shield Jacket",
    image: "https://via.placeholder.com/60?text=Jacket",
    price: "500/-",
    rating: 0,
    category: "jacket",
    stock: 90,
    date: "12/29/2024"
  },
  {
    name: "Stylish Wrap Shirt",
    image: "https://via.placeholder.com/60?text=Shirt",
    price: "800/-",
    rating: 5,
    category: "tops",
    stock: 99,
    date: "12/29/2024"
  },
  {
    name: "Modern Mini Satchel",
    image: "https://via.placeholder.com/60?text=Bag",
    price: "900/-",
    rating: 0,
    category: "bag",
    stock: 67,
    date: "12/29/2024"
  },
  {
    name: "Elegant Gold Ring",
    image: "https://via.placeholder.com/60?text=Ring",
    price: "5000/-",
    rating: 0,
    category: "ring",
    stock: 45,
    date: "12/29/2024"
  },
  {
    name: "Luxury Automatic Watch",
    image: "https://via.placeholder.com/60?text=Watch",
    price: "3000/-",
    rating: 0,
    category: "watch",
    stock: 67,
    date: "12/29/2024"
  },
  {
    name: "Crunchy Almond Biscotti",
    image: "https://via.placeholder.com/60?text=Cookie",
    price: "450/-",
    rating: 0,
    category: "cookies",
    stock: 89,
    date: "12/29/2024"
  }
];



function MyProduct() {
const navigate=useNavigate()  
const [loading, setLoading] = useState(false)
const {productsData,myProductsData,fetchMyProduct} =useContext(Mycontext)
const [isPopupOpen,setIsPopupOpen]=useState(false)
const [deleteId,setdeleteId]=useState(null)
const [imgPath,setImgPath]=useState(null)

const handleDeleteProduct=(id,imgPath)=>{
  setdeleteId(id)
  setImgPath(imgPath)
  setIsPopupOpen(!isPopupOpen)
}

const handleDeleteCancel=()=>{
  console.log("cancel")
  setIsPopupOpen(!isPopupOpen)
}

const handleDeleteConfirm=async()=>{
  setLoading(true)
  try {
    const data = await fetch(`${import.meta.env.VITE_NODEJS_URL}/deleteProduct`, {
      method: "post",
      credentials:"include",
      body: JSON.stringify({"productId":deleteId,imgPath}),
      headers:{"content-type":"application/json"}
    }).then((x) => x.json());

    if (!data.success && !toast.isActive("alreadyShow")) {
      setLoading(false)
      setdeleteId(null)
      setImgPath(null)
      toastError(data.message, { toastId: "alreadyShow" });
    } 
    else if (data.success) {
      setLoading(false)
      setdeleteId(null)
      setImgPath(null)
      fetchMyProduct()
      toastSuccess(data.message);
    }
  } catch (error) {
    setLoading(false)
    if (!toast.isActive("alreadyShow")) {
      setdeleteId(null)
      setImgPath(null)
      toastError("server error", { toastId: "alreadyShow" });
    }
  }
  setdeleteId(null)
  setIsPopupOpen(!isPopupOpen)
}

const handleUpdateProduct=(product)=>{
  localStorage.setItem("updateProductData",JSON.stringify(product))
  navigate("/updateProduct")
}
  if(loading){
  return(
    <BlackLoader/>
  )
}

  return (
    <div className="product-wrapper">
      {
        isPopupOpen&&<Confirm isPopupOpen={true} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} smallMsg="delete" largeMsg="Delete"/>
      }
      {
      myProductsData.length==0?<EmptyDataPage msg="Your Product list is empty." btnMsg="Add Products" path="/addProduct"/>:
      <>
      <div className="product-container">
        <h2>Products</h2>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Discription</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Final Price</th>
                <th>Ratings</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Color</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myProductsData.map((p, index) => {
                const rating = p.userReviews?.length
              ? p.userReviews.map(v => v.star).reduce((x, y) => x + y, 0) / p.userReviews.length
              : 0;

              const date = new Date(p.updatedAt);
              const day = date.getDate().toString().padStart(2, '0');
              const month = date.toLocaleString('default', { month: 'long' });
              const year = date.getFullYear();
              const formatted = `${day} ${month} ${year}`;
              
                return(
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`${p.img}`}
                      alt="product"
                      className="product-img"
                    />
                  </td>
                  <td>{p.productName}</td>
                  <td>{p.description}</td>
                  <td>{p.brand}</td>
                  <td>{`₹${p.price}`}</td>
                  <td>{`₹${p.discount}`}</td>
                  <td>₹{p.price - p.discount}</td>
                  <td>{rating?rating.toFixed(1):0}</td>
                  <td>{p.category}</td>
                  <td>{p.subCategory}</td>
                  <td>{p.color}</td>
                  <td style={{width:"110px"}}>{formatted}</td>
                  <td>
                    <i className="fas fa-edit action-btn edit-btn" onClick={()=>handleUpdateProduct(p)}><FontAwesomeIcon icon={faPen} /></i>
                    <i className="fas fa-trash action-btn delete-btn"><FontAwesomeIcon icon={faTrash} onClick={()=>handleDeleteProduct(p._id,p.cloudinaryId)} /></i>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
</>
}

    </div>
  );
}

export default MyProduct;
