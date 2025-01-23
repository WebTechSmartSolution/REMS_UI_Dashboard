import React from "react";
import "../style/PD_Section.css";

function Common({ listing }) {
  return (
    <>
      <div className="Heading">
        <h2>Property Details</h2>
        <p>Pick The Best You Want.</p>
      </div>
      <div className="property-details">
        <div className="property-header">
          <span className="property-type1">{listing?.propertyType || "Type"}</span>
          <span className="property-type">{listing?.category || "Apartment"}</span>

          <h1>{listing?.propertyName || "Property Title"}</h1>
          <div className="property-status">
            <span className="property-price">${listing?.salePrice || "N/A"}</span>
            <span className="last-updated">
              Last Updated on: {listing?.createdAt || "N/A"}
            </span>
          </div>
          <div className="property-buttons">
            <button className="share-btn">
              <i className="fas fa-share"></i> Share
            </button>

            <button className="wishlist-btn">
              <i className="fas fa-heart"></i> Wishlist
            </button>
            <button className="book-btn1">
              <i className="fas fa-calendar-check"></i> Book Property
            </button>
          </div>
        </div>
      </div>
      <div className="hr">
        <hr />
      </div>
    </>
  );
}

export default Common;
