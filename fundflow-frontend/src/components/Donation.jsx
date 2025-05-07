"use client"

import { useState } from "react"

// interface DonationProps {
//   isOpen: boolean
//   onClose: () => void
//   campaignTitle?: string
// }

// const handlePayment = async () => {
//   const parsedTotal = parseInt(totalAmount.replace(/,/g, '')); // remove commas

//   const order = await axios.post("/api/payment/create-order", {
//     amount: parsedTotal,
//   });

//   const options = {
//     key: "rzp_test_1234567890", // Use your test key
//     amount: order.data.amount,
//     currency: "INR",
//     name: "FundFlow",
//     description: "Donation Payment",
//     order_id: order.data.id,
//     handler: async function (response) {
//       await axios.post("/api/payment/verify-payment", {
//         razorpay_order_id: response.razorpay_order_id,
//         razorpay_payment_id: response.razorpay_payment_id,
//         razorpay_signature: response.razorpay_signature,
//         campaignId: 1, // dynamically pass current campaign ID
//         donatedAmount: parsedTotal,
//         donorName: name,
//         email: email
//       });

//       alert("Payment successful! Thank you for your support 🙏");
//       onClose();
//     },
//     prefill: {
//       name,
//       email,
//       contact: phone,
//     },
//     theme: {
//       color: "#3399cc",
//     },
//   };

//   const rzp = new window.Razorpay(options);
//   rzp.open();
// };

export default function Donation({ isOpen, onClose, campaignTitle }) {
  const [amount, setAmount] = useState("")
  const [tipPercentage, setTipPercentage] = useState("16%")
  const [tipAmount, setTipAmount] = useState("400.00")
  const [totalAmount, setTotalAmount] = useState("2900")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  if (!isOpen) return null

  return (
    <div className="donation-modal-overlay" onClick={onClose}>
      <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="donation-modal-header">
          <h2>Make a secure donation</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="donation-form">
          <div className="currency-amount-section">
            <div className="amount-group">
              <label>Amount</label>
              <input type="text" className="amount-input" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
          </div>

          <div className="impact-message">
            FundFlow charges NO fees. We rely on donors like you to cover for our expenses. Kindly consider a tip. Thank
            you <span className="prayer-emoji">🙏</span>
          </div>

          <div className="tip-selector">
            <label>Include a tip of</label>
            <div className="tip-dropdown">
              {tipPercentage} (₹ {tipAmount}) <span className="dropdown-arrow">▼</span>
            </div>
          </div>

          <div className="form-fields" style={{ padding: "15px 20px" }}>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <div className="form-group" style={{ marginBottom: "15px", display: "flex" }}>
              <div
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e0e0e0",
                  marginRight: "10px",
                  width: "60px",
                }}
              >
                +91 ▼
              </div>
              
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="email"
                placeholder="Email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

          <div className="anonymous-toggle">
            <span>Donate anonymously</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <button className="continue-button">Continue to pay ₹ {totalAmount}</button>

          {/* <button className="continue-button" onClick={handlePayment}> 
            Continue to pay ₹ {totalAmount}
          </button> */}
        </div>
      </div>
    </div>
  )
}
