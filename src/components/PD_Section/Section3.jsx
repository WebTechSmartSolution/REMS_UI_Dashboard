import React, { useState } from "react";
import "../style/PD_Section.css";

const Section3 = ({ listing }) => {
  const [mainImage, setMainImage] = useState(`http://localhost:5000${
    listing.images?.[0]?.path || "/src/assets/rental1.jpeg"
  }`); // Default to the first image
  // console.log(listing,mainImage);
  const amenitiesList = [
    "Air Conditioning",
    "Swimming Pools",
    "Gym",
    "Landscaped Gardens",
    "Open Spaces",
    "Spa",
    "Billiards Table",
    "Surveillance Cameras"
  ];

  // Function to update the main image

  // const thumbnails = [thumb1, thumb2, thumb3, thumb4];
  const handleImageClick = (thumbnail) => {
    setMainImage(thumbnail);
  };

  return (
    <>
      {/* Main section */}
      <section className="Main-section">
        <div className="images-section">
          <h3 className="section-title">Property Images</h3>
          {/* Main Image */}
          <div className="main-image-container">
            <img
              id="mainImage"
              src={mainImage}
              alt="Main Property"
              className="main-image"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="thumbnail-images">
            {listing?.images?.map((image, index) => (
              <img
              key={index}
              src={`http://localhost:5000${image?.path || "/src/assets/rental1.jpeg"}`}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleImageClick(image?.path ? `http://localhost:5000${image.path}` : "/src/assets/rental1.jpeg")}
              className={`thumbnail ${`http://localhost:5000${image?.path || "/src/assets/rental1.jpeg"}` === mainImage ? "active-thumbnail" : ""}`}
            />
            ))}
          </div>
        </div>

        {/* Overview */}
        <div className="overview-section">
          <h3>Overview</h3>
          <p className="property-description">{listing?.description || "No description available"}</p>
          <ul className="property-features">
            <li>
              <i className="fas fa-bed"></i>Bedrooms: {listing?.noOfBedrooms  || 0} 
            </li>
            <li>
              <i className="fas fa-bath"></i>Bathrooms: {listing?.noOfBathrooms || 0}
            </li>
            <li>
              <i className="fas fa-car"></i>Garage: {listing?.garageSize || "N/A"} 
            </li>
            {/* <li>
              <i className="fas fa-tree"></i> {listing?.view || "No specific view"}
            </li>
            <li>
              <i className="fas fa-bus"></i> {listing?.nearbyTransport ? "Near Public Transport" : "No nearby transport"}
            </li> */}
          </ul>
        </div>

        {/* Property Address */}
        <div className="property-address">
          <h3>Property Address</h3>
          <div className="address-details">
            <div className="address-item">
              <span className="label">Address:</span>
              <span className="value">{listing?.address || "N/A"}</span>
            </div>
            <div className="address-item">
              <span className="label">City:</span>
              <span className="value">{listing?.city || "N/A"}</span>
            </div>
            <div className="address-item">
              <span className="label">State/County:</span>
              <span className="value">{listing?.state || "N/A"}</span>
            </div>
            <div className="address-item">
              <span className="label">Country:</span>
              <span className="value">{listing?.country || "Pakistan"}</span>
            </div>
            <div className="address-item">
              <span className="label">Zip:</span>
              <span className="value">{listing?.zip || "06001"}</span>
            </div>
            {/* <div className="address-item">
              <span className="label">Area:</span>
              <span className="value">{listing?.sqft || "N/A"}</span>
            </div> */}
          </div>
        </div>

        {/* Property Details */}
        <div className="property-details1">
          <h3>Property Details</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Property Name:</span>
              <span className="detail-value">{listing?.propertyName || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Price:</span>
              <span className="detail-value">${listing?.salePrice || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Size:</span>
              <span className="detail-value">{listing?.sqft || "N/A"} SqFt</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Rooms:</span>
              <span className="detail-value">{listing?.noOfBedrooms || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Year Built:</span>
              <span className="detail-value">{listing?.yearConstructed || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Available From:</span>
              <span className="detail-value">{listing?.createdAt || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Floors:</span>
              <span className="detail-value">{listing?.noOfFloors || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Garage Size:</span>
              <span className="detail-value">{listing?.garageSize || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="amenities">
      <h3>Amenities</h3>
      <div className="amenities-grid">
        {amenitiesList.map((amenity, index) => (
          <div key={index} className="amenity-item">
            {amenity}
          </div>
        ))}
      </div>
    </div>

      </section>
    </>
  );
};

export default Section3;
