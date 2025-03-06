import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bene.css";

function Beneficiary() {
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("others");
  const [selectedType, setSelectedType] = useState("group");
  const navigate = useNavigate();

  const handleContinue = () => {
    console.log("Selected:", { beneficiary: selectedBeneficiary, type: selectedType });
  };

  return (
    <div className="beneficiary-container">
      <div className="beneficiary-card">
        <div className="beneficiary-header">
          <span>This fundraiser will benefit</span>
          <select
            value={selectedBeneficiary}
            onChange={(e) => setSelectedBeneficiary(e.target.value)}
            className="beneficiary-select"
          >
            <option value="others">others</option>
            <option value="myself">myself</option>
            <option value="family">my family</option>
            <option value="friends">my friends</option>
          </select>
        </div>

        <div className="options-container">
          <button
            className={`option-button full ${selectedBeneficiary === "myself" ? "selected" : ""}`}
            onClick={() => navigate("/myself")}
          >
            Myself
          </button>

          <div className="option-group">
            <div className="option-label">
              My family, <span className="subtitle">next of kin & relatives</span>
            </div>
            <div className="button-group">
              <button
                className={`option-button half ${selectedBeneficiary === "family" && selectedType === "individual" ? "selected" : ""}`}
                onClick={() => {
                  setSelectedBeneficiary("family");
                  setSelectedType("individual");
                  navigate("/relative");
                }}
              >
                <i className="icon">👤</i> Individual
              </button>
              <button
                className={`option-button half ${selectedBeneficiary === "family" && selectedType === "group" ? "selected" : ""}`}
                onClick={() => {
                  setSelectedBeneficiary("family");
                  setSelectedType("group");
                  navigate("/FamilyG");
                }}
              >
                <i className="icon">👥</i> Group
              </button>
            </div>
          </div>

          <div className="option-group">
            <div className="option-label">
              My friends, <span className="subtitle">classmates, colleagues & people I know</span>
            </div>
            <div className="button-group">
              <button
                className={`option-button half ${selectedBeneficiary === "friends" && selectedType === "individual" ? "selected" : ""}`}
                onClick={() => {
                  setSelectedBeneficiary("friends");
                  setSelectedType("individual");
                  navigate("/friend");
                }}
              >
                <i className="icon">👤</i> Individual
              </button>
              <button
                className={`option-button half ${selectedBeneficiary === "friends" && selectedType === "group" ? "selected" : ""}`}
                onClick={() => {
                  setSelectedBeneficiary("friends");
                  setSelectedType("group");
                  navigate("/FamilyG");
                }}
              >
                <i className="icon">👥</i> Group
              </button>
            </div>
          </div>

          <div className="option-group">
            <div className="option-label">
              Others <span className="subtitle">(everyone else: people, animals, businesses, communities etc)</span>
            </div>
            <div className="button-group">
              <button
                className={`option-button half ${selectedBeneficiary === "others" && selectedType === "individual" ? "selected" : ""}`}
                onClick={() => {
                  setSelectedBeneficiary("others");
                  setSelectedType("individual");
                  navigate("/Other");
                }}
              >
                <i className="icon">👤</i> Individual
              </button>
              <button
                className={`option-button half ${selectedBeneficiary === "others" && selectedType === "group" ? "selected" : ""}`}
                onClick={() => {
                  setSelectedBeneficiary("others");
                  setSelectedType("group");
                  navigate("/Other");
                }}
              >
                <i className="icon">👥</i> Group
              </button>
            </div>
          </div>

          <button
            className={`option-button full ngo ${selectedBeneficiary === "ngo" ? "selected" : ""}`}
            onClick={() => setSelectedBeneficiary("ngo")}
          >
            <div>
              <div className="ngo-title">
                <i className="icon">🏢</i> Registered NGO
              </div>
              <div className="ngo-subtitle">
                A registered not-for-profit that has a valid PAN card issued in its name
              </div>
            </div>
          </button>
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
