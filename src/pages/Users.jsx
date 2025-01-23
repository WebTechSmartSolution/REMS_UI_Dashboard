import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog"; // Import Dialog component
import apiService from "../Service/apiService";
import "../styles/User.css"; // Ensure your CSS is linked
import { notify } from "../utils/Notification";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false); // State for edit modal
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null); // State for the user being edited

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await apiService.fetchUserData();
        const formattedUsers = userData.map((user) => ({
          ...user,
          createdAt: new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          updatedAt: user.updatedAt
            ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "N/A",
        }));
        setUsers(formattedUsers || []); // Fallback to empty array if no data
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openEditModal = (user) => {
    setUserToEdit({ ...user }); // Create a copy of the user object for editing
    setVisibleEditModal(true);
  };

  const closeEditModal = () => {
    setVisibleEditModal(false);
    setUserToEdit(null);
  };

  const handleEditSave = async () => {
    try {
      await apiService.updateUser(userToEdit.id, userToEdit); // Update user via API
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userToEdit.id ? { ...userToEdit } : user
        )
      );
      closeEditModal();
      notify("success","User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      notify("error","Failed to update user.");
    }
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setVisibleDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setVisibleDeleteModal(false);
    setUserToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      await apiService.deleteUser(userToDelete.id); // Call the API to delete user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
      notify("success","User deleted successfully!");
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting user:", error);
      notify("error","Failed to delete user.");
    }
  };

  const actionBodyTemplate = (rowData) => (
    <>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success p-button-edit mr-2"
        onClick={() => openEditModal(rowData)} // Open edit modal on click
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-delete"
        onClick={() => openDeleteModal(rowData)} // Open modal on delete button click
      />
    </>
  );

  const imageBodyTemplate = (rowData) => {
    const BASE_URL = "http://localhost:5000";
    const imageUrl = rowData.profileImageUrl ? `${BASE_URL}${rowData.profileImageUrl}` : "src/assets/US2.jpeg";
    
    return (
      <img
        src={imageUrl}
        alt="User"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
    );
  };

  return (
    <div className="user-page">
      <h2>Total Users: {users.length}</h2>

      <div className="user-table-container">
        <InputText
          value={globalFilterValue}
          onChange={(e) => setGlobalFilterValue(e.target.value)}
          placeholder="Search..."
          className="p-inputtext"
        />

        <DataTable
          value={Array.isArray(users) ? users : []} // Ensure the value is always an array
          paginator
          rows={10}
          globalFilter={globalFilterValue}
          loading={loading}
          responsiveLayout="scroll"
          emptyMessage="No users found."
        >
          <Column body={imageBodyTemplate} header="Profile Image" />
          <Column field="id" header="ID" sortable />
          <Column field="name" header="Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="mobileNumber" header="Phone Number" sortable />
          <Column field="totalListings" header="All Listings" sortable />
          <Column field="isAgent" header="Is Agent" sortable />
          <Column field="createdAt" header="Created At" sortable />
          <Column field="updatedAt" header="Updated At" sortable />
          {/* <Column body={actionBodyTemplate} header="Actions" /> */}
        </DataTable>
      </div>

      {/* Modal for Edit User */}
      <Dialog
        visible={visibleEditModal}
        style={{ width: "400px" }}
        header="Edit User"
        modal
        footer={
          <>
            <Button label="Cancel" icon="pi pi-times" onClick={closeEditModal} className="p-button-text" />
            <Button
              label="Save"
              icon="pi pi-check"
              onClick={handleEditSave}
              className="p-button-success"
            />
          </>
        }
        onHide={closeEditModal}
      >
        <div>
          <label htmlFor="name">Name:</label>
          <InputText
            id="name"
            value={userToEdit?.name || ""}
            onChange={(e) =>
              setUserToEdit((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <label htmlFor="email">Email:</label>
          <InputText
            id="email"
            value={userToEdit?.email || ""}
            disabled={true}
            onChange={(e) =>
              setUserToEdit((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          
        </div>
      </Dialog>

      {/* Modal for Delete Confirmation */}
      <Dialog
        visible={visibleDeleteModal}
        style={{ width: "400px" }}
        header="Confirm Deletion"
        modal
        footer={
          <>
            <Button label="No" icon="pi pi-times" onClick={closeDeleteModal} className="p-button-text" />
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={handleDeleteConfirm}
              className="p-button-danger"
            />
          </>
        }
        onHide={closeDeleteModal}
      >
        <p>Are you sure you want to delete the user <strong>{userToDelete?.name}</strong>?</p>
      </Dialog>
    </div>
  );
};

export default Users;
