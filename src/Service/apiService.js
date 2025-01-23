// apiservice.js

import axios from "axios";
import { jwtDecode } from 'jwt-decode';  // Use the named import

// import axios from './axios';
// import { notify } from '../utils/Notification';
import { notify } from "../utils/Notification";

const TOKEN_KEY = 'admintoken'; // Key for the token in localStorage
const tokenValue = localStorage.getItem(TOKEN_KEY); // Retrieve the token value from localStorage

 // This will log the JWT token value

// console.log(TOKEN_KEY); 
const API_URL = "http://localhost:5000/api";

 const loginAdmin = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, data); // No Authorization header for login
    return response.data; // Return the response data containing the token
  } catch (error) {
    notify("error", error.response?.data?.message || "Login failed");
    throw error;
  }
};
const getUserIdFromAuthToken = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log(token);
    if (!token) {
      //notify('error', 'No token found. Please log in.');
      return null;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken?.nameid || null; // Add a default fallback
    } catch (error) {
      return null; // Handle errors gracefully
    }
  };
  
const fetchUserData = async () => {
    try {
      // console.log(userId);
      const response = await axios.get(`${API_URL}/Users`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to fetch user data. Please try again later.");
    }
  };
  const updateUserData = async (userId, formData) => {
    try {
      const response = await axios.put(`/users/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw new Error("Failed to update user profile. Please try again later.");
    }
  };

const fetchListings = async () => {
  try {
    const response = await axios.get(`${API_URL}/listings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
};

const fetchDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/Listings/dashboard-stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {};
  }
};
const getListings = async () => {
    try {
      const userId = authService.getUserIdFromAuthToken();
      if (!userId) throw new Error("Invalid or missing user ID");
      // console.log(userId);
      const response = await axios.get(`/Listings/user/${userId}`);
      // console.log(response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      throw error.response?.data?.message || "Error fetching listings";
    }
  };
  
const fetchListingDetails = async (listingId) => {
    try {
      const response = await axios.get(`${API_URL}/Listings/${listingId}`);
      return response.data; 
    } catch (error) {
      // console.error('Failed to fetch listing details:', error);
      throw error; 
    }
  };
  const PostListings = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/Listings/AddListings`, formData, {
        headers: { 
          'Authorization': `Bearer ${tokenValue}`,
          'Content-Type': 'multipart/form-data' },
      });
      if (response && response.data && response.data.images) {
        // console.log('Image Paths:', response.data.images.map(image => image.path)); // Log image paths from the response
        return response.data.images.map(image => image.path); 
      } else {
        // console.error('No images in response.');
        return [];
      }
    } catch (error) {
      // console.error('Image upload failed:', error);
      throw error;
    }
  };

  
 const  getAllListings = async () => {
    try {
     
      const response = await axios.get(`${API_URL}/Listings`);
      // console.log(response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      throw error.response?.data?.message || "Error fetching listings";
    }
  };
  
  

  
  
 const UpdateListing = async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/Listings/${id}`, formData, {
        headers: { 
          'Authorization': `Bearer ${tokenValue}`,
          'Content-Type': 'application/json' 
        },
      });
      return response.data; 
    } catch (error) {
      throw error;
    }
  };
  
  const ChangeListingStatus = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/Listings/${id}/ChangeStatus`, null, {
        headers: { 
          'Authorization': `Bearer ${tokenValue}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const GetReviewsByListingId = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/Listings/${id}/reviews`, {
        headers: { 
          'Authorization': `Bearer ${tokenValue}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  // Add a review to a listing
  const AddReview= async (id, reviewData) => {
    try {
      const response = await axios.post(`${API_URL}/Listings/${id}/reviews`, reviewData, {
        headers: { 
          'Authorization': `Bearer ${tokenValue}`,
          'Content-Type': 'application/json' 
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  // Delete a review
  const DeleteReview= async (id, reviewId) => {
    try {
      const response = await axios.delete(`${API_URL}/Listings/${id}/reviews/${reviewId}`, {
        headers: { 
          'Authorization': `Bearer ${tokenValue}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
   const updateUser = async (userId, updatedData) => {
    // console.log(updatedData, userId);
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update user.");
    return response.json();
  };
   const deleteUser = async (userId) => {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete user.");
    return response.json();
  };
export default {loginAdmin,deleteUser,updateUser,DeleteReview,AddReview,GetReviewsByListingId,getUserIdFromAuthToken,updateUserData,fetchUserData,ChangeListingStatus,getAllListings,UpdateListing, fetchListings, fetchDashboardStats ,getListings ,fetchListingDetails,PostListings};
