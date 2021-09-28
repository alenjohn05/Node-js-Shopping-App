import { Component } from "react";
import Loader from "react-loader-spinner";
import Cookies from "js-cookie";
import axios from "axios";
import dotenv from 'dotenv'
import Header from "../../componets/Header/Header";
import Hero from "../../componets/Hero/Hero";
import ProductCard from "../../componets/ProductCard/ProductCard";
import "./HomePage.css";
dotenv.config()

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

export default class HomePage extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    try {
      const jwtToken = Cookies.get("jwt_token");
      const { data } = await axios.get(`${process.env.BASE_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const { products } = data;
      this.setState({
        productsList: products,
        apiStatus: apiStatusConstants.success,
      });
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  renderProductsListView = () => {
    const { productsList } = this.state;
    const shouldShowProductsList = productsList.length > 0;
    console.log(productsList);

    return shouldShowProductsList ? (
      <>
        <Hero />
        <div className="home-product-container">
          <h1 className="home-product-list-heading">Products</h1>
          <ul className="home-product-list ">
            {productsList.map((product) => (
              <ProductCard productData={product} key={product._id} />
            ))}
          </ul>
        </div>
      </>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    );
  };

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderAllProducts = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView();
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
      <div>
        <Header />
        {this.renderAllProducts()}
      </div>
    );
  }
}
