import React from 'react';
import "../style/SimilarListings.css"; // Assuming the CSS file is in this location

const SimilarListings = () => {
  const properties = [
    { id: 1, title: "Beautiful Condo Room", price: "$2,200", location: "Royal Apartment", features: ["2 Bed", "3 Bath", "1000 Sqft"], agent: "Mike Silva", tags: ["Featured", "New"], image: "src/assets/rental2.jpeg" },
    { id: 2, title: "Royal Apartment", price: "$1,500", location: "Elegant Homes", features: ["3 Bed", "4 Bath", "1200 Sqft"], agent: "Scott Graves", tags: ["Featured"], image: "src/assets/re3.jpeg" },
    { id: 3, title: "Grand Villa House", price: "$4,500", location: "Downtown Villa", features: ["5 Bed", "6 Bath", "2000 Sqft"], agent: "Kat Fields", tags: ["New"], image: "src/assets/rental image.jpeg" },
    { id: 4, title: "Grand Mashaka", price: "$1,400", location: "Luxury Estates", features: ["3 Bed", "2 Bath", "900 Sqft"], agent: "Karen Maria", tags: [], image: "src/assets/rental2.jpeg" },
    { id: 5, title: "Lumia's Residence", price: "$3,500", location: "Sunset Hills", features: ["4 Bed", "3 Bath", "1500 Sqft"], agent: "Sandrita Cornelia", tags: [], image: "src/assets/imagepro.jpeg" },
    { id: 6, title: "Stephan Alexander Homes", price: "$2,400", location: "Ocean Front", features: ["2 Bed", "2 Bath", "800 Sqft"], agent: "Philma Cordelia", tags: [], image: "src/assets/images.jpeg" },
  ];

  return (
    <section className="featured-properties-section">
      <div className="main">
        <h2>Featured Properties for Buy/Sell and Rent</h2>
        <span className='nav-line1'></span>
        <p>Hand-picked selections of quality places</p>
        <div className="property-cards">
          {properties.map((property) => (
            <div className="property-card" key={property.id}>
              <div className="property-tags">
                {property.tags.map((tag, index) => (
                  <span className="tag" key={index}>{tag}</span>
                ))}
              </div>

              <div className="property-image">
                <img src={property.image} alt={property.title} />
              </div>

              <hr className="separator-line" />

              <div className="property-info">
                <h3>{property.title}</h3>
                <span className="price">{property.price} /mo</span>
                <p>{property.location}</p>
                <div className="features">
                  {property.features.map((feature, index) => (
                    <span key={index}>{feature}</span>
                  ))}
                </div>
                <div className="agent-info">
                  <span>Agent: {property.agent}</span>
                </div>

                <div className="rating">⭐⭐⭐⭐⭐</div>

                <button className="view-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
        <button className="view-all-btn">View All Properties</button>
      </div>
    </section>
  );
};

export default SimilarListings;
