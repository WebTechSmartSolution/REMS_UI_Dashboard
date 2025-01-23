import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../../services/Auth_JwtApi/AuthService";
import "./Style/Section1.css"; // For styling
import PropertyGallery from "./PropertieGallary";
import { notify } from "../../../services/errorHandlingService";

const AddPost = () => {
  const [formData, setFormData] = useState({
    propertyInfo: {
      PropertyName: "",
      PropertyType: "",
      CurrencyType: "",
      salePrice: "",
      offerPrice: "",
      status: "available", 
    },
    propertyDetails: {
      PropertyId: "",
      pricePerSqft: "",
      structureType: "",
      noOfBedrooms: "",
      noOfBathrooms: "",
      sqft: "",
      noOfFloors: "",
      garageSize: "",
      yearConstructed: "",
      Description: "",
    },
    amenities: {
      airConditioning: false,
      lawn: false,
      swimmingPool: false,
      barbecue: false,
      microwave: false,
      tvCable: true,
      dryer: false,
      wifi: true,
    },
    ContactInfo: {
      Email: "",
      Phone: "",
    },
    location: {
      Address: "",
      City: "",
      State: "",
      ZipCode: "",
      mapUrl: "",
    },
    gallery: [],
  });
  
// console.log(formData)
  const [errors, setErrors] = useState({
    propertyInfo: {
      PropertyName: "",
      PropertyType: "",
      CurrencyType: "",
      salePrice: "",
      offerPrice: "",
      status: "available",
    },
    propertyDetails: {
      PropertyId: "",
      pricePerSqft: "",
      structureType: "",
      noOfBedrooms: "",
      noOfBathrooms: "",
      sqft: "",
      noOfFloors: "",
      garageSize: "",
      yearConstructed: "",
      Description: "",
    },
    amenities: {
      airConditioning: false,
      lawn: false,
      swimmingPool: false,
      barbecue: false,
      microwave: false,
      tvCable: true,
      dryer: false,
      wifi: true,
    },
    ContactInfo: {
      Email: "",
      Phone: "",
      
     },
 
    location: {
      Address: "",
      City: "",
      State: "",
      ZipCode: "",
      mapUrl: "",
    },
    gallery: [],

  });


  // Handle input changes
  const handleChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));

    if (value.trim() !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [section]: {
          ...prevErrors[section],
          [key]: false,
        },
      }));
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      propertyInfo: {
        PropertyName: "",
        PropertyType: "buy",
        CurrencyType: "usd",
        salePrice: "",
        offerPrice: "",
        status: "available",
      },
      propertyDetails: {
        PropertyId: "",
        pricePerSqft: "",
        structureType: "apartment",
        noOfBedrooms: "",
        noOfBathrooms: "",
        sqft: "",
        noOfFloors: "",
        garageSize: "",
        yearConstructed: "",
        Description: "",
      },
      amenities: {
        airConditioning: false,
        lawn: false,
        swimmingPool: false,
        barbecue: false,
        microwave: false,
        tvCable: true,
        dryer: false,
        wifi: true,
      },
      ContactInfo: {
        Email: "",
        Phone: "",
       
       },
   

      location: {
        Address: "",
        City: "",
        State: "",
        ZipCode: "",
        mapUrl: "",
      },
      gallery: [],

    });
  };

  const handleSubmit = async () => {
    const newErrors = {
      propertyInfo: {
        PropertyType: !formData.propertyInfo.PropertyType.trim(),
        CurrencyType: !formData.propertyInfo.CurrencyType.trim(),
        offerPrice: !formData.propertyInfo.offerPrice.trim(),
        status: !formData.propertyInfo.status.trim(),
        PropertyName: !formData.propertyInfo.PropertyName.trim(),
        salePrice: !formData.propertyInfo.salePrice.trim(),
      },
      propertyDetails: {
        PropertyId: !formData.propertyDetails.PropertyId.trim(),
        pricePerSqft: !formData.propertyDetails.pricePerSqft.trim(),
        noOfBedrooms: !formData.propertyDetails.noOfBedrooms.trim(),

        noOfBathrooms: !formData.propertyDetails.noOfBathrooms.trim(),
        sqft: !formData.propertyDetails.sqft.trim(),
        noOfFloors: !formData.propertyDetails.noOfFloors.trim(),
        garageSize: !formData.propertyDetails.garageSize.trim(),
        yearConstructed: !formData.propertyDetails.yearConstructed.trim(),
        Description: !formData.propertyDetails.Description.trim(),
      },
      ContactInfo: {
        Email: !formData.ContactInfo.Email.trim(),
        Phone: !formData.ContactInfo.Phone.trim(),
      },
      location: {
        Address: !formData.location.Address.trim(),
        City: !formData.location.City.trim(),
        State: !formData.location.State.trim(),
        ZipCode: !formData.location.ZipCode.trim(),
      },
    };
  
    setErrors(newErrors);
  
    const hasErrors = Object.values(newErrors).some((section) =>
      Object.values(section).some(Boolean)
    );
  
    if (!hasErrors) {
      try {
        const form = new FormData();
        // Flatten the data
        const payload = {
          ...formData.propertyInfo,
          ...formData.propertyDetails,
          ...formData.ContactInfo,
          ...formData.location,
          ...formData.amenities,
        };
      Object.entries(payload).forEach(([key, value]) => {
        form.append(key, value);
      });
  
      // Append image files
      formData.gallery.forEach((file) => {
        form.append("Images", file); // Key name must match backend's expected field
      });
        // console.log("Payload:", payload);
  
        const response = await authService.PostListings(form);
        // console.log("Response:", response);
        notify("success", "Data submitted successfully." + response.message);
        handleReset();
      } catch (error) {
        // console.log(error);
        notify("error", "There was an error submitting the data." + error.message);
      }
    } else {
      notify("error", "Please fill all required fields.");
    }
  };
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="Parent_Main">
        <div className="heading">
          <h1>Add New Property</h1>
          <div className="breadcrumb">
            <Link className="heading-links" to="#">
              Home
            </Link>{" "}
            /{" "}
            <Link className="heading-links" to="#">
              Add New Property
            </Link>
          </div>
        </div>

        <div className="Tab_Container">
          <ul className="tab-links">
            <li onClick={() => scrollToSection("property-info")}>
              Property Information
            </li>
            <li onClick={() => scrollToSection("property-details")}>
              Property Details
            </li>
            <li onClick={() => scrollToSection("amenities")}>Amenities</li>
            <li onClick={() => scrollToSection("gallery")}>Gallery</li>
            <li onClick={() => scrollToSection("ContactInfo")}>Contact Info</li>
            <li onClick={() => scrollToSection("location")}>Location</li>
          </ul>
        </div>

        <div className="property-info-container">
          {/* Property Information Section */}
          <div className="property-info-section" id="property-info">
            <div className="info-description">
              <h3>Property Information</h3>
              <p>
                Provide essential details about the property. These details will
                help potential tenants understand the property’s key features,
                such as its type, location, and the number of rooms available.
              </p>
            </div>

            <div className="info-inputs-container">
              <div className="info-inputs">
                {/* Property Name */}
                <div className="info-form-group">
                  <label>Property Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className={`info-input ${errors.propertyInfo.PropertyName ? "error" : ""
                      }`}
                    value={formData.propertyInfo.PropertyName}
                    onChange={(e) => {
                      console.log("PropertyName onChange event triggered");
                      handleChange("propertyInfo", "PropertyName", e.target.value);
                    }}
                  />
                  {errors.propertyInfo.PropertyName && (
                    <span className="error-message">
                      Property Name is required.
                    </span>
                  )}
                </div>

                {/* Property Type */}
                <div className="info-form-group">
                  <label>Property Type</label>
                  <select
                    className={`info-select ${errors.propertyInfo.PropertyType ? "error" : ""
                      }`}
                    value={formData.propertyInfo.PropertyType || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyInfo",
                        "PropertyType",
                        e.target.value
                      )
                    }
                  >
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>

                {/* Currency Type */}
                <div className="info-form-group">
                  <label>Currency Type</label>
                  <select
                    className={`info-select ${errors.propertyInfo.CurrencyType ? "error" : ""
                      }`}
                    value={formData.propertyInfo.CurrencyType || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyInfo",
                        "CurrencyType",
                        e.target.value
                      )
                    }
                  >
                    <option value="usd">USD</option>
                    <option value="euro">Euro</option>
                  </select>
                </div>

                {/* Sale Price */}
                <div className="info-form-group">
                  <label>Sale Price</label>
                  <input
                    type="text"
                    placeholder="Enter Sale Price"
                    className={`info-input ${errors.propertyInfo.salePrice ? "error" : ""
                      }`}
                    value={formData.propertyInfo.salePrice || ""}
                    onChange={(e) =>
                      handleChange("propertyInfo", "salePrice", e.target.value)
                    }
                  />
                  {errors.propertyInfo.salePrice && (
                    <span className="error-message">
                      Sale Price is required.
                    </span>
                  )}
                </div>

                {/* Offer Price */}
                <div className="info-form-group">
                  <label>Offer Price</label>
                  <input
                    type="text"
                    placeholder="Enter Offer Price"
                    className={`info-input ${errors.propertyInfo.offerPrice ? "error" : ""
                      }`}
                    value={formData.propertyInfo.offerPrice || ""}
                    onChange={(e) =>
                      handleChange("propertyInfo", "offerPrice", e.target.value)
                    }
                  />
                  {errors.propertyInfo.offerPrice && (
                    <span className="error-message">
                      Offer Price is required.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Property Details Section */}
          <div className="property-details-section" id="property-details">
            <div className="details-description">
              <h3>Property Details</h3>
              <p>
                Complete the detailed information about the property, including
                the size, rental price, and additional features. This section
                allows you to set the foundational details needed for accurate
                listings.
              </p>
            </div>

            <div className="details-inputs-container">
              <div className="details-inputs">
                {/* Property ID */}
                <div className="details-form-group">
                  <label>Property ID</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    className={`details-input ${errors.propertyDetails.PropertyId ? "error" : ""
                      }`}
                    value={formData.propertyDetails.PropertyId || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "PropertyId",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.PropertyId && (
                    <span className="error-message">
                      Property ID is required.
                    </span>
                  )}
                </div>

                {/* Price per Sqft */}
                <div className="details-form-group">
                  <label>Price per Sqft</label>
                  <input
                    type="text"
                    placeholder="Enter Price"
                    className={`details-input ${errors.propertyDetails.pricePerSqft ? "error" : ""
                      }`}
                    value={formData.propertyDetails.pricePerSqft || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "pricePerSqft",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.pricePerSqft && (
                    <span className="error-message">
                      Price per Sqft is required.
                    </span>
                  )}
                </div>

                {/* Structure Type */}
                <div className="details-form-group">
                  <label>Structure Type</label>
                  <select
                    className={`details-select ${errors.propertyDetails.structureType ? "error" : ""
                      }`}
                    value={formData.propertyDetails.structureType || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "structureType",
                        e.target.value
                      )
                    }
                  >
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>

                {/* No of Bedrooms */}
                <div className="details-form-group">
                  <label>No of Bedrooms</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    className={`details-input ${errors.propertyDetails.noOfBedrooms ? "error" : ""
                      }`}
                    value={formData.propertyDetails.noOfBedrooms || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "noOfBedrooms",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.noOfBedrooms && (
                    <span className="error-message">
                      Number of Bedrooms is required.
                    </span>
                  )}
                </div>

                {/* No of Bathrooms */}
                <div className="details-form-group">
                  <label>No of Bathrooms</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    className={`details-input ${errors.propertyDetails.noOfBathrooms ? "error" : ""
                      }`}
                    value={formData.propertyDetails.noOfBathrooms || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "noOfBathrooms",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.noOfBathrooms && (
                    <span className="error-message">
                      Number of Bathrooms is required.
                    </span>
                  )}
                </div>

                {/* Sqft */}
                <div className="details-form-group">
                  <label>Sqft</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    className={`details-input ${errors.propertyDetails.sqft ? "error" : ""
                      }`}
                    value={formData.propertyDetails.sqft || ""}
                    onChange={(e) =>
                      handleChange("propertyDetails", "sqft", e.target.value)
                    }
                  />
                  {errors.propertyDetails.sqft && (
                    <span className="error-message">Sqft is required.</span>
                  )}
                </div>

                {/* No of Floors */}
                <div className="details-form-group">
                  <label>No of Floors</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    className={`details-input ${errors.propertyDetails.noOfFloors ? "error" : ""
                      }`}
                    value={formData.propertyDetails.noOfFloors || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "noOfFloors",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.noOfFloors && (
                    <span className="error-message">
                      Number of Floors is required.
                    </span>
                  )}
                </div>

                {/* Garage Size */}
                <div className="details-form-group">
                  <label>Garage Size</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    className={`details-input ${errors.propertyDetails.garageSize ? "error" : ""
                      }`}
                    value={formData.propertyDetails.garageSize || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "garageSize",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.garageSize && (
                    <span className="error-message">
                      Garage Size is required.
                    </span>
                  )}
                </div>

                {/* Year Constructed */}
                <div className="details-form-group">
                  <label>Year Constructed</label>
                  <input
                    type="text"
                    placeholder="Enter Value"
                    className={`details-input ${errors.propertyDetails.yearConstructed ? "error" : ""
                      }`}
                    value={formData.propertyDetails.yearConstructed || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "yearConstructed",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.yearConstructed && (
                    <span className="error-message">
                      Year Constructed is required.
                    </span>
                  )}
                </div>
                <div className="Description">
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="Enter Description"
                    className={`details-input ${errors.propertyDetails.Description ? "error" : ""
                      }`}
                    value={formData.propertyDetails.Description || ""}
                    onChange={(e) =>
                      handleChange(
                        "propertyDetails",
                        "Description",
                        e.target.value
                      )
                    }
                  />
                  {errors.propertyDetails.Description && (
                    <span className="error-message">
                      Description is required.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="amenities-section" id="amenities">
          <div className="amenities-container">
            {/* Left side: Heading and Description */}
            <div className="amenities-description">
              <h3>Amenities</h3>
              <p>
                Select the amenities that are available for your property. These
                features can make your listing more attractive to potential
                buyers or renters.
              </p>
            </div>

            {/* Right side: Input Fields for Amenities */}
            <div className="amenities-inputs">
              <div className="amenities-grid">
                {/* Amenity Item: Air Conditioning */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="airConditioning"
                    name="airConditioning"
                    checked={formData.amenities?.airConditioning || false}
                    onChange={(e) =>
                      handleChange(
                        "amenities",
                        "airConditioning",
                        e.target.checked
                      )
                    }
                  />
                  <label htmlFor="airConditioning">Air Condition</label>
                </div>

                {/* Amenity Item: Lawn */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="lawn"
                    name="lawn"
                    checked={formData.amenities?.lawn || false}
                    onChange={(e) =>
                      handleChange("amenities", "lawn", e.target.checked)
                    }
                  />
                  <label htmlFor="lawn">Lawn</label>
                </div>

                {/* Amenity Item: Swimming Pool */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="swimmingPool"
                    name="swimmingPool"
                    checked={formData.amenities?.swimmingPool || false}
                    onChange={(e) =>
                      handleChange(
                        "amenities",
                        "swimmingPool",
                        e.target.checked
                      )
                    }
                  />
                  <label htmlFor="swimmingPool">Swimming Pool</label>
                </div>

                {/* Amenity Item: Barbecue */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="barbecue"
                    name="barbecue"
                    checked={formData.amenities?.barbecue || false}
                    onChange={(e) =>
                      handleChange("amenities", "barbecue", e.target.checked)
                    }
                  />
                  <label htmlFor="barbecue">Barbecue</label>
                </div>

                {/* Amenity Item: Microwave */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="microwave"
                    name="microwave"
                    checked={formData.amenities?.microwave || false}
                    onChange={(e) =>
                      handleChange("amenities", "microwave", e.target.checked)
                    }
                  />
                  <label htmlFor="microwave">Microwave</label>
                </div>

                {/* Amenity Item: TV Cable */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="tvCable"
                    name="tvCable"
                    checked={formData.amenities?.tvCable || false}
                    onChange={(e) =>
                      handleChange("amenities", "tvCable", e.target.checked)
                    }
                  />
                  <label htmlFor="tvCable">TV Cable</label>
                </div>

                {/* Amenity Item: Dryer */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="dryer"
                    name="dryer"
                    checked={formData.amenities?.dryer || false}
                    onChange={(e) =>
                      handleChange("amenities", "dryer", e.target.checked)
                    }
                  />
                  <label htmlFor="dryer">Dryer</label>
                </div>

                {/* Amenity Item: WiFi */}
                <div className="amenity-item">
                  <input
                    type="checkbox"
                    id="wifi"
                    name="wifi"
                    checked={formData.amenities?.wifi || false}
                    onChange={(e) =>
                      handleChange("amenities", "wifi", e.target.checked)
                    }
                  />
                  <label htmlFor="wifi">WiFi</label>
                </div>
              </div>
            </div>
          </div>
        </div>


        <PropertyGallery setFieldValue={setFormData} />

        <div className="property-info-section" id="ContactInfo">
          <div className="info-description">
            <h3>Contact Inofrmation</h3>
            <p>
              Provide contact details for potential buyers or renters to Contact. This information will be shared with potential buyers or renters.
            </p>
          </div>

          <div className="info-inputs-container">
            <div className="info-inputs">
              {/* Property Name */}
              <div className="info-form-group">
                <label>Email</label>
                <input
                  type="Email"
                  placeholder="Enter Name"
                  className={`info-input ${errors.ContactInfo.Email ? "error" : ""
                    }`}
                  value={formData.ContactInfo.Email}
                  onChange={(e) => {
                    console.log("PropertyName onChange event triggered");
                    handleChange("ContactInfo", "Email", e.target.value);
                  }}
                />
                {errors.ContactInfo.Email && (
                  <span className="error-message">
                    Owner Contact details is required.
                  </span>
                )}
              </div>

              {/* Phone Number */}
              <div className="info-form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className={`info-input ${errors.ContactInfo.Phone ? "error" : ""
                    }`}
                  value={formData.ContactInfo.Phone || ""}
                  onChange={(e) =>
                    handleChange(
                      "ContactInfo",
                      "Phone",
                      e.target.value
                    )
                  }
                />
                {errors.ContactInfo.Phone && (
                  <span className="error-message">
                    Phone Number is required.
                  </span>
                )}
              </div>

              


            </div>
          </div>
        </div>

        <div className="properties-location-section" id="location">
          <div className="left-column">
            <h3>Property Location</h3>
            <p className="section-info">
              Provide the detailed location of the property to help tenants
              easily locate it.
            </p>
          </div>

          <div className="right-column">
            {/* Address Input */}
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter property Address"
                className="input-field"
                value={formData.location?.Address || ""}
                onChange={(e) =>
                  handleChange("location", "Address", e.target.value)
                }
              />
              {errors.location?.Address && (
                <span className="error-message">Address is required.</span>
              )}
            </div>

            {/* Row for City and State */}
            <div className="form-group-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  placeholder="Enter City"
                  className="input-field"
                  value={formData.location?.City || ""}
                  onChange={(e) =>
                    handleChange("location", "City", e.target.value)
                  }
                />
                {errors.location?.City && (
                  <span className="error-message">City is required.</span>
                )}
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  placeholder="Enter State"
                  className="input-field"
                  value={formData.location?.State || ""}
                  onChange={(e) =>
                    handleChange("location", "State", e.target.value)
                  }
                />
                {errors.location?.State && (
                  <span className="error-message">State is required.</span>
                )}
              </div>
            </div>

            {/* Row for Zip Code and Map URL */}
            <div className="form-group-row">
              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  placeholder="Enter zip code"
                  className="input-field"
                  value={formData.location?.ZipCode || ""}
                  onChange={(e) =>
                    handleChange("location", "ZipCode", e.target.value)
                  }
                />
                {errors.location?.ZipCode && (
                  <span className="error-message">Zip Code is required.</span>
                )}
              </div>
              <div className="form-group">
                <label>Map URL</label>
                <input
                  type="text"
                  placeholder="Enter map URL (optional)"
                  className="input-field"
                  value={formData.location?.mapUrl || ""}
                  onChange={(e) =>
                    handleChange("location", "mapUrl", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="button-section">
          <button className="reset-button" onClick={handleReset} type="button">
            Reset
          </button>

          <button
            className="submit-button"
            onClick={handleSubmit}
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPost;