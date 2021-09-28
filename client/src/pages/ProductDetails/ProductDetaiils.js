import { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import axios from "axios";

import Header from "../../componets/Header/Header";

import "./ProductDetaiils.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class ProductItemDetails extends Component {
  state = {
    productData: {},
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  };

  componentDidMount() {
    this.getProductData();
  }

  getProductData = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    try {
      const jwtToken = Cookies.get("jwt_token");
      const { data } = await axios.get(
        `${process.env.BASE_URL}api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const { product } = data;
      this.setState({
        productData: product,
        apiStatus: apiStatusConstants.success,
      });
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  onDecrementQuantity = () => {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
    }
  };

  onIncrementQuantity = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  renderProductDetailsView = () => {
    const { productData, quantity } = this.state;
    const { name, description, imageUrl, price, countInStock } = productData;

    const availability = countInStock > 0 ? true : false;

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{name}</h1>
            <p className="price-details">Rs {price}/-</p>
            <p className="product-description">{description}</p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              {availability ? (
                <p className="value">In Stock</p>
              ) : (
                <p className="value">Out of Stock</p>
              )}
            </div>
            {availability ? (
              <>
                <div className="label-value-container">
                  <p className="label">Stock:</p>
                  <p className="value">{countInStock}</p>
                </div>
                <hr className="horizontal-line" />
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecrementQuantity}
                    testid="minus"
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncrementQuantity}
                    testid="plus"
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <Link to="/cart">
                  
                <button type="button" className="button add-to-cart-btn">
                  ADD TO CART
                </button>
                </Link>
                <Link to="/">
                  <button type="button" className="button back-to-shop">
                    Continue Shopping
                  </button>
                </Link>
              </>
            ) : (
              <Link to="/">
                <button type="button" className="button back-to-shop">
                  Continue Shopping
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  };

  renderProductDetails = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    );
  }
}

export default ProductItemDetails;
