import React, { useContext } from "react";
import "./AdminList.css";
import Mycontext from '../Mycontext.jsx';
import "../components/Dashboard.css";
import Sidebar from "./Sidebar";

const AdminList = () => {
  const { productsData } = useContext(Mycontext);
  
  return (
    <div className="app-container">
      <Sidebar />
      <div className="admin-list-container">
        <h2>Product List</h2>
        <div className="admin-table-wrapper">
          <table className="admin-table">
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
                <th>Rating</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Color</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product, idx) => {
                const rating = product.userReviews?.length
                  ? product.userReviews.map(v => v.star).reduce((x, y) => x + y, 0) / product.userReviews.length
                  : 0;
                
                // Format date
                const date = new Date(product.updatedAt || product.createdAt);
                const day = date.getDate().toString().padStart(2, '0');
                const month = date.toLocaleString('default', { month: 'long' });
                const year = date.getFullYear();
                const formatted = `${day} ${month} ${year}`;
                
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <img
                        src={`${product.img}`}
                        alt={product.productName}
                        className="admin-product-img"
                      />
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.description}</td>
                    <td>{product.brand}</td>
                    <td>₹{product.price}</td>
                    <td>₹{product.discount}</td>
                    <td>₹{product.price - product.discount}</td>
                    <td>{rating ? rating.toFixed(1) : 0}</td>
                    <td>{product.category}</td>
                    <td>{product.subCategory}</td>
                    <td>{product.color}</td>
                    <td>{formatted}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminList;