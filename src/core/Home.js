import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import menuLayout from "./menuLayout";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { Carousel } from "react";
import Testimonial from "./testimonial";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <menuLayout>
      <Menu />
      <div className="card card-image im1">
        <div className="text text-center py-5 px-4">
          <div className="py-5">
            <h1 className="card-title h1 mb-4 py-2">Welcome to MedShop</h1>
            <h2 className="mb-4 pb-3 px-md-5 mx-md-5">
              We provide everything you need for your health without leaving
              your home.
            </h2>

            <a className="btn peach-gradient">
              <Link to="/shop">
                <button className="btn btn-success align-center">
                  SHOP NOW
                </button>
              </Link>
            </a>
          </div>
        </div>
      </div>

      <Search />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row text-center">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row text-center">
        {productsBySell.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
      <Testimonial />
    </menuLayout>
  );
};

export default Home;
