import React, { useState } from "react";
import "./FamilyG.css";

const FamilyGrp = () => {
  const [groupName, setGroupName] = useState("");
  const [location, setLocation] = useState("");
  const [members, setMembers] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <span>This fundraiser will benefit</span>
          <select className="beneficiary-select">
            <option>my friends</option>
            <option>my family</option>
          </select>
        </div>
        <div className="form-content">
          <div className="photo-upload">
            <label className="photo-label">
              {photo ? (
                <img src={photo} alt="Preview" className="preview-image" />
              ) : (
                <>
                  <span className="plus-icon">+</span>
                  <span className="photo-text">Group display photo</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <span>is based out of</span>
            <input
              type="text"
              placeholder="Ex: Bengaluru"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <span>& comprises of</span>
            <input
              type="number"
              placeholder="Ex: 10"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
            />
            <span>members</span>
          </div>
          <div className="form-group">
            <span>Name</span>
            <input
              type="text"
              placeholder="Representative's Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <span>+91</span>
            <input
              type="tel"
              placeholder="Mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        </div>
        <div className="form-footer">
          <button className="footer-button close">Close</button>
          <button className="footer-button continue">Continue</button>
        </div>
      </div>
    </div>
  );
};

export default FamilyGrp;
