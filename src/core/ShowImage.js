import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div className="product-img text-center">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3"
      style={{ maxHeight: "400px", maxWidth: "400px" }}
    />
  </div>
);

export default ShowImage;
