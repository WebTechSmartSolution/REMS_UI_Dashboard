import React, { useState, useEffect } from "react";
import { notify } from "../utils/Notification";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import LoadingSpinner from "../components/Loadingspiner";
import apiService from "../Service/apiService";
import "../styles/All-Listing.css";

const ListingDashboard = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const fetchedListings = await apiService.fetchListings();
        console.log(fetchedListings);
        setListings(fetchedListings);
      } catch (error) {
        notify("error", "Error fetching listings: " + (error.message || error));
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredListings = listings.filter((listing) => {
    const title = listing.title || listing.propertyName || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleView = (id) => {
    navigate(`/listing/view/${id}`);
  };

  const handleEdit = async (id) => {
    try {
      const listingData = await apiService.fetchListingDetails(id);
      navigate(`/listing/edit/${id}`, { state: { listingData } });
    } catch (error) {
      notify("error", "Error fetching listing details: " + error.message);
    }
  };

  const handleStatusChange = async (id) => {
    try {
      await apiService.ChangeListingStatus(id);
      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== id)
      );
      notify("success", "Listing status changed successfully");
    } catch (error) {
      notify(
        "error",
        "Error during listing status change: " + (error.message || error)
      );
    }
  };

  const imageBodyTemplate = (rowData) => (
    <img
      src={`http://localhost:5000${rowData.images?.[0]?.path || "/src/assets/rental1.jpeg"}`}
      alt={`Image of ${rowData.title || rowData.propertyName}`}
      className="listing-image"
    />
  );

  const actionsBodyTemplate = (rowData) => (
    <div className="action-icons">
      <button
        className="action-btn view-btn"
        onClick={() => handleView(rowData.id)}
      >
        <i className="fas fa-eye"></i> View
      </button>
      <button
        className="action-btn edit-btn"
        onClick={() => handleEdit(rowData.id)}
      >
        <i className="fas fa-edit"></i> Edit
      </button>
      <button
        className="action-btn edit-btn"
        onClick={() => handleStatusChange(rowData.id)}
      >
        <i className="fas fa-edit"></i> Change Status
      </button>
    </div>
  );

  const dateBodyTemplate = (rowData) => (
    rowData.createdAt ? format(new Date(rowData.createdAt), "dd/MM/yyyy") : "N/A"
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-stats">
          <div className="stat-item">
            <div className="stat-value">{listings.length}</div>
            <div className="stat-label">Total listings</div>
          </div>
        </div>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by title"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="table-container">
        <DataTable
          value={filteredListings}
          paginator
          rows={10}
          className="p-datatable-custom"
          responsiveLayout="scroll"
        >
          <Column field="id" header="Id" sortable></Column>
          <Column body={imageBodyTemplate} header="Image"></Column>
          <Column field="propertyName" header="Property Title" sortable></Column>
          <Column field="propertyId" header="Property Id"></Column>
          <Column field="propertyType" header="Property Type"></Column>
          <Column field="sqft" header="Area(Sqft)" sortable></Column>
          <Column field="status" header="Status"></Column>
          <Column body={dateBodyTemplate} header="Listing Date" sortable></Column>
          <Column field="salePrice" header="Price" sortable></Column>
          <Column body={actionsBodyTemplate} header="Actions"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default ListingDashboard;
