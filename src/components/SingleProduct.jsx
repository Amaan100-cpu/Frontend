import './SingleProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar as faSolidStar,
  faStarHalfAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState,useContext } from 'react';
import { toastError,toastSuccess } from '../Utils.jsx';
import {toast} from "react-toastify"
import Mycontext from '../Mycontext.jsx';

function SingleProduct() {
  const {cartData,setCartData} =useContext(Mycontext)
  const [star, setStar] = useState(0);
  const [user, setUser] = useState(0);
  const rating = star / user;
  const fullStar = Math.floor(rating);
  const halfStar = rating - fullStar >= 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStar - halfStar;
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedStar, setSelectedStar] = useState([]);
  const [reviewMsg,setReviewMsg]=useState(null)
  const [data,setData]=useState(JSON.parse(localStorage.getItem("data")))
  const [size,setSize]=useState(data.sizes[0])

localStorage.setItem("cartData",JSON.stringify(cartData))

const handleCartData = () => {
  const removeExistingProduct = cartData.filter(item => item._id != data._id);
  setCartData([...removeExistingProduct,{...data,productQuantity,cartTotal:data.price-data.discount,size}])
};


  useEffect(() => {
    let star = 0;
    let user = 0;
    data.userReviews.map((obj) => {
      star += obj.star;
      user += 1;
    });
    setStar(star);
    setUser(user);
  },[data]);
 

  const handleReview=async(e)=>{
   try{
      e.preventDefault()
    const result1 = await fetch(`${import.meta.env.VITE_NODEJS_URL}/reviews`, {
      method: "post",
      body: JSON.stringify({ selectedStar:selectedStar.length, reviewMsg,productId:data._id}),
      credentials: 'include',
      headers: { "content-type": "application/json" }
    })
      const result=await result1.json()
    

    if (!result.success && !toast.isActive("alreadyShow")) {
      toastError(result.message,{toastId:"alreadyShow"})
      console.log(result.message)
    }
    else if(result.success) {
      setData(result.data)
      setSelectedStar([])
      setReviewMsg(null)
      toastSuccess(result.message,{toastId:"alreadyShow"})
    }
}
catch(err){
  if(!toast.isActive("alreadyShow")){
    console.log(err.message)
    toastError("server error",{toastId:"alreadyShow"})
  }
  
}
  }

  const increase = () => {
    if (productQuantity < 20) {
      setProductQuantity(productQuantity + 1);
    }
  };

  const decrease = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const handleStars = (ind) => {
    if (selectedStar.includes(ind)) {
      setSelectedStar(selectedStar.filter((v) => v != ind));
    } else {
      setSelectedStar([...selectedStar, ind]);
    }
  };
  return (
    <div className="ProductContainer1">
      <div className="ProductContainer">
        <div className="ProductImgContainer">
        <div className="ProductImgContainer2">  
        <img src={`${data?.img}`} />
        </div>
        </div>
        <div className="ProductDetails">
          <h1 style={{fontSize:"35px"}}>{data.productName}</h1>
          <p>{data.description}</p>
          <div className="forinline">
          <h3>₹{data.price-data.discount}</h3>
          <div className="starContainer" style={{margin:"0px 10px 0px 20px", fontSize:"18px" }}>
            {Array.from({ length: fullStar }, (_, i) => {
              return (
                <FontAwesomeIcon
                  icon={faSolidStar}
                  key={i}
                  style={{ color: '#e8bf07' }}
                />
                
              );
              
            })}

            {halfStar >= 0.5 && (
              <FontAwesomeIcon
                icon={faStarHalfAlt}
                style={{ color: '#e8bf07' }}
              />
            )}
            {Array.from({ length: emptyStar }, (_, i) => {
              return (
                <FontAwesomeIcon
                  icon={faRegularStar}
                  key={i}
                  style={{ color: '#e8bf07' }}
                />
              );
            })}
          </div>
          <p style={{fontSize:"15px",color:"gray"}}>({data?.userReviews?.length} Reviews)</p>
          </div>
          <h4 style={{fontSize:"20px",marginLeft:"3px"}}>{Math.round(((data.discount/data.price)*100))}% OFF</h4>
          <p className="quantityBtn" style={{margin:"30px 0px 30px 0px",fontSize:"20px"}}>
            Quantity: <button onClick={decrease}>-</button>
            <input type="text" value={productQuantity} style={{height:"30px",width:"45px"}} readOnly/>
            <button onClick={increase}>+</button>
          </p>
          <div className='sizeContainer' style={{gap:"15px"}}>
          {
            data.sizes.map((v,i)=>{
              return(
                <div className="sBoxLayot" key={i} onClick={()=>setSize(v)} style={{color:size==v&&"white",backgroundColor:size==v&&"#232f3e",border:size==v&&"1px solid black"}}>{v}</div>
              )
            })
          }
          </div>
          <button className="singleProductBtn" onClick={handleCartData} style={{marginTop:"40px"}}>Add to Cart</button>
          <h1>Write a Review</h1>
          <div className="starContainer1" style={{marginBottom:"30px"}}>
            {Array.from({ length: 5 }, (_, i) => {
              return selectedStar.includes(i) ? (
                <FontAwesomeIcon
                  icon={faSolidStar}
                  key={i}
                  style={{ color: '#e8bf07' }}
                  onClick={() => handleStars(i)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faRegularStar}
                  key={i}
                  style={{ color: '#e8bf07' }}
                  onClick={() => handleStars(i)}
                />
              );
            })}
          </div>
          <textarea value={reviewMsg || ""} onChange={(e)=>setReviewMsg(e.target.value)} placeholder="Share your thoughts about this product..." style={{marginBottom:"10px",borderBlockColor:"black"}}/>
          <br />
          <button className="singleProductBtn" onClick={handleReview}>Submit Review</button>
        </div>
      </div>
      <div className="reviewContainer1">
      <h2 style={{marginLeft:"4.4vw",marginBottom:"60px",display:data.userReviews.length==0&&"none"}}>Customer Reviews</h2>
      <div className="reviewContainer">
        
        {
        Array.from({length:data.userReviews.length},(_,i)=>{
          const date = new Date(data.userReviews[i].date);
          const day = date.getDate().toString().padStart(2, '0');
          const month = date.toLocaleString('default', { month: 'short' });
          const year = date.getFullYear();
          const formatted = `${day} ${month} ${year}`;
          return(
            <div className="comments" key={i}>
          <div className="comment">
            <div className="emailDate" style={{marginBottom:"8px"}}>
              <p style={{marginRight:"20px"}}>{data.userReviews[i].email}</p>
              <p>{formatted}</p>
            </div>
            <div className="starContainer">
              {
                Array.from({length:data.userReviews[i].star},(_,i)=>{
                  return(
                    <FontAwesomeIcon
                    icon={faSolidStar}
                    key={i}
                    style={{ color: '#e8bf07' }}
                  />
                  )
                })
              }
              {
                Array.from({length:5-data.userReviews[i].star},(_,i)=>{
                  return(
                    <FontAwesomeIcon
                  icon={faRegularStar}
                  key={i}
                  style={{ color: '#e8bf07' }}
                />
                  )
                })
              }
            </div>
            <p className='commsg'>{data?.userReviews[i]?.reviewMsg?.toLowerCase()}</p>
          </div>
        </div>
          )
        })
        }
      </div>
      </div>
    </div>
  );
}

export default SingleProduct;
