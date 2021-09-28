import { Link } from "react-router-dom";

import "./ProductCard.css";

const ProductCard = (props) => {
  const { productData } = props;
  const { countInStock, name, imageUrl, price, _id } = productData;
  console.log(_id)
  return (
    <Link to={`/products/${_id}`} className="link-item">
      <li className="product-item">
        <img src={imageUrl} alt="product" className="thumbnail" />
        <h1 className="title">{name}</h1>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            {countInStock > 0 ? (
              <div className="rating-div">
                <p className="rating">{countInStock}</p>
                <p className="content">On Stock</p>
              </div>
            ) : (
              <p className="content">No Stock</p>
            )}
          </div>
        </div>
      </li>
    </Link>
  );
};
export default ProductCard;
