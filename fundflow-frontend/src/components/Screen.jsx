"use client"

import { useState, useEffect } from "react"
import "./Screen.css"
import { useParams } from "react-router-dom"
import api from "../utils/axiosConfig"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useNavigate } from "react-router-dom";


function Screen() {
  const { id } = useParams() // Get the campaign ID from URL
  // console
  const [campaign, setCampaign] = useState({ campaign_title: "" })
  const [updates, setUpdates] = useState([])
  const [activeTab, setActiveTab] = useState("story")
  const [showQR, setShowQR] = useState(true)
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [donationAmount, setDonationAmount] = useState("")
  const [totalAmount, setTotalAmount] = useState("0")
  const [note, setNote] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await api.get(`/api/campaign/${id}`)
        console.log(response.data)
        setCampaign(response.data)
      } catch (error) {
        console.error("Error fetching campaign:", error)
      }
    }
    // Fetch campaign updates
    const fetchUpdates = async () => {
      try {
        const response = await api.get(`/api/updates/${id}`)
        console.log(response.data)
        setUpdates(response.data)
      } catch (error) {
        console.error("Error fetching updates:", error)
      }
    }

    // Fetch supporters (donations)
    const fetchSupporters = async () => {
      try {
        const response = await api.get(`/api/donations/${id}`)
        // setSupporters(response.data);
      } catch (error) {
        console.error("Error fetching supporters:", error)
      }
    }

    fetchUpdates()
    // fetchSupporters();
    fetchCampaign()
  }, [id])

  const toggleQR = () => {
    setShowQR(!showQR)
  }

  const handleDonateClick = () => {
    setShowDonationModal(true)
  }

  const closeDonationModal = () => {
    setShowDonationModal(false)
  }

  const handleAmountChange = (e) => {
    const value = e.target.value
    // Only allow numbers and commas
    if (value === "" || /^[0-9,]+$/.test(value)) {
      setDonationAmount(value)
      setTotalAmount(value) // Set total amount directly to the entered amount
    }
  }

  const handleContinueToPay = () => {
    // window.location.href = "/Pay" // Navigate to Pay.jsx
    navigate("/Pay", {
      state: {
        amount: totalAmount,         
        campaignId: id,
        note: note              
      }
    }); 

  }

  const supporters = [
    {
      id: 1,
      initials: "MI",
      name: "FundFlow Impact User",
      amount: "₹10",
      note: "Matching payment towards Anonymous' contribution",
    },
    {
      id: 2,
      initials: "A",
      name: "Anonymous",
      amount: "₹100",
      note: "",
    },
    {
      id: 3,
      initials: "MI",
      name: "FundFlow Impact User",
      amount: "₹50",
      note: "Matching payment towards Vaibhav's contribution",
    },
    {
      id: 4,
      initials: "VG",
      name: "Vaibhav",
      amount: "₹500",
      note: "",
    },
  ]

  return (
    <>
      <Header />
      <div className="mlf2025_main_container">
        <div className="mlf2025_notice_banner">
          <p className="mlf2025_notice_text">FundFlow will not charge any fee on your donation to this fundraiser.</p>
        </div>

        <div className="mlf2025_content_wrapper">
          <div className="mlf2025_left_section">
            <h1 className="mlf2025_main_heading">{campaign.campaign_title}</h1>

            <div className="mlf2025_media_container">
              <div
                className="mlf2025_media_content"
                style={{
                  backgroundImage: `url(http://localhost:5000${campaign.campaign_photo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>

            <div className="mlf2025_tabs_container">
              <div className="mlf2025_tabs">
                <button
                  className={`mlf2025_tab ${activeTab === "story" ? "mlf2025_tab_active" : ""}`}
                  onClick={() => setActiveTab("story")}
                >
                  Story
                </button>
                <button
                  className={`mlf2025_tab ${activeTab === "updates" ? "mlf2025_tab_active" : ""}`}
                  onClick={() => setActiveTab("updates")}
                >
                  Updates ({updates.length})
                </button>
              </div>
            </div>

            <div className="mlf2025_tab_content">
              {activeTab === "story" ? (
                <div className="mlf2025_story_content">
                  <h2 className="mlf2025_story_title">{campaign.campaign_title}</h2>

                  <div className="mlf2025_story_text">{campaign.campaign_story}</div>

                  {/* Supporters Section */}
                  <div className="supporters_section">
                    <h2 className="supporters_heading">Supporters</h2>

                    <div className="supporters_divider">
                      <div className="diamond_divider"></div>
                      <div className="diamond_divider diamond_center"></div>
                      <div className="diamond_divider"></div>
                    </div>

                    <div className="supporters_notice">
                      <a href="#" className="supporters_notice_link">
                        Click here
                      </a>{" "}
                      if you are not able to find your donation listed below.
                    </div>

                    <div className="supporters_list">
                      {supporters.map((supporter) => (
                        <div key={supporter.id} className="supporter_item">
                          <div className="supporter_avatar">
                            <span className="supporter_initials">{supporter.initials}</span>
                          </div>
                          <div className="supporter_details">
                            <div className="supporter_name">{supporter.name}</div>
                            <div className="supporter_amount">{supporter.amount}</div>
                            {supporter.note && <div className="supporter_note">{supporter.note}</div>}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="view_all_container">
                      <a href="#" className="view_all_link">
                        View all supporters
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mlf2025_updates_content">
                  {updates.map((update) => {
                    return (
                      <div key={update.id} className="mlf2025_update_item">
                        <h3 className="mlf2025_update_title">{update.title}</h3>
                        <p className="mlf2025_update_date">
                          {new Date(update.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="mlf2025_update_text">{update.note}</p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="mlf2025_donation_sticky">
            <div className="donation_card">
              <div className="donation_header">
                <div className="donation_title_container">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="donation_icon"
                  >
                    <path
                      d="M3.5,9 C3.5,11.5 5.5,14 8,14 C9.5,14 10.5,13 10.5,13 L15,17.5 C15,17.5 15.5,18 16,18 C17,18 17.5,17 17.5,16.5 L17.5,9 C17.5,8 16.5,7 15.5,7 L5.5,7 C4.5,7 3.5,8 3.5,9 Z"
                      stroke="#333333"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>

                  <h2 className="donation_title">Donate</h2>
                </div>
                <a href="#" className="supporters_link">
                  {supporters.length} supporters
                </a>
              </div>

              <div className="progress_container">
                <div className="progress_circle_container">
                  <div className="progress_circle">
                    <div className="progress_circle_inner">
                      <span className="progress_percent">{campaign.percentage}%</span>
                    </div>
                  </div>
                </div>

                <div className="amount_container">
                  <p className="raised_label">Raised</p>
                  <div className="amount_wrapper">
                    <span className="amount_raised">Rs.{campaign.raised_amount}</span>
                  </div>
                  <div className="amount_goal_wrapper">
                    <span className="amount_goal">of Rs.{campaign.target_amount}</span>
                  </div>
                </div>
              </div>

              <button className="donate_button" onClick={handleDonateClick}>
                Donate now
              </button>

              <p className="payment_methods">Card, Netbanking, Cheque pickups</p>

              <div className="donation_features">
                <div className="feature_item">
                  <div className="feature_icon">🔒</div>
                  <div className="feature_text">Secure Payment</div>
                </div>
                <div className="feature_item">
                  <div className="feature_icon">📱</div>
                  <div className="feature_text">Multiple Payment Options</div>
                </div>
                <div className="feature_item">
                  <div className="feature_icon">💯</div>
                  <div className="feature_text">Zero Platform Fee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDonationModal && (
        <div className="donation-modal-overlay" onClick={closeDonationModal}>
          <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="donation-modal-header">
              <h2>Make a secure donation</h2>
              <button className="close-button" onClick={closeDonationModal}>
                ×
              </button>
            </div>
            <div className="donation-form">
              <div className="currency-amount-section" style={{ display: "flex", alignItems: "flex-end" }}>
                <div className="amount-group" style={{ flex: 1 }}>
                  <label>Amount</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "5px" }}>₹</span>
                    <input
                      type="text"
                      className="amount-input"
                      value={donationAmount}
                      onChange={handleAmountChange}
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </div>

              <div className="impact-message">
                FundFlow charges NO fees. We rely on donors like you to cover for our expenses. Thank you{" "}
                <span className="prayer-emoji">🙏</span>
              </div>

              <div style={{ padding: "15px 20px" }}>
                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="text"
                    placeholder="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 0",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      borderBottom: "1px solid #e0e0e0",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <button className="continue-button" onClick={handleContinueToPay}>
                Continue to pay ₹ {totalAmount}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default Screen