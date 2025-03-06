"use client"

import { useState } from "react"
import "./Profile.css"
import { ChevronDown, ChevronUp, Edit2 } from "lucide-react"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {

  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const [isProfileOpen, setIsProfileOpen] = useState(true)
  const [isPanOpen, setIsPanOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "adi",
    lastName: "",
    email: "sheeruu1415@gmail.com",
    phoneCode: "91",
    phoneNumber: "7676784271",
    panNumber: "",
    panName: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  })


  if (!isAuthenticated) {
    return <h2>Please login to view this page.</h2>;
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <Edit2 className="header-icon" />
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
                <label>First name</label>
                <div className="input-container">
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Last name</label>
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
                  <input
                    type="text"
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleInputChange}
                    className="phone-code"
                  />
                  <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
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

        <button type="submit" className="save-btn">
          Save
        </button>
      </form>
    </div>
  )
}

export default Profile
