"use client"

import { useState } from "react"
import "./Contact.css"

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

  return (
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
                <p>83 Andy Street, Madison New Jersey - 78902</p>
              </div>

              <div className="info-item">
                <div className="icon">📞</div>
                <h3>Phone Numbers</h3>
                <p>Support: +1 700 888 1234</p>
                <p>Enquiry: +1 700 888 1200</p>
              </div>

              <div className="info-item">
                <div className="icon">✉️</div>
                <h3>Email Address</h3>
                <p>info@liveicon.org</p>
                <p>support@liveicon.org</p>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25986652089843!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564764244!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  )
}

