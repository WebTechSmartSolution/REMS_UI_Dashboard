import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const toast = React.useRef(null);

  // Fetch all reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Listings/reviews");
        setReviews(response.data);
        setTotalReviews(response.data.length);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch reviews. Please try again later.",
        });
      }
    };

    fetchReviews();
  }, []);

  // Delete review handler
  const handleDelete = async (listingId, reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/api/Listings/${listingId}/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review.id !== reviewId));
      setTotalReviews((prev) => prev - 1);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Review deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete review. Please try again later.",
      });
    }
  };

  // Edit review handler (Placeholder for functionality)
  const handleEdit = (id) => {
    toast.current.show({
      severity: "info",
      summary: "Edit",
      detail: `Edit functionality for review ID: ${id} is not implemented yet.`,
    });
  };

  // Action buttons template
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          label="Edit"
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning p-button-sm"
          onClick={() => handleEdit(rowData.id)}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-sm"
          onClick={() => handleDelete(rowData.listingId, rowData.id)}
          style={{ marginLeft: "0.5rem" }}
        />
      </>
    );
  };

  return (
    <div className="reviews-page">
      <Toast ref={toast} />
      <h2>Reviews Management</h2>
      <p>Total Reviews: {totalReviews}</p>
      <DataTable value={reviews} paginator rows={10} className="p-datatable-sm">
        <Column field="id" header="ID" sortable style={{ width: "15%" }}></Column>
        {/* <Column field="listingId" header="Listing ID" sortable style={{ width: "15%" }}></Column> */}
        {/* <Column field="userId" header="User ID" sortable style={{ width: "15%" }}></Column> */}
        <Column field="name" header="Name" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="content" header="Content" sortable></Column>
        <Column field="rating" header="Rating" sortable></Column>
        <Column
          field="createdAt"
          header="Created At"
          sortable
          body={(rowData) => new Date(rowData.createdAt).toLocaleString()}
        ></Column>
        <Column
          body={actionBodyTemplate}
          header="Actions"
          style={{ textAlign: "center", width: "15%" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default ReviewsPage;
