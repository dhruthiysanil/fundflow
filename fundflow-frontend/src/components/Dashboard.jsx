import { useState, useEffect } from "react"
import "./Dashboard.css"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { toast, ToastContainer } from "react-toastify";
import api from '../utils/axiosConfig';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("fundraisers")
  const [userName, setUserName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [storyContent, setStoryContent] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaign, setActiveCampaign] = useState(null)
  const [donationData, setDonationData] = useState([]);

  const fundraiserData = {
    title: "Support Aditya 1160",
    id: "support-aditya-1160",
    image: "/placeholder.svg?height=200&width=350",
    category: "education",
    raised: 0,
    goal: 25000,
    daysLeft: 26,
    story: "This is the current story content."
  }

  // const donationData = [
  //   {
  //     id: 1,
  //     title: "Support Bhabyalakshmi",
  //     slug: "support-bhabyalakshmi",
  //     image: "/placeholder.svg?height=200&width=350",
  //     description: "My Mother Needs Your Help To Recover From Septic shock",
  //     amount: 200,
  //   },
  //   {
  //     id: 2,
  //     title: "Help Ayaansh 12",
  //     slug: "support-ayaansh-gupta-5",
  //     image: "/placeholder.svg?height=200&width=350",
  //     description: "Medical support for Ayaansh",
  //     amount: 500,
  //   },
  // ]


  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get("/api/my-campaigns");
        console.log(response.data)
        setCampaigns(response.data); // Update state with API response
      } catch (err) {
        toast.error(err.message); // Handle errors
      }
    };

    const fetchDonations = async () => {
      try {
        const response = await api.get(`/api/my-donations`);
        setDonationData(response.data);
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };

    fetchDonations();
    fetchCampaigns();
  }, []);


  useEffect(() => {
    // Replace with actual API call
    // fetch("/api/user") // Example endpoint
    //   .then((res) => res.json())
    //   .then((data) => setUserName(data.name))
    //   .catch((error) => console.error("Error fetching user:", error));



    const fetchUser = async () => {
      try {
        const response = await api.get("/api/user");
        console.log(response.data)
        setUserName(response.data.name) // Update state with API response
      } catch (err) {
        toast.error(err.message); // Handle errors
      }
    };

    fetchUser();
    // Initialize story content from fundraiserData
    // setStoryContent("");
  }, []);

  const handleUpdateClick = (campaignId) => {
    setActiveCampaign(campaignId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setStoryContent("")
    setIsDialogOpen(false);
  };

  // const handleSaveStory = () => {
  //   // Here you would typically make an API call to save the updated story
  //   console.log("Saving story:", storyContent);
  //   // For now, just close the dialog
  //   setIsDialogOpen(false);
  // };

  const handleSaveStory = async (id) => {
    try {
      const response = await api.put("/api/update-story", { campaignId: activeCampaign, content: storyContent });
      const data = response.data;

      if (data.updated) {
        setStoryContent("");
        toast.success(data.message || "Story updated successfully!");
      } else {
        toast.error(data.message || "Failed to update story.");
      }
    } catch (error) {
      toast.error("Failed to save story. Please try again.");
      console.error("Error saving story:", error);
    } finally {
      setIsDialogOpen(false);
    }
  };


  const handleDeleteFundraiser = () => {
    if (window.confirm("Are you sure you want to delete this fundraiser? This action cannot be undone.")) {
      // Here you would typically make an API call to delete the fundraiser
      console.log("Deleting fundraiser:", fundraiserData.id);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />

      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="profile-section">
            <div className="profile-image">
              <span>a</span>
            </div>
            <div className="profile-info">
              <h1>{userName}'s Dashboard</h1>
              <div className="profile-details">
                <div className="detail-item">
                  <p className="detail-label">Latest Contribution:</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Impact Areas:</p>
                  <p className="detail-value">None</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === "fundraisers" ? "active" : ""}`}
            onClick={() => setActiveTab("fundraisers")}
          >
            My Fundraisers
          </button>
          <button
            className={`tab-button ${activeTab === "donations" ? "active" : ""}`}
            onClick={() => setActiveTab("donations")}
          >
            My Donations
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === "fundraisers" ? (
            // <div className="fundraisers-content">
            //   <div className="fundraiser-card">
            //     <div className="fundraiser-image-container">
            //       <img
            //         src={fundraiserData.image || "/placeholder.svg"}
            //         alt={fundraiserData.title}
            //         className="fundraiser-image"
            //       />
            //       <span className="category-badge">{fundraiserData.category}</span>
            //     </div>
            //     <div className="fundraiser-details">
            //       <h2 className="fundraiser-title">{fundraiserData.title}</h2>
            //       <p className="fundraiser-id">{fundraiserData.id}</p>
            //       <div className="fundraiser-stats">
            //         <div className="stat-column">
            //           <p className="stat-label">Raised</p>
            //           <p className="stat-value">Rs.{fundraiserData.raised}</p>
            //         </div>
            //         <div className="stat-column">
            //           <p className="stat-label">Goal</p>
            //           <p className="stat-value">{fundraiserData.goal}</p>
            //         </div>
            //       </div>
            //       <p className="days-left">{fundraiserData.daysLeft} days to go</p>
            //       <div className="fundraiser-actions">
            //         <button className="update-fundraiser-btn" onClick={handleUpdateClick}>Update Fundraiser</button>
            //         <button className="delete-fundraiser-btn" onClick={handleDeleteFundraiser}>Delete</button>
            //       </div>
            //     </div>
            //   </div>
            // </div>




            <div className="fundraisers-content">
              {campaigns.map((fundraiser) => (
                <div className="fundraiser-card" key={fundraiser.campaign_id}>
                  <div className="fundraiser-image-container">
                    <img
                      src={`http://localhost:5000${fundraiser.campaign_photo}` || "/placeholder.svg"}
                      alt={fundraiser.campaign_title}
                      className="fundraiser-image"
                    />
                    <span className="category-badge">{fundraiser.category_name}</span>
                  </div>
                  <div className="fundraiser-details">
                    <h2 className="fundraiser-title">{fundraiser.campaign_title}</h2>

                    <div className="fundraiser-stats">
                      <div className="stat-column">
                        <p className="stat-label">Raised</p>
                        <p className="stat-value">Rs.{fundraiser.raised_amount}</p>
                      </div>
                      <div className="stat-column">
                        <p className="stat-label">Goal</p>
                        <p className="stat-value">{fundraiser.target_amount}</p>
                      </div>
                    </div>
                    <p className="days-left">{fundraiser.daysRemaining} days to go</p>
                    <div className="fundraiser-actions">
                      <button className="update-fundraiser-btn" onClick={() => handleUpdateClick(fundraiser.campaign_id)}>
                        Update Fundraiser
                      </button>
                      <button className="delete-fundraiser-btn" onClick={() => handleDeleteFundraiser(fundraiser.campaign_id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          ) : (
            <div className="donations-page">
              <div className="donations-header">
                <h2 className="donations-title">Project details and status</h2>
                <h2 className="donations-amount-title">You contributed</h2>
              </div>

              {/* <div className="donations-list">
                {donationData.map((donation) => (
                  <div className="donation-item" key={donation.id}>
                    <div className="donation-details">
                      <div className="donation-image-container">
                        <div className="donation-image-overlay">
                        <img src={donation.image ? `http://localhost:5000${donation.image}` : "/placeholder.svg"} alt={donation.title} className="donation-image" />
                          <p>{donation.description}</p>
                        </div>
                      </div>
                      <div className="donation-info">
                        <h3 className="donation-title">{donation.title}</h3>
                        <p className="donation-slug">{donation.slug}</p>
                      </div>
                    </div>
                    <div className="donation-amount">
                      <p>Rs.{donation.amount}</p>
                    </div>
                  </div>
                ))}
              </div> */}


              <div className="donations-list">
                {donationData.map((donation) => (
                  <div className="donation-item" key={donation.id} style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "16px", marginBottom: "20px", display: "flex", gap: "20px", alignItems: "center" }}>

                    <img
                      src={donation.image ? `http://localhost:5000${donation.image}` : "/placeholder.svg"}
                      alt={donation.title}
                      style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                    />

                    <div style={{ flexGrow: 1 }}>
                      <h3 style={{ margin: "0", fontSize: "18px" }}>{donation.title}</h3>
                      <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
                        <strong>Campaign ID:</strong> {donation.campaign_id}
                      </p>
                      <p style={{ margin: "4px 0", fontSize: "14px", color: "#444" }}>
                        <strong>Note:</strong> {donation.note || "—"}
                      </p>
                    </div>

                    <div style={{ minWidth: "80px", textAlign: "right" }}>
                      <p style={{ fontWeight: "bold", fontSize: "16px" }}>₹{donation.amount}</p>
                    </div>
                  </div>
                ))}
              </div>


            </div>
          )}
        </div>
      </div>

      {/* Update Story Dialog */}
      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <div className="dialog-header">
              <h2>Update Your Story</h2>
              <button className="dialog-close-btn" onClick={handleCloseDialog}>&times;</button>
            </div>
            <div className="dialog-body">
              <textarea
                className="story-textarea"
                value={storyContent}
                onChange={(e) => setStoryContent(e.target.value)}
                placeholder="Share your story here..."
                rows={10}
              ></textarea>
            </div>
            <div className="dialog-actions">
              <button className="dialog-cancel-btn" onClick={handleCloseDialog}>Cancel</button>
              <button className="dialog-save-btn" onClick={handleSaveStory}>Save</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default Dashboard