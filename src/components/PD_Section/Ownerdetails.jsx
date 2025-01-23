import React from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../Service/apiService";
import "../style/OwnerDetails.css";
import { notify } from "../../utils/Notification";

const OwnerDetails = ({ listingId, ownerId }) => {
  const navigate = useNavigate();
const ViewerID = apiService.getUserIdFromAuthToken();  //console.log(ViewerID);
  const owner = {
    name: "John Doe",
    profileImage: "/assets/images.jpeg", // Correct path for static assets
    phone: "+1 234 567 890",
    email: "johndoe@email.com",
    bio: "Experienced property owner with over 10 years in the real estate market. I specialize in renting and selling luxury homes and apartments.",
  };

  const startChat = async () => {
    try {
      const chatData = await authService.startChat(listingId, ownerId, ViewerID);
      // console.log(chatData);
      if (chatData?.chatId) {
        navigate(`/portfolio/chat/${chatData.chatId}`, {
          state: { ownerId: chatData.ownerId, viewerId: chatData.viewerId }
        });
      } else {
        throw new Error("Invalid chat data");
      }
    } catch (error) {
      console.error("Error starting chat:", error);
      notify("info", "Unable to start chat. Please try again later.");
    }
  }

  return (
    <div className="owner-details">
      <h3>Listing Owner</h3>
      <div className="owner-card">
        <div className="owner-image-container">
          <img src={owner.profileImage} alt={owner.name} />
        </div>
        <h4>{owner.name}</h4>
        <p className="owner-bio">{owner.bio}</p>
        <div className="contact-info">
          <p>
            <strong>Phone: </strong>
            {owner.phone}
          </p>
          <p>
            <strong>Email: </strong>
            <a href={`mailto:${owner.email}`}>{owner.email}</a>
          </p>
        </div>
        <button type="button" className="contact-owner" onClick={startChat}>
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default OwnerDetails;
