import { useState } from "react"
import "./Myself.css"

function MyselfForm() {
  const [formData, setFormData] = useState({
    photo: null,
    name: "",
    age: "",
    gender: "Male",
    location: "",
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
            <option value="myself">myself</option>
            <option value="others">others</option>
            <option value="family">my family</option>
            <option value="friends">my friends</option>
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
                  <div className="photo-text">Display photo</div>
                </>
              )}
            </label>
          </div>

          <div className="form-group">
            <label>I'm</label>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="form-group age-group">
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

          <div className="gender-group">
            <button
              className={`gender-button ${formData.gender === "Male" ? "selected" : ""}`}
              onClick={() => setFormData((prev) => ({ ...prev, gender: "Male" }))}
            >
              Male
            </button>
            <button
              className={`gender-button ${formData.gender === "Female" ? "selected" : ""}`}
              onClick={() => setFormData((prev) => ({ ...prev, gender: "Female" }))}
            >
              Female
            </button>
            <button
              className={`gender-button ${formData.gender === "Others" ? "selected" : ""}`}
              onClick={() => setFormData((prev) => ({ ...prev, gender: "Others" }))}
            >
              Others
            </button>
          </div>

          <div className="form-group">
            <label>I'm residing in</label>
            <input
              type="text"
              placeholder="Ex: Bengaluru"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
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

export default MyselfForm

