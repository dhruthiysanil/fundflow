import React, { useState } from 'react';
import './Donation.css';

function DonateForm() {
  const [amount, setAmount] = useState(2500);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    console.log('Processing payment for:', { amount, name, email, phone });
  };

  return (
    <div className="donate-modal">
      <div className="donate-header">
        <h2>Make a secure donation</h2>
        <button className="close-button">×</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="amount-section">
          <div className="amount-container">
            <div className="amount-label">Amount</div>
            <div className="amount-value">₹ {amount.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="message-section">
          <p>
            Milaap charges NO fees. We rely on donors like you to cover for our expenses. Kindly
            consider a tip. Thank you 🙏
          </p>
        </div>
        
        <div className="input-fields">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          <input
            type="email"
            placeholder="Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <div className="phone-input">
            <div className="country-code">+91</div>
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        
        <button type="submit" className="pay-button">
          Continue to pay ₹ {(amount).toLocaleString()}
        </button>
      </form>
    </div>
  );
}

export default DonateForm;