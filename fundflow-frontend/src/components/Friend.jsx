import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Myself.css";

function Beneficiary() {
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("friends");
  const [formData, setFormData] = useState({
    photo: null,
    name: "",
    age: "",
    gender: "Male",
    location: "",
    phone: ""
  });
  const navigate = useNavigate();

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    console.log("Form Data:", formData);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <span>This fundraiser will benefit</span>
          <select
            value={selectedBeneficiary}
            onChange={(e) => setSelectedBeneficiary(e.target.value)}
            className="beneficiary-select"
          >
            <option value="friends">My Friends</option>
            <option value="others">Others</option>
            <option value="myself">Myself</option>
            <option value="family">My Family</option>
          </select>
        </div>

        <div className="form-content">
          <div className="photo-upload">
            <input type="file" id="photo-input" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            <label htmlFor="photo-input" className="photo-label">
              {formData.photo ? (
                <img src={formData.photo} alt="Selected" className="preview-image" />
              ) : (
                <>
                  <div className="plus-icon">+</div>
                  <div className="photo-text">Upload Photo</div>
                </>
              )}
            </label>
          </div>

          <div className="form-group">
            <label>Write Friend's Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </div>

          <div className="gender-group">
            <button
              className={`gender-button ${formData.gender === "Male" ? "selected" : ""}`}
              onClick={() => setFormData({ ...formData, gender: "Male" })}
            >
              Male
            </button>
            <button
              className={`gender-button ${formData.gender === "Female" ? "selected" : ""}`}
              onClick={() => setFormData({ ...formData, gender: "Female" })}
            >
              Female
            </button>
            <button
              className={`gender-button ${formData.gender === "Other" ? "selected" : ""}`}
              onClick={() => setFormData({ ...formData, gender: "Other" })}
            >
              Other
            </button>
          </div>

          <div className="form-group">
            <label>Residing In</label>
            <input
              type="text"
              placeholder="Ex: Bengaluru"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="form-footer">
          <button className="footer-button close">Close</button>
          <button className="footer-button continue" onClick={handleContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Beneficiary;
