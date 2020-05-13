import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3"
      style={{ maxHeight: "75%", maxWidth: "75%" }}
    />
  </div>
);

export default ShowImage;
