"use client"

import { useState } from "react"
import "./Fund.css"

function Fund() {
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("myself")

  const selectBeneficiary = (type) => {
    setSelectedBeneficiary(type)
  }

  return (
    <div className="fundraiser-container">
      {/* Header */}
      <header className="fundraiser-header">
        <div className="header-content">
          <div className="logo-container">
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
            <h1 className="logo-text">Milaap</h1>
          </div>
          <h2 className="header-title">Setup fundraiser</h2>
        </div>
      </header>

      <main className="fundraiser-main">
        {/* Beneficiary Card - Centered */}
        <div className="beneficiary-card-container">
          <div className="beneficiary-card">
            <h3 className="beneficiary-card-title">Beneficiary details</h3>
          </div>
        </div>

        {/* Beneficiary Selection - Always visible */}
        <div className="beneficiary-selection">
          <div className="selection-header">
            <span>This fundraiser will benefit</span>
          </div>

          <div className="selection-options">
            {/* Myself option */}
            <div
              className={`option-item ${selectedBeneficiary === "myself" ? "selected" : ""}`}
              onClick={() => selectBeneficiary("myself")}
            >
              <span>Myself</span>
            </div>


            <div
              className={`option-item ${selectedBeneficiary === "myself" ? "selected" : ""}`}
              onClick={() => selectBeneficiary("myself")}
            >
              <span>Family</span>
            </div>
            <div
              className={`option-item ${selectedBeneficiary === "myself" ? "selected" : ""}`}
              onClick={() => selectBeneficiary("myself")}
            >
              <span>Friends</span>
            </div>
            <div
              className={`option-item ${selectedBeneficiary === "myself" ? "selected" : ""}`}
              onClick={() => selectBeneficiary("myself")}
            >
              <span>Other</span>
            </div>

           

            
          </div>

          {/* Next Button */}
          <div className="next-button-container">
            <button className="next-button">Next</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Fund

