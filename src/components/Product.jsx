import './Product.css';
import {products} from "./Data.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState,useContext} from "react"
import {
  faStar as faSolidStar,
  faStarHalfAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import {useNavigate} from "react-router-dom"
import Mycontext from '../Mycontext.jsx';
import EmptyDataPage from "./EmptyDataPage.jsx";

function Product() {
  const {productsData,cartData,setCartData} =useContext(Mycontext)
  const [filterResult,setFilterResult]=useState(productsData)
  const [filterTotalItem,setFilterTotalItem]=useState(productsData)
  const [receivedFilterData, setReceivedFilterData] = useState({ clickInput: "", categories: "all"

  })
  const [checkBoxCategories, setCheckBoxCategories] = useState([])
  const { clickInput, categories } = receivedFilterData
  const [pageNo, setPageNo] = useState(1)
  const productPerPage = 12
  const page = Math.ceil(filterTotalItem.length / productPerPage)
  const firstPaginationValue = (pageNo * productPerPage - productPerPage)
  const LastPaginationValue = (pageNo * productPerPage)
  const navigate=useNavigate()
 
  localStorage.setItem("cartData",JSON.stringify(cartData))


  const handleCartData=(e,data)=>{
    e.stopPropagation()
    const removeExistingProduct = cartData.filter(item => item._id != data._id);
  setCartData([...removeExistingProduct,{...data,productQuantity:1,cartTotal:data.price-data.discount,size:data.sizes[0]}])
  }

  useEffect(() => {
    const handleChange = () => {
      const rawData = localStorage.getItem("transferfilterData");
      const parsed = rawData ? JSON.parse(rawData) : { clickInput: "", categories: "all"};
      const {inputData}=parsed
      setReceivedFilterData(parsed);
    };

    window.addEventListener("filterDataChanged", handleChange);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("filterDataChanged", handleChange);
    };
  }, []);

  const handleCheckBoxCategories = (e, value) => {
    if (!checkBoxCategories.includes(value) && e.target.checked) {
      setCheckBoxCategories([...checkBoxCategories, value])
    }
    else {
      setCheckBoxCategories(checkBoxCategories.filter((val) => val != value))
    }
  }

  useEffect(() => {
    const filterNav2Category = productsData.filter((obj) => {
      const nav2CategoryFilter = categories == obj.category?.toLowerCase() || categories == "all"
      return nav2CategoryFilter
    })
   
    const filter = filterNav2Category.filter((obj) => {
      const inputFilter = obj.productName?.toLowerCase().includes(clickInput?.toLowerCase()) || obj.description?.toLowerCase().includes(clickInput?.toLowerCase())
      const categoryFilter = checkBoxCategories.includes(obj.brand?.toLowerCase()) || checkBoxCategories.includes(obj.color?.toLowerCase()) || checkBoxCategories.length == 0
      const amountFilter = (checkBoxCategories.includes("under ₹3000") && obj.price < 3000) ||
        (checkBoxCategories.includes("₹1000 to ₹1500") && (obj.price-obj.discount < 1500 && obj.price-obj.discount >= 1000)) ||
        (checkBoxCategories.includes("₹1500 to ₹2000") && (obj.price-obj.discount < 2000 && obj.price-obj.discount >= 1500)) ||
        (checkBoxCategories.includes("₹2000 to ₹2500") && (obj.price-obj.discount < 2500 && obj.price-obj.discount >= 2000)) ||
        (checkBoxCategories.includes("₹2500 to ₹3000") && (obj.price-obj.discount < 3000 && obj.price-obj.discount >= 2500)) ||
        (checkBoxCategories.includes("₹3000 to ₹3500") && (obj.price-obj.discount < 3500 && obj.price-obj.discount >= 3000))
      return (categoryFilter || amountFilter) && inputFilter
    })
    setFilterTotalItem(filter)
    setFilterResult(filter.slice(firstPaginationValue,LastPaginationValue))
  }, [checkBoxCategories, receivedFilterData,pageNo,productsData])

useEffect(()=>{
setPageNo(1)
},[checkBoxCategories, receivedFilterData])

  return (
    <>
      <div className="main-container">
        <div className="sidebar">
          <h4>Brand</h4>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "zara")}
              id="brand-zara"
              checked={checkBoxCategories.includes("zara")}
            />
            <label htmlFor="brand-zara">Zara</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "h&m")}
              id="brand-hm"
              checked={checkBoxCategories.includes("h&m")}
            />
            <label htmlFor="brand-hm">H&M</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "nike")}
              id="brand-nike"
              checked={checkBoxCategories.includes("nike")}
            />
            <label htmlFor="brand-nike">Nike</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "adidas")}
              id="brand-adidas"
              checked={checkBoxCategories.includes("adidas")}
            />
            <label htmlFor="brand-adidas">Adidas</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "levi`s")}
              id="brand-levis"
              checked={checkBoxCategories.includes("levi`s")}
            />
            <label htmlFor="brand-levis">Levi’s</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "gucci")}
              id="brand-gucci"
              checked={checkBoxCategories.includes("gucci")}
            />
            <label htmlFor="brand-gucci">Gucci</label>
          </p>

          <h4>Price</h4>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "under ₹3000")}
              id="price-under-3000"
              checked={checkBoxCategories.includes("under ₹3000")}
            />
            <label htmlFor="price-under-3000">Under ₹3000</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "₹1000 to ₹1500")}
              id="price-1000-1500"
              checked={checkBoxCategories.includes("₹1000 to ₹1500")}
            />
            <label htmlFor="price-1000-1500">₹1000 to ₹1500</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "₹1500 to ₹2000")}
              id="price-1500-2000"
              checked={checkBoxCategories.includes("₹1500 to ₹2000")}
            />
            <label htmlFor="price-1500-2000">₹1500 to ₹2000</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "₹2000 to ₹2500")}
              id="price-2000-2500"
              checked={checkBoxCategories.includes("₹2000 to ₹2500")}
            />
            <label htmlFor="price-2000-2500">₹2000 to ₹2500</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "₹2500 to ₹3000")}
              id="price-2500-3000"
              checked={checkBoxCategories.includes("₹2500 to ₹3000")}
            />
            <label htmlFor="price-2500-3000">₹2500 to ₹3000</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "₹3000 to ₹3500")}
              id="price-3000-3500"
              checked={checkBoxCategories.includes("₹3000 to ₹3500")}
            />
            <label htmlFor="price-3000-3500">₹3000 to ₹3500</label>
          </p>

          <h4>Color</h4>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "black")}
              id="color-black"
              checked={checkBoxCategories.includes("black")}
            />
            <label htmlFor="color-black">Black</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "red")}
              id="color-red"
              checked={checkBoxCategories.includes("red")}
            />
            <label htmlFor="color-red">Red</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "blue")}
              id="color-blue"
              checked={checkBoxCategories.includes("blue")}
            />
            <label htmlFor="color-blue">Blue</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "green")}
              id="color-green"
              checked={checkBoxCategories.includes("green")}
            />
            <label htmlFor="color-green">Green</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "white")}
              id="color-white"
              checked={checkBoxCategories.includes("white")}
            />
            <label htmlFor="color-white">White</label>
          </p>
          <p>
            <input
              type="checkbox"
              onChange={(e) => handleCheckBoxCategories(e, "brown")}
              id="color-brown"
              checked={checkBoxCategories.includes("brown")}
            />
            <label htmlFor="color-brown">brown</label>
          </p>
        </div>
        <div className="products-grid">
          {filterResult.map((product, i) => {
            const rating = product.userReviews?.length
              ? product.userReviews.map(v => v.star).reduce((x, y) => x + y, 0) / product.userReviews.length
              : 0;

            const fullStar = Math.floor(rating)
            const halfStar = rating - fullStar >= 0.5 ? 1 : 0;
            const emptyStar = 5 - fullStar - halfStar;
            const sendData=()=>{
               navigate("/singleProduct")
               localStorage.setItem("data",JSON.stringify(product))
               }
               
            return (
              <div className="product-card" key={i} onClick={sendData}>
                <div className="product-image">
                  <img src={`${product.img}`} alt={product.productName} />
                </div>
                <h3 className="product-name">{product.productName}</h3>
                <div className="starContainer" style={{ margin: "0px 10px 0px 20px", fontSize: "18px" }}>

                  {
                    Array.from({ length: fullStar }, (_, i) => {
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
                  <span style={{fontSize:"14px",color:"#94A3B8",marginLeft:"5px"}}>({product.userReviews.length})</span>
                </div>
                <p className="product-detail" style={{overflow:"hidden",height:"55px"}} >{product.description}</p>
  
                <div className='productsPrice'>
                  <span style={{fontSize:"19px",fontWeight:"700"}}>{`₹${product.price-product.discount}`}</span>
                  
                  {
                    product.discount>0&&
                    <>
                    <span style={{fontSize:"15px",textDecoration:"line-through"}}>{`₹${product.discount}`}</span>
                    <span style={{fontSize:"15px",color:"#108981",fontWeight:"700"}}>{Math.round(((product.discount/product.price)*100))}% OFF</span>
                    </>
                  }

                  </div>
                <div className="product-actions">
                  <button className="add-to-cart" onClick={(e)=>handleCartData(e,product)}>Add to Cart</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='paginationContainer'>
        <button disabled={pageNo == 1} onClick={() => setPageNo(pageNo - 1)}><FontAwesomeIcon icon={faChevronLeft} className='chevron' /></button>
        {
          Array.from({ length: page }, (_, i) => {
            return <h3 onClick={() => setPageNo(i + 1)} key={i} style={{ background: pageNo == i + 1 && "black", color: pageNo == i + 1 && "white", cursor: "pointer", display: (i + 1 + 4 <= pageNo || (i + 1 > 4 && i + 1 > pageNo)) && "none" }}>{i + 1}</h3>
          })
        }
        <button disabled={pageNo == page} onClick={() => setPageNo(pageNo + 1)}><FontAwesomeIcon icon={faChevronRight} className='chevron' /></button>
      </div>
    </>
  );
}

export default Product;
