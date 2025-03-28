"use client"

import { useState, useEffect } from "react";
import "./Fund1.css";
import { multipartAPI } from '../utils/axiosConfig';
import API from '../utils/axiosConfig';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

function FundraiserForm() {
  const [step, setStep] = useState(1)
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("myself")
  const [beneficiaryDetails, setBeneficiaryDetails] = useState({
    name: "",
    age: "",
    location: "",
    phoneNumber: "",
  })
  const [campaignDetails, setCampaignDetails] = useState({
    category: "",
    amount: "",
    duration: "",
  })
  const [fundraiserDetails, setFundraiserDetails] = useState({
    photo: null,
    photoPreview: null,
    title: "",
    story: "",
  })
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [categories, setCategories] = useState([]); // Store fetched categories

  const navigate = useNavigate()


  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("fundraiserData")
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setSelectedBeneficiary(parsedData.selectedBeneficiary || "myself")
      setBeneficiaryDetails(
        parsedData.beneficiaryDetails || {
          name: "",
          age: "",
          location: "",
          phoneNumber: "",
        },
      )
      setCampaignDetails(
        parsedData.campaignDetails || {
          category: "",
          amount: "",
          duration: "",
        },
      )
      setFundraiserDetails(
        parsedData.fundraiserDetails || {
          photo: null,
          photoPreview: null,
          title: "",
          story: "",
        },
      )
    }


    const fetchCategories = async () => {
      try {
        const response = await API.get("/api/categories/all");
        // console.log(response.data)
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();

  }, [])

  // Validate form when data changes or step changes
  useEffect(() => {
    validateForm()
  }, [step, beneficiaryDetails, campaignDetails, fundraiserDetails, termsAccepted])

  const selectBeneficiary = (type) => {
    setSelectedBeneficiary(type)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBeneficiaryDetails({
      ...beneficiaryDetails,
      [name]: value,
    })
  }


  const handleCampaignInputChange = (e) => {
    const { name, value } = e.target
    setCampaignDetails({
      ...campaignDetails,
      [name]: value,
    })
  }

  const handleFundraiserInputChange = (e) => {
    const { name, value } = e.target
    setFundraiserDetails({
      ...fundraiserDetails,
      [name]: value,
    })
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFundraiserDetails({
        ...fundraiserDetails,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      })
    }
  }

  const validateForm = () => {
    const errors = {}

    // Validate based on current step
    if (step === 2) {
      if (!beneficiaryDetails.name) errors.name = "Beneficiary name is required"
      if (!beneficiaryDetails.age) errors.age = "Age is required"
      if (!beneficiaryDetails.location) errors.location = "Location is required"
      if (!beneficiaryDetails.phoneNumber) errors.phoneNumber = "Phone number is required"
    } else if (step === 3) {
      if (!campaignDetails.category) errors.category = "Category is required"
      if (!campaignDetails.amount) errors.amount = "Amount to be raised is required"
      if (!campaignDetails.duration) errors.duration = "Duration is required"
    } else if (step === 4) {
      if (!fundraiserDetails.title) errors.title = "Fundraiser title is required"
      if (!fundraiserDetails.story) errors.story = "Your story is required"
      if (!fundraiserDetails.photoPreview) errors.photo = "Please upload a photo"
    } else if (step === 5) {
      // Validate all fields for the summary page
      if (!beneficiaryDetails.name) errors.name = "Beneficiary name is required"
      if (!beneficiaryDetails.age) errors.age = "Age is required"
      if (!beneficiaryDetails.location) errors.location = "Location is required"
      if (!beneficiaryDetails.phoneNumber) errors.phoneNumber = "Phone number is required"
      if (!campaignDetails.category) errors.category = "Category is required"
      if (!campaignDetails.amount) errors.amount = "Amount to be raised is required"
      if (!campaignDetails.duration) errors.duration = "Duration is required"
      if (!fundraiserDetails.title) errors.title = "Fundraiser title is required"
      if (!fundraiserDetails.story) errors.story = "Your story is required"
      if (!fundraiserDetails.photoPreview) errors.photo = "Please upload a photo"
      if (!termsAccepted) errors.terms = "You must accept the terms and conditions"
    }

    setFormErrors(errors)
    setIsFormValid(Object.keys(errors).length === 0)

    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    setShowErrors(true)

    if (step === 1) {
      // Always proceed from step 1 since it's just selecting a type
      setStep(2)
      setShowErrors(false)
    } else if (step === 2) {
      // Check if beneficiary details are valid
      if (validateForm()) {
        setStep(3)
        setShowErrors(false)
      }
    } else if (step === 3) {
      // Check if campaign details are valid
      if (validateForm()) {
        setStep(4)
        setShowErrors(false)
      }
    } else if (step === 4) {
      // Check if fundraiser details are valid
      if (validateForm()) {
        // Save data and move to step 5
        localStorage.setItem(
          "fundraiserData",
          JSON.stringify({
            selectedBeneficiary,
            beneficiaryDetails,
            campaignDetails,
            fundraiserDetails: {
              ...fundraiserDetails,
              photoPreview: fundraiserDetails.photoPreview,
            },
          }),
        )
        setStep(5)
        setShowErrors(false)
      }
    } else if (step === 5) {
      // Submit the form if valid
      if (validateForm()) {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    setStep(step - 1)
    setShowErrors(false)
  }

  // const handleSubmit = () => {
  //   // Here you would typically send the data to your backend
  //   alert("Fundraiser submitted successfully!")

  //   // Clear form data and reset to step 1
  //   resetForm()
  // }

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    // formData.append("user_id", "USER_ID_HERE"); // Replace with actual user ID
    formData.append("campaign_title", fundraiserDetails.title);
    formData.append("beneficiary_type", selectedBeneficiary);
    formData.append("beneficiary_name", beneficiaryDetails.name);
    formData.append("beneficiary_age", beneficiaryDetails.age || "");
    formData.append("beneficiary_location", beneficiaryDetails.location);
    formData.append("beneficiary_phone", beneficiaryDetails.phoneNumber || "");
    formData.append("category_id", campaignDetails.category);
    formData.append("target_amount", campaignDetails.amount);
    formData.append("campaign_duration", campaignDetails.duration);
    formData.append("campaign_story", fundraiserDetails.story);

    // console.log(fundraiserDetails.photo);

    if (fundraiserDetails.photo) {
      formData.append("campaign_photo", fundraiserDetails.photo);
    }


    // console.log(campaignDetails.category)

    try {
      const response = await multipartAPI.post("/api/create", formData);

      if (response.status === 201) {
        toast.success("Campaign created successfully!");
        resetForm();
        navigate('/browser')
      }
    } catch (error) {
      console.error("Error submitting fundraiser:", error);
      toast.error(error.response?.data?.error || "Failed to create campaign. Please try again.");
    }
  };

  const resetForm = () => {
    localStorage.removeItem("fundraiserData")
    setSelectedBeneficiary("myself")
    setBeneficiaryDetails({
      name: "",
      age: "",
      location: "",
      phoneNumber: "",
    })
    setCampaignDetails({
      category: "",
      amount: "",
      duration: "",
    })
    setFundraiserDetails({
      photo: null,
      photoPreview: null,
      title: "",
      story: "",
    })
    setTermsAccepted(false)
    setStep(1)
    setShowErrors(false)
  }

  return (
    <>
    <Header/>
    <div className="fundraiser-container">
      <ToastContainer position="top-right" autoClose={1500} />

      {/* Header */}
      <header className="fundraiser-header">
        <div className="header-content">
          {/* <div className="logo-container">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.5 10C23.5376 10 26 12.4624 26 15.5C26 18.5376 23.5376 21 20.5 21C17.4624 21 15 18.5376 15 15.5C15 12.4624 17.4624 10 20.5 10Z"
                fill="#9D2449"
              />
              <path
                d="M30 17C31.6569 17 33 15.6569 33 14C33 12.3431 31.6569 11 30 11C28.3431 11 27 12.3431 27 14C27 15.6569 28.3431 17 30 17Z"
                fill="#9D2449"
              />
              <path
                d="M10 17C11.6569 17 13 15.6569 13 14C13 12.3431 11.6569 11 10 11C8.34315 11 7 12.3431 7 14C7 15.6569 8.34315 17 10 17Z"
                fill="#9D2449"
              />
              <path d="M10 17C10 17 13 25 20.5 25C28 25 30 17 30 17" stroke="#9D2449" strokeWidth="2" />
            </svg>
            
          </div> */}
          <h2 className="header-title">Setup Fundraiser</h2>
        </div>
      </header>

      <main className="fundraiser-main">
        {/* Progress indicator */}
        <div className="progress-indicator">
          <div className="progress-steps">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className={`progress-step ${step >= stepNumber ? "active" : ""}`}>
                {stepNumber}
              </div>
            ))}
          </div>
          <div className="progress-line">
            <div className="progress-line-fill" style={{ width: `${(step - 1) * 25}%` }}></div>
          </div>
        </div>

        {/* Step 1: Select Beneficiary */}
        {step === 1 && (
          <div className="beneficiary-selection">
            <h3 className="step-title">Who is the beneficiary?</h3>

            <div className="selection-options">
              {["myself", "family", "friends", "other"].map((type) => (
                <div
                  key={type}
                  className={`option-item ${selectedBeneficiary === type ? "selected" : ""}`}
                  onClick={() => selectBeneficiary(type)}
                >
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
              ))}
            </div>

            <div className="next-button-container">
              <button className="next-button" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Enter Beneficiary Details */}
        {step === 2 && (
          <div className="beneficiary-form-container">
            <h3 className="step-title">Enter Beneficiary Details</h3>

            <div className="beneficiary-form">
              <div className="form-group">
                <label htmlFor="name">
                  Beneficiary Name <span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={beneficiaryDetails.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className={showErrors && formErrors.name ? "input-error" : ""}
                />
                {showErrors && formErrors.name && <div className="error-message">{formErrors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="age">
                  Age <span className="required-mark">*</span>
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={beneficiaryDetails.age}
                  onChange={handleInputChange}
                  placeholder="Enter age"
                  className={showErrors && formErrors.age ? "input-error" : ""}
                />
                {showErrors && formErrors.age && <div className="error-message">{formErrors.age}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="location">
                  Location <span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={beneficiaryDetails.location}
                  onChange={handleInputChange}
                  placeholder="Enter city, state"
                  className={showErrors && formErrors.location ? "input-error" : ""}
                />
                {showErrors && formErrors.location && <div className="error-message">{formErrors.location}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">
                  Phone Number <span className="required-mark">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={beneficiaryDetails.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className={showErrors && formErrors.phoneNumber ? "input-error" : ""}
                />
                {showErrors && formErrors.phoneNumber && <div className="error-message">{formErrors.phoneNumber}</div>}
              </div>
            </div>

            <div className="button-group">
              <button className="back-button" onClick={handleBack}>
                Back
              </button>
              <button className="next-button" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Campaign Details */}
        {step === 3 && (
          <div className="fundraiser-details-container">
            <h3 className="step-title">Campaign Details</h3>

            <div className="fundraiser-form">
              {/* <div className="form-group">
                <label htmlFor="category">
                  Category <span className="required-mark">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={campaignDetails.category}
                  onChange={handleCampaignInputChange}
                  className={showErrors && formErrors.category ? "input-error" : ""}
                >
                  <option value="">Select a category</option>
                  <option value="medicine">Medicine</option>
                  <option value="sports">Sports</option>
                  <option value="marriage">Marriage</option>
                  <option value="emergency">Emergency</option>
                  <option value="child">Child</option>
                </select>
                {showErrors && formErrors.category && <div className="error-message">{formErrors.category}</div>}
              </div> */}


              <div className="form-group">
                <label htmlFor="category">
                  Category <span className="required-mark">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={campaignDetails.category}
                  onChange={handleCampaignInputChange}
                  className={showErrors && formErrors.category ? "input-error" : ""}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
                {showErrors && formErrors.category && <div className="error-message">{formErrors.category}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="amount">
                  Amount to be Raised (₹) <span className="required-mark">*</span>
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={campaignDetails.amount}
                  onChange={handleCampaignInputChange}
                  placeholder="Enter amount"
                  className={showErrors && formErrors.amount ? "input-error" : ""}
                />
                {showErrors && formErrors.amount && <div className="error-message">{formErrors.amount}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="duration">
                  Within How Many Days <span className="required-mark">*</span>
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={campaignDetails.duration}
                  onChange={handleCampaignInputChange}
                  placeholder="Enter number of days"
                  className={showErrors && formErrors.duration ? "input-error" : ""}
                />
                {showErrors && formErrors.duration && <div className="error-message">{formErrors.duration}</div>}
              </div>
            </div>

            <div className="button-group">
              <button className="back-button" onClick={handleBack}>
                Back
              </button>
              <button className="next-button" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Fundraiser Details with Photo Upload */}
        {step === 4 && (
          <div className="fundraiser-details-container">
            <h3 className="step-title">Fundraiser Details</h3>

            <div className="fundraiser-form">
              <div className="form-group">
                <label htmlFor="photo">
                  Upload Photo <span className="required-mark">*</span>
                </label>
                <div className="photo-upload-container">
                  {fundraiserDetails.photoPreview && (
                    <div className="photo-preview">
                      <img src={fundraiserDetails.photoPreview || "/placeholder.svg"} alt="Preview" />
                    </div>
                  )}
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="photo-input"
                  />
                  <label
                    htmlFor="photo"
                    className={`photo-upload-button ${showErrors && formErrors.photo ? "button-error" : ""}`}
                  >
                    {fundraiserDetails.photo ? "Change Photo" : "Select Photo"}
                  </label>
                  {showErrors && formErrors.photo && <div className="error-message">{formErrors.photo}</div>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="title">
                  Fundraiser Title <span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={fundraiserDetails.title}
                  onChange={handleFundraiserInputChange}
                  placeholder="Enter a compelling title"
                  className={showErrors && formErrors.title ? "input-error" : ""}
                />
                {showErrors && formErrors.title && <div className="error-message">{formErrors.title}</div>}
              </div>

              <div className="form-group story-group">
                <label htmlFor="story">
                  Your Story <span className="required-mark">*</span>
                </label>
                <textarea
                  id="story"
                  name="story"
                  value={fundraiserDetails.story}
                  onChange={handleFundraiserInputChange}
                  placeholder="Share your story and why you're raising funds..."
                  rows="6"
                  className={`story-textarea ${showErrors && formErrors.story ? "input-error" : ""}`}
                ></textarea>
                {showErrors && formErrors.story && <div className="error-message">{formErrors.story}</div>}
              </div>
            </div>

            <div className="button-group">
              <button className="back-button" onClick={handleBack}>
                Back
              </button>
              <button className="next-button" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Review and Submit */}
        {step === 5 && (
          <div className="final-summary-container">
            <h3 className="step-title">Review Your Fundraiser</h3>

            <div className="summary-grid">
              {/* Beneficiary Section */}
              <div className="summary-section">
                <h4 className="section-title">Beneficiary Information</h4>
                <div className="summary-content">
                  <div className="info-row">
                    <div className="info-label">Type:</div>
                    <div className="info-value">
                      {selectedBeneficiary.charAt(0).toUpperCase() + selectedBeneficiary.slice(1)}
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Name:</div>
                    <div className="info-value">
                      {beneficiaryDetails.name || <span className="error-text">Required</span>}
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Age:</div>
                    <div className="info-value">
                      {beneficiaryDetails.age || <span className="error-text">Required</span>}
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Location:</div>
                    <div className="info-value">
                      {beneficiaryDetails.location || <span className="error-text">Required</span>}
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Phone Number:</div>
                    <div className="info-value">
                      {beneficiaryDetails.phoneNumber || <span className="error-text">Required</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Details Section */}
              <div className="summary-section">
                <h4 className="section-title">Campaign Details</h4>
                <div className="summary-content">
                  <div className="info-row">
                    <div className="info-label">Category:</div>
                    <div className="info-value">
                      {campaignDetails.category ? (
                        campaignDetails.category.charAt(0).toUpperCase() + campaignDetails.category.slice(1)
                      ) : (
                        <span className="error-text">Required</span>
                      )}
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Amount to Raise:</div>
                    <div className="info-value">
                      {campaignDetails.amount ? (
                        `₹${campaignDetails.amount}`
                      ) : (
                        <span className="error-text">Required</span>
                      )}
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Duration:</div>
                    <div className="info-value">
                      {campaignDetails.duration ? (
                        `${campaignDetails.duration} days`
                      ) : (
                        <span className="error-text">Required</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fundraiser Details Section */}
              <div className="summary-section">
                <h4 className="section-title">Fundraiser Details</h4>
                <div className="summary-content">
                  {fundraiserDetails.photoPreview ? (
                    <div className="summary-photo">
                      <img src={fundraiserDetails.photoPreview || "/placeholder.svg"} alt="Fundraiser" />
                    </div>
                  ) : (
                    <div className="missing-photo error-text">Photo required</div>
                  )}

                  <div className="info-row">
                    <div className="info-label">Title:</div>
                    <div className="info-value">
                      {fundraiserDetails.title || <span className="error-text">Required</span>}
                    </div>
                  </div>

                  <div className="info-row story-row">
                    <div className="info-label">Story:</div>
                    <div className="info-value">
                      {fundraiserDetails.story ? (
                        <div className="story-text">{fundraiserDetails.story}</div>
                      ) : (
                        <span className="error-text">Required</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Validation Errors Summary */}
            {Object.keys(formErrors).length > 0 && (
              <div className="validation-errors">
                <h4 className="error-heading">Please fix the following issues:</h4>
                <ul className="error-list">
                  {Object.entries(formErrors).map(([field, message]) => (
                    <li key={field} className="error-item">
                      {message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="terms-container">
              <label className="terms-label">
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                <span>
                  I accept all terms and conditions <span className="required-mark">*</span>
                </span>
              </label>
              {showErrors && formErrors.terms && <div className="terms-error error-text">{formErrors.terms}</div>}
            </div>

            <div className="button-group">
              <button className="back-button" onClick={handleBack}>
                Back
              </button>
              <button
                className={`next-button ${!isFormValid ? "disabled" : ""}`}
                onClick={handleNext}
                disabled={!isFormValid}
              >
                Submit Fundraiser
              </button>
            </div>

            {/* Refresh Button */}
            <div className="next-button-container" style={{ marginTop: "20px" }}>
              <button className="back-button" onClick={resetForm}>
                Refresh Form
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
    <Footer/>

  </>
  )
}

export default FundraiserForm

