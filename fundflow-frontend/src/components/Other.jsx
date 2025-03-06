import { useState } from "react"
import "./Other.css"

function MyselfForm() {
  const [formData, setFormData] = useState({
    photo: null,
    name: "",
    age: "",
    gender: "Male",
    location: "",
    phone: "",
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
          <select className="beneficiary-select">
            <option value="others">others</option>
            <option value="myself">myself</option>
            <option value="family">my family</option>
            <option value="friends">my friends</option>
          </select>
        </div>

        <div className="form-content">
          <div className="photo-upload">
            <input type="file" id="photo-input" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            <label htmlFor="photo-input" className="photo-label">
              {formData.photo ? (
                <img src={formData.photo || "/placeholder.svg"} alt="Beneficiary" className="preview-image" />
              ) : (
                <>
                  <div className="plus-icon">+</div>
                  <div className="photo-text">Beneficiary display photo</div>
                </>
              )}
            </label>
          </div>

          <div className="form-group">
            <label>Funds raised will help</label>
            <input
              type="text"
              placeholder="Describe who the funds will help"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label>Based out of</label>
            <input
              type="text"
              placeholder="Ex: Bengaluru"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div className="form-group age-group">
            <label>Age</label>
            <div className="age-input">
              <input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
              />
            </div>
            <select className="years-select">
              <option value="years">years</option>
              <option value="months">months</option>
            </select>
          </div>

          <div className="form-group phone-group">
            <label>Phone Number</label>
            <div className="phone-input">
              <select className="country-code">
                <option value="+91">+91</option>
              </select>
              <input
                type="text"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
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

export default MyselfForm
