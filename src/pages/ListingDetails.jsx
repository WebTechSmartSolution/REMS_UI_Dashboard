import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Common from "../components/PD_Section/Common";
import "../components/style/PropertieDetails.css";
import Section3 from "../components/PD_Section/Section3";
import Reviews from "../components/PD_Section/Reviews";
// import RequestInfo from "../components/Sections/PD_Section/LeftSideDiv";
import SimilarListings from "../components/PD_Section/LastSection";
// import OwnerDetails from "../components/PD_Section/Ownerdetails";
import apiService from "../Service/apiService";
import { notify } from "../utils/Notification";
import LoadingSpinner from "../components/Loadingspiner";

function Properties_details() {
  const { id } = useParams(); // Extract the listing ID from the URL
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  const navigate = useNavigate();


  useEffect(() => {
    //authService.isAuthenticated();
    const fetchListing = async () => {
      setLoading(true);
      try {
        const data = await apiService.fetchListingDetails(id); 
        // console.log(data);
        setListing(data);
      } catch (err) {
        // setListing(listing);
        // fetchListing(listing);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    notify("error", "Listing have No details yet. See Another Property");
    navigate("/all_listings");
    return null; 
  }

  return (
    <>  
      <div className="propertie-page">
      <Common listing={listing} />
      <div className="Parent">
        <div className="left-side">
          <Section3 listing={listing} />
        </div>
        <div className="right-side">
          
          {/* <OwnerDetails listingId={id} ownerId={listing.ownerId} /> */}
          <Reviews listingId={id} />
        </div>
      </div>
      <SimilarListings />
    </div>
    </>
  );
}

export default Properties_details;
