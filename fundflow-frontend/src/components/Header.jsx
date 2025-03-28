"use client"

import { useState, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import img from "../components/i.jpg"
import "./Header.css"
import defaultProfileImg from "../components/i.jpg"; // Default profile image


export const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { user, isAuthenticated, logout, updateUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname


  const profileImageUrl = user?.profile_pic ? `http://localhost:5000${user.profile_pic}` : defaultProfileImg;
  // console.log(profile)

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile")
    } else {
      setShowDropdown(!showDropdown)
    }
  }

  const [showDialog, setShowDialog] = useState(false)

  const handleLogout = () => {
    setShowDialog(true) // Show the custom dialog box
  }

  const confirmLogout = () => {
    logout()
    setShowDialog(false) // Hide the custom dialog box
  }

  const handleClick = () => {
    navigate("/fund1") // This navigates to the fundraiser page
  }

  const handleDashBoard = () => {
    navigate("/Dashboard") // This navigates to the Dashboard page
  }

  // Helper function to check if a link is active
  const isActive = (path) => {
    if (path === "/" && currentPath === "/") return true
    if (path !== "/" && currentPath.startsWith(path)) return true
    return false
  }

  return (
    <>
      {showDialog && (
        <div
          className="dialog-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            className="dialog-box"
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            <p>Are you sure you want to log out?</p>
            <button
              onClick={confirmLogout}
              style={{
                margin: "10px",
                padding: "8px 16px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Yes
            </button>
            <button
              onClick={() => setShowDialog(false)}
              style={{
                margin: "10px",
                padding: "8px 16px",
                background: "gray",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <header className="full-width-header">
        <div className="header-container">
          <nav className="main-nav">
            <div className="nav-logo">
              <h1>FUND FLOW</h1>
            </div>

            <ul className="nav-links">
              <li>
                <a href="/" className={isActive("/") ? "active" : ""}>
                  Home
                </a>
              </li>
              <li>
                <a href="/Browser" className={isActive("/Browser") ? "active" : ""}>
                  Donate
                </a>
              </li>
              <li>
                <a href="/News" className={isActive("/News") ? "active" : ""}>
                  News
                </a>
              </li>
              <li>
                <a href="/How" className={isActive("/How") ? "active" : ""}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="/Contact" className={isActive("/Contact") ? "active" : ""}>
                  Contact
                </a>
              </li>
            </ul>

            <div className="nav-grp">
              <button className="donate-btn" onClick={handleClick}>
                Start a fundraiser
              </button>

              {isAuthenticated ? (
                <div className="profile-section">
                  <div className="profile-icon" onClick={() => setShowDropdown(!showDropdown)}>
                    <img  src={profileImageUrl || "/placeholder.svg"} alt="User profile" />
                  </div>

                  {showDropdown && (
                    <div className="profile-dropdown">
                      <button onClick={handleProfileClick} className="dropdown-btn">
                        Profile
                      </button>
                      <button onClick={handleDashBoard} className="dropdown-btn">
                        DashBoard
                      </button>
                      <button onClick={handleLogout} className="dropdown-btn">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button className="donate-btn" onClick={() => navigate("/login")}>
                  SIGN IN
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

