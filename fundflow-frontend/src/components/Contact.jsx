"use client"
import { useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { useContext } from "react";
import "./Contact.css"
import { AuthContext } from "../context/AuthContext";
import i from "../components/i.jpg"
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile")
    } else {
      setShowDropdown(!showDropdown)
    }
  }

  const confirmLogout = () => {
    logout();
    setShowDialog(false); // Show the custom dialog box
  };

  const handleLogout = () => {
    setShowDialog(true); // Show the custom dialog box
  };
  
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null);
  const othersCardRef = useRef(null);
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  return (
    <>
      <Header/>

      <div className="contact-page">
        {/* Hero Section */}
        <div className="contact-hero">
          <div className="container">
            <h1>Contact Us</h1>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Info */}
              <div className="contact-info-card">
                <div className="info-item">
                  <div className="icon">📍</div>
                  <h3>Office Address</h3>
                  <p><strong>Abhimo Technologies Private Limited</strong></p>
                  <p>F07, D.No. 2-11/26(27), "Green City", Behind Naganakatte, N.H.66, Thokottu, Mangaluru, Karnataka 575017</p>
                </div>

                <div className="info-item">
                  <div className="icon">📞</div>
                  <h3>Phone Numbers</h3>
                  <p>Support: +91 7678765654</p>
                  <p>Enquiry: +1 8896756768</p>
                </div>

                <div className="info-item">
                  <div className="icon">✉️</div>
                  <h3>Email Address</h3>
                  <p>FundFlow.org</p>
                  <p>dhruthiysanil123@gmail.com</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-card">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      placeholder="Message Here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-button">
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.7763893772!2d74.88370000000001!3d12.834600000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35bfd1e8d3c7d%3A0x5c2b6d9e9c3f2a3a!2sAbhimo%20Technologies%20Private%20Limited!5e0!3m2!1sen!2sin!4v1645564764244!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Abhimo Technologies Private Limited Location"
          />
        </div>
      </div>
      <Footer/>
    </>
  )
}