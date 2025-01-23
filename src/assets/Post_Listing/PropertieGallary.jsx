import React, { useState } from 'react';
import './Style/PropertyGallery.css';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notify } from '../../../services/errorHandlingService';


const PropertyGallery = ({ setFieldValue }) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter(
      (file) => file.size <= 8000000 && (file.type === 'image/jpeg' || file.type === 'image/png')
    );

    if (validImages.length + imagePreviews.length > 10) {
        notify("warning", "You can only upload a maximum of 10 images.");
      return;
    }

    const previews = validImages.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);

    setFieldValue((prevFormData) => ({
      ...prevFormData,
      gallery: [...prevFormData.gallery, ...validImages],
    }));
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFieldValue((prevFormData) => ({
      ...prevFormData,
      gallery: prevFormData.gallery.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="property-gallery-section" id="gallery">
      <div className="gallery-description">
        <h3>Property Gallery</h3>
        <p>Upload photos of the property to give potential tenants a better view of the property’s features and layout.</p>
      </div>

      <div className="gallery-upload-container">
        <label htmlFor="imageUpload1" className="upload-label1">Select Photos</label>
        <div className="gallery-upload">
          <input
            type="file"
            id="imageUpload"
            onChange={handleImageChange}
            className="upload-input1"
            accept="image/jpeg, image/png"
            multiple
          />
        </div>

        <ul className="upload-instructions">
          <li>The maximum photo size is 8 MB. Formats: jpeg, jpg, png.</li>
          <li>Maximum number of photos allowed is 10.</li>
        </ul>

        <div className="image-preview-container">
          {imagePreviews.map((preview, index) => (
            <div className="image-preview" key={index}>
              <img src={preview} alt="Property Preview" className="preview-img" />
              <button className="remove-button3" onClick={() => removeImage(index)}> <FontAwesomeIcon icon={faTimes} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
