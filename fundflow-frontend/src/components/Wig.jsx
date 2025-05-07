import React, { useState } from 'react';
import './Wig.css';



const DonationWidget = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showDonationOptions, setShowDonationOptions] = useState(false);

  const totalRaised = 593946;
  const goal = 500000;
  const supporters = 289;
  const percentageRaised = Math.min(Math.round((totalRaised / goal) * 100), 100);

  const predefinedAmounts = [100, 500, 1000, 5000];

  const handleDonateNow = () => {
    setShowDonationOptions(true);
  };

  return (
    <div className="donation-widget">
      <div className="donation-header">
        <div className="donation-title">
          <span className="donation-icon">🤲</span>
          <h2>Donate</h2>
        </div>
        <div className="supporters">
          <span>{supporters} supporters</span>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-circle">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="8"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="#32CD32"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 36}`}
              strokeDashoffset={`${2 * Math.PI * 36 * (1 - percentageRaised / 100)}`}
              transform="rotate(-90 40 40)"
            />
            <text
              x="40"
              y="45"
              textAnchor="middle"
              fontSize="16"
              fontWeight="bold"
              fill="#333"
            >
              {percentageRaised}%
            </text>
          </svg>
        </div>
        <div className="raised-info">
          <p className="raised-label">Raised</p>
          <p className="raised-amount">
            <span className="amount">Rs.{totalRaised.toLocaleString()}</span> of Rs.{goal.toLocaleString()}
          </p>
        </div>
      </div>

      <button className="donate-now-button" onClick={handleDonateNow}>
        Donate now
      </button>
      <p className="payment-methods">Card, Netbanking, Cheque pickups</p>

      <div className="divider">
        <span>Or Donate using</span>
      </div>

      {!showDonationOptions ? (
        <div className="quick-donate-section">
          <div className="quick-donate-amounts">
            {predefinedAmounts.map(amount => (
              <button 
                key={amount} 
                className="amount-button"
                onClick={() => setDonationAmount(amount)}
              >
                ₹{amount}
              </button>
            ))}
          </div>
          <div className="custom-amount">
            <input
              type="number"
              placeholder="Custom amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="custom-amount-input"
            />
          </div>
          <div className="anonymous-option">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
            />
            <label htmlFor="anonymous">Donate anonymously</label>
          </div>
          <button className="proceed-button">
            Proceed to payment
          </button>
        </div>
      ) : (
        <div className="donation-options">
          <p className="enter-amount-text">Enter amount to donate</p>
          <div className="amount-input-container">
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              className="amount-input"
              placeholder="Enter amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
          </div>
          <button className="proceed-button">
            Continue
          </button>
        </div>
      )}

      <p className="scan-text">Scan & donate with any app</p>
      
    </div>
  );
};

export default DonationWidget;