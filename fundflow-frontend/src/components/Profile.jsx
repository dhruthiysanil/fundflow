"use client"

import { useState, useEffect, useContext } from "react";
import "./Profile.css";
import { ChevronDown, ChevronUp, Edit2 } from 'lucide-react';
import { AuthContext } from "../context/AuthContext";
import API from "../utils/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./Header";
import { Footer } from "./Footer";

function Profile() {
  const { user, isAuthenticated, updateUser } = useContext(AuthContext);

  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const [isPanOpen, setIsPanOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneCode: "91",
    phoneNumber: "",
    panNumber: "",
    panName: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await API.get("/api/user");
        const userData = response.data;
        // console.log(userData)

        setFormData({
          fullName: userData.name || "",
          last_name: userData.lastName || "",
          email: userData.email || "",
          phoneCode: userData.phoneCode || "91",
          phoneNumber: userData.phone_number || "",
          panNumber: userData.pan_number || "",
          panName: userData.pan_name || "",
          address: userData.address || "",
          country: userData.country || "",
          state: userData.state || "",
          city: userData.city || "",
          pincode: userData.pincode || "",
        });

        // Set profile image if available
        if (userData.profile_pic) {
          setProfileImagePreview(`http://localhost:5000${userData.profile_pic}`);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserDetails();
    }
    
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <h2>Please login to view this page.</h2>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData object to handle file upload
      const submitData = new FormData();

      // Append all form fields
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      // Append profile image if selected
      if (profileImage) {
        submitData.append('profileImage', profileImage);
      }

      const response = await API.put("/api/update-user", submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });


      const data = response.data;

      if (data.updated) {
        console.log(data.updatedData);
        updateUser(data.updatedData);
        toast.success(data.message);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-header">

          <h1>Edit Profile</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <button type="button" className="section-header" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <h2>Profile details</h2>
              {isProfileOpen ? <ChevronUp className="chevron-icon" /> : <ChevronDown className="chevron-icon" />}
            </button>

            {isProfileOpen && (
              <div className="section-content">
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-container">
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <div className="input-container">
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Registered Email</label>
                  <div className="input-container">
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone number</label>
                  <div className="input-container phone-input">
                    <input type="text" name="phoneCode" value={formData.phoneCode} onChange={handleInputChange} className="phone-code" />
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                  </div>
                </div>


                <div className="profile-picture-section">
                  <div className="profile-picture-label">Change Profile Picture</div>
                  <div className="profile-picture-input">
                    <input type="text" readOnly value={profileImage ? profileImage.name : ""} />
                    <label className="choose-file-btn">
                      Choose file
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  <div className="profile-picture-preview">
                    {profileImagePreview ? (
                      <img src={profileImagePreview || "/placeholder.svg"} alt="Profile" />
                    ) : (
                      <div className="profile-picture-placeholder">a</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="form-section">
            <button type="button" className="section-header" onClick={() => setIsPanOpen(!isPanOpen)}>
              <h2>PAN details</h2>
              {isPanOpen ? <ChevronUp className="chevron-icon" /> : <ChevronDown className="chevron-icon" />}
            </button>

            {isPanOpen && (
              <div className="section-content">
                <div className="form-group">
                  <label>PAN Card Number</label>
                  <div className="input-container">
                    <input type="text" name="panNumber" value={formData.panNumber} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Name as in PAN Card</label>
                  <div className="input-container">
                    <input type="text" name="panName" value={formData.panName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <div className="input-container">
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <div className="input-container">
                    <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>State</label>
                  <div className="input-container">
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>City</label>
                  <div className="input-container">
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <div className="input-container">
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <button type="submit" className="save-btn">Save</button>
        </form>
        <ToastContainer position="top-right" autoClose={1500} />
      </div>
      <Footer />
    </>
  );
}

export default Profile;


