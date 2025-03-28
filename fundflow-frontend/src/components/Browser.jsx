"use client"
import { useState, useEffect, useRef } from "react"
import "./Home.css"
import "./Browser.css"
import { Header } from "./Header"
import { Footer } from "./Footer"
import api from '../utils/axiosConfig'
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from 'react-router-dom'

const filterCategories = [
  { id: "animals", label: "Animals", icon: "🐾" },
  { id: "arts_and_media", label: "Arts and Media", icon: "🎨" },
  { id: "children", label: "Children", icon: "👶" },
  { id: "community", label: "Community", icon: "🏘️" },
  { id: "creative_projects", label: "Creative Projects", icon: "🎭" },
  { id: "disaster_relief", label: "Disaster Relief", icon: "🌪️" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "elderly", label: "Elderly", icon: "👵" },
  { id: "emergencies", label: "Emergencies", icon: "🚑" },
  { id: "environment", label: "Environment", icon: "🌳" },
  { id: "health_wellness", label: "Health & Wellness", icon: "💪" },
  { id: "housing_homelessness", label: "Housing & Homelessness", icon: "🏠" },
  { id: "human_rights", label: "Human Rights", icon: "✊" },
  { id: "infrastructure", label: "Infrastructure Development", icon: "🏗️" },
  { id: "legal_aid", label: "Legal Aid", icon: "⚖️" },
  { id: "medical", label: "Medical", icon: "⚕️" },
  { id: "memorials", label: "Memorials", icon: "🕊️" },
  { id: "mental_health", label: "Mental Health", icon: "🧠" },
  { id: "others", label: "Others", icon: "📦" },
  { id: "refugee_support", label: "Refugee Support", icon: "🏕️" },
  { id: "religious_causes", label: "Religious Causes", icon: "🙏" },
  { id: "rural_development", label: "Rural Development", icon: "🌾" },
]

const categoryCards = [
  { id: "animals", label: "Animals", icon: "🐾" },
  { id: "children", label: "Children", icon: "👶" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "emergencies", label: "Emergencies", icon: "🚑" },
  { id: "medical", label: "Medical", icon: "⚕️" },
  { id: "memorials", label: "Memorials", icon: "🕊️" },
]

const Browse = () => {
  const [campaigns, setCampaigns] = useState([])
  const [filteredCampaigns, setFilteredCampaigns] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchRef = useRef(null)

  const navigate = useNavigate()

  // Fetch campaigns on component mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true)
      try {
        const response = await api.get("/api/latest-campaigns")
        console.log("Fetched campaigns:", response.data)
        setCampaigns(response.data)
        setFilteredCampaigns(response.data)
      } catch (err) {
        console.error("Error fetching campaigns:", err)
        toast.error(err.message || "Failed to fetch campaigns")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  // Handle search term changes with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const results = campaigns.filter(campaign => 
          campaign.campaign_title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setSearchResults(results.slice(0, 5)) // Limit to 5 results for dropdown
        setShowSearchResults(results.length > 0)
        
        // Also update the filtered campaigns for the main grid
        applyFiltersAndSearch()
      } else {
        setSearchResults([])
        setShowSearchResults(false)
        applyFiltersAndSearch()
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, campaigns, selectedFilters])

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleFilter = (filterId) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    )
  }

  const clearFilters = () => {
    setSelectedFilters([])
    applyFiltersAndSearch()
  }

  const applyFiltersAndSearch = () => {
    let results = [...campaigns]
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(campaign => 
        campaign.campaign_title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply category filters
    if (selectedFilters.length > 0) {
      results = results.filter(campaign => 
        // Check if campaign has categories that match any selected filter
        selectedFilters.some(filter => 
          campaign.category_name && campaign.category_name.includes(filter)
        )
      )
    }
    
    setFilteredCampaigns(results)
    setShowFilters(false)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    applyFiltersAndSearch()
    setShowSearchResults(false)
  }

  const selectSearchResult = (campaign) => {
    navigate(`/campaign/${campaign.campaign_id}`)
    setShowSearchResults(false)
  }

  const formatAmount = (amount) => {
    return `₹${(amount).toLocaleString("en-IN")}`
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      <Header />

      <div className="browse-container">
        <div className="banner">
          <p>Thousands are crowdfunding for various causes. Support a fundraiser today.</p>
          <span className="fist-icon">✊</span>
        </div>

        <div className="search-container" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Search fundraisers..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
              onFocus={() => searchTerm && setShowSearchResults(true)}
            />
          </form>
          
          {showSearchResults && searchResults.length > 0 && (
            <div className="search-results-dropdown">
              {searchResults.map(campaign => (
                <div 
                  key={campaign.campaign_id} 
                  className="search-result-item"
                  onClick={() => selectSearchResult(campaign)}
                >
                  <div className="search-result-image">
                    <img 
                      src={'http://localhost:5000' + campaign.campaign_photo || "/placeholder.svg"} 
                      alt={campaign.campaign_title} 
                    />
                  </div>
                  <div className="search-result-content">
                    <h4>{campaign.campaign_title}</h4>
                    <p>{formatAmount(campaign.raised_amount)} raised</p>
                  </div>
                </div>
              ))}
              <div className="search-result-footer">
                <button onClick={handleSearchSubmit}>
                  See all results ({filteredCampaigns.length})
                </button>
              </div>
            </div>
          )}
          
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
                <button className="filter-apply" onClick={applyFiltersAndSearch}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading campaigns...</p>
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="no-results">
            <h3>No campaigns found</h3>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
            <button onClick={clearFilters} className="clear-all-button">Clear all filters</button>
          </div>
        ) : (
          <div className="campaigns-grid">
            {filteredCampaigns.map((campaign) => (
              <div 
                key={campaign.campaign_id} 
                className="campaign-card" 
                onClick={() => navigate(`/campaign/${campaign.campaign_id}`)}
              >
                <div className="campaign-image">
                  <img 
                    src={'http://localhost:5000' + campaign.campaign_photo || "/placeholder.svg"} 
                    alt={campaign.campaign_title} 
                    
                  />
                  
                  {campaign.category_name && campaign.category_name.includes("tax_benefits") && (
                    <span className="tax-benefits">Tax benefits</span>
                  )}
                </div>
                <div className="campaign-content">
                  <h3>{campaign.campaign_title}</h3>
                  <div className="campaign-stats">
                    <div 
                      className="progress-circle" 
                      style={{ "--percentage": `${campaign.percentage || 0}%` }}
                    >
                      <span className="percentage">{campaign.percentage || 0}%</span>
                    </div>
                    <div className="stats-text">
                      <div className="raised">
                        <span>Raised</span>
                        <strong>{formatAmount(campaign.raised_amount || 0)}</strong>
                      </div>
                      <div className="created-by">
                        <span>Created by</span>
                        <strong>{campaign.user_name}</strong>
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
        )}
      </div>
      <Footer />
    </>
  )
}

export default Browse
