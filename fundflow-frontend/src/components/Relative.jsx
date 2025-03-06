"use client"

import { useState } from "react"
import "./Relative.css"

function RelativeForm() {
  const [formData, setFormData] = useState({
    photo: null,
    relativeName: "",
    relation: "",
    location: "",
    mobile: "",
  })

  const handlePhotoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <span>This fundraiser will benefit</span>
          <select className="beneficiary-select" defaultValue="my-relative">
            <option value="my-relative">my relative</option>
           
            <option value="myself">myself</option>
            <option value="friends">my friends</option>
            <option value="others">others</option>
          </select>
        </div>

        <div className="form-content">
          <div className="photo-upload">
            <input type="file" id="photo-input" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            <label htmlFor="photo-input" className="photo-label">
              {formData.photo ? (
                <img src={formData.photo || "/placeholder.svg"} alt="Selected" className="preview-image" />
              ) : (
                <>
                  <div className="plus-icon">+</div>
                  <div className="photo-text">Beneficiary's display photo</div>
                </>
              )}
            </label>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Relative's name"
              value={formData.relativeName}
              onChange={(e) => setFormData((prev) => ({ ...prev, relativeName: e.target.value }))}
            />
          </div>

          <div className="form-group relation-group">
            <span>is my</span>
            <select
              value={formData.relation}
              onChange={(e) => setFormData((prev) => ({ ...prev, relation: e.target.value }))}
              className="relation-select"
            >
              <option value="">Select relation</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
              <option value="sibling">Sibling</option>
              <option value="spouse">Spouse</option>
              <option value="child">Child</option>
            </select>
          </div>

          <div className="form-group">
            <span>& residing in</span>
            <input
              type="text"
              placeholder="Ex: Bengaluru"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div className="form-group mobile-group">
            <div className="country-code">
              <select className="code-select">
                <option value="+91">+91</option>
              </select>
            </div>
            <input
              type="tel"
              placeholder="Beneficiary's mobile no."
              value={formData.mobile}
              onChange={(e) => setFormData((prev) => ({ ...prev, mobile: e.target.value }))}
              className="mobile-input"
            />
          </div>
        </div>

        <div className="form-footer">
          <button className="footer-button close">Close</button>
          <button className="footer-button continue">Continue</button>
        </div>
      </div>
    </div>
  )
}

export default RelativeForm

