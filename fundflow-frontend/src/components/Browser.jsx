"use client"

import { useState } from "react"
import "./Browser.css"

const campaigns = [
  {
    id: 1,
    title: "Support Subodh Gupta To Recover From Liver Cancer (HCC)",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20162628-WgKeGPQbxgxSFd0DbFDq3Zmsx1sBvj.png",
    raised: 1322838,
    target: 3000000,
    createdBy: "Sarthak Gupta",
    percentage: 44,
    categories: ["medical", "tax_benefits"], // Added categories
  },
  {
    id: 2,
    title: "Help Save My Wife Pranita – Urgent Liver Transplant Needed",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20162628-WgKeGPQbxgxSFd0DbFDq3Zmsx1sBvj.png",
    raised: 2940271,
    target: 3500000,
    createdBy: "Appu Nair",
    percentage: 84,
    categories: ["medical", "urgent"], // Added categories
  },
  {
    id: 3,
    title: "Help My Father To Recover From Coma",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20162628-WgKeGPQbxgxSFd0DbFDq3Zmsx1sBvj.png",
    raised: 991408,
    target: 4500000,
    createdBy: "Kunal Basu",
    percentage: 22,
    categories: ["medical", "urgent", "tax_benefits"], // Added categories
  },
  // Additional campaigns with similar structure
  {
    id: 4,
    title: "Support Education for Underprivileged Children",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20162628-WgKeGPQbxgxSFd0DbFDq3Zmsx1sBvj.png",
    raised: 755000,
    target: 1500000,
    createdBy: "Priya Sharma",
    percentage: 50,
    categories: ["education", "children"], // Added categories
  },
  {
    id: 5,
    title: "Emergency Medical Fund for Accident Victims",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20162628-WgKeGPQbxgxSFd0DbFDq3Zmsx1sBvj.png",
    raised: 1850000,
    target: 2000000,
    createdBy: "Dr. Rajesh Kumar",
    percentage: 92,
    categories: ["medical", "emergencies"], // Added categories
  },
  {
    id: 6,
    title: "Save Wildlife: Forest Conservation Project",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20162628-WgKeGPQbxgxSFd0DbFDq3Zmsx1sBvj.png",
    raised: 680000,
    target: 2000000,
    createdBy: "Green Earth Foundation",
    percentage: 34,
    categories: ["animals"], // Added categories
  },
  {
    id: 7,
    title: "Build Shelter for Homeless Families",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20162628-WgKeGPQbxgxSFd0DbFDq3Zmsx1sBvj.png",
    raised: 1200000,
    target: 3000000,
    createdBy: "Hope Foundation",
    percentage: 40,
    categories: ["emergencies"], // Added categories
  },
  {
    id: 8,
    title: "Clean Water Project for Rural Areas",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20162628-WgKeGPQbxgxSFd0DbFDq3Zmsx1sBvj.png",
    raised: 950000,
    target: 1500000,
    createdBy: "Water For All",
    percentage: 63,
    categories: ["emergencies"], // Added categories
  },
  {
    id: 9,
    title: "Support Artists During Pandemic",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20162628-WgKeGPQbxgxSFd0DbFDq3Zmsx1sBvj.png",
    raised: 450000,
    target: 1000000,
    createdBy: "Arts Council",
    percentage: 45,
    categories: [], // Added categories
  },
  {
    id: 10,
    title: "Save Pratheesh from Acute Liver Failure",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-19%20101519-EzBFUMSLjz9lud5aaQoKqZw6gFp3gy.png",
    raised: 592231,
    target: 5000000,
    createdBy: "Smitha",
    percentage: 11,
    categories: ["medical", "urgent"],
  },
  {
    id: 11,
    title: "Support Abhishek Das To Recover from Brain Stroke",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-19%20101519-EzBFUMSLjz9lud5aaQoKqZw6gFp3gy.png",
    raised: 433138,
    target: 2000000,
    createdBy: "Samson Prabhakar",
    percentage: 22,
    categories: ["medical", "urgent"],
  },
  {
    id: 12,
    title: "Help Aiswarya Get Life-Saving ICD Surgery",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-19%20101519-EzBFUMSLjz9lud5aaQoKqZw6gFp3gy.png",
    raised: 386045,
    target: 1200000,
    createdBy: "Aiswarya C",
    percentage: 32,
    categories: ["medical"],
  },
]

const filterCategories = [
  { id: "tax_benefits", label: "Provide tax benefits", icon: "💰" },
  { id: "urgent", label: "Need urgent help", icon: "🚨" },
  { id: "matching", label: "Match your donation", icon: "🤝" },
  { id: "medical", label: "Medical", icon: "⚕️" },
  { id: "memorials", label: "Memorials", icon: "🕊️" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "emergencies", label: "Emergencies", icon: "🚑" },
  { id: "children", label: "Children", icon: "👶" },
  { id: "animals", label: "Animals", icon: "🐾" },
  { id: "sports", label: "Sports", icon: "⚽" },
]

const categoryCards = [
  { id: "tax_benefits", label: "Provide tax benefits", icon: "💰" },
  { id: "urgent", label: "Need urgent help", icon: "🚨" },
  { id: "matching", label: "Match your donation", icon: "🤝" },
  { id: "medical", label: "Medical", icon: "⚕️" },
  { id: "memorials", label: "Memorials", icon: "🕊️" },
  { id: "education", label: "Education", icon: "📚" },
]

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([])

  const toggleFilter = (filterId) => {
    setSelectedFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  const clearFilters = () => {
    setSelectedFilters([])
  }

  const applyFilters = () => {
    setShowFilters(false)
    // Filter logic can be implemented here
  }

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      selectedFilters.every((filter) => campaign.categories.includes(filter)),
  )

  const formatAmount = (amount) => {
    return `₹${(amount).toLocaleString("en-IN")}`
  }

  return (
    <div className="browse-container">
      <div className="banner">
        <p>Thousands are crowdfunding for various causes. Support a fundraiser today.</p>
        <span className="fist-icon">✊</span>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search fundraisers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="refine-search" onClick={() => setShowFilters(true)}>
          Refine Search
        </button>
      </div>
      
      

      {showFilters && (
        <div className="filter-overlay">
          <div className="filter-panel">
            <div className="filter-header">
              <h2>Filter</h2>
              <button className="close-filter" onClick={() => setShowFilters(false)}>
                ×
              </button>
            </div>

            <div className="filter-content">
              <h3>See only specific type of causes</h3>

              <div className="filter-options">
                {filterCategories.map((category) => (
                  <label
                    key={category.id}
                    className={`filter-option ${selectedFilters.includes(category.id) ? "selected" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(category.id)}
                      onChange={() => toggleFilter(category.id)}
                    />
                    <span className="filter-icon">{category.icon}</span>
                    <span className="filter-label">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-actions">
              <button className="filter-cancel" onClick={() => setShowFilters(false)}>
                Cancel
              </button>
              <button className="filter-clear" onClick={clearFilters}>
                Clear
              </button>
              <button className="filter-apply" onClick={applyFilters}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="campaigns-grid">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-card">
            <div className="campaign-image">
              <img src={campaign.image || "/placeholder.svg"} alt={campaign.title} />
              {campaign.categories.includes("tax_benefits") && <span className="tax-benefits">Tax benefits</span>}
            </div>
            <div className="campaign-content">
              <h3>{campaign.title}</h3>
              <div className="campaign-stats">
                <div className="progress-circle" style={{ "--percentage": `${campaign.percentage}%` }}>
                  <span className="percentage">{campaign.percentage}%</span>
                </div>
                <div className="stats-text">
                  <div className="raised">
                    <span>Raised</span>
                    <strong>{formatAmount(campaign.raised)}</strong>
                  </div>
                  <div className="created-by">
                    <span>Created by</span>
                    <strong>{campaign.createdBy}</strong>
                  </div>
                </div>
              </div>
              <div className="contribution-note">
                For every ₹100 you donate, Milaap will contribute ₹10 on your behalf.
              </div>
              
            </div>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Browse

