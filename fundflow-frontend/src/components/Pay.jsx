import React, { useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Pay.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import razor from "../components/razor.jpg";
import c from "../components/c.jpg";
import { useLocation } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Pay() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const location = useLocation();
  const amount = location.state?.amount || "0.00";
  const campaignId = location.state?.campaignId || "-1";
  const note = location.state?.note || "";

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value === "" || /^[0-9]+$/.test(value)) {
      const formattedValue = value.match(/.{1,4}/g)?.join(" ") || "";
      setCardNumber(formattedValue.slice(0, 19));
    }
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      let formattedValue = value;
      if (value.length > 2) {
        formattedValue = value.slice(0, 2) + "/" + value.slice(2);
      }
      setExpiryDate(formattedValue);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setCvv(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await axiosInstance.post("/api/payment", {
        amount,
        cardNumber,
        expiryDate,
        cvv,
        cardholderName,
        campaignId, 
        note
      });

      if (response.data.success) {
        setTransactionId(response.data.transactionId);
        setPaymentSuccess(true);
      } else {
        toast.error("Payment unsuccessful!");
      }
    } catch (error) {
      toast.error("Server error! Try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="pay-container">
        {!paymentSuccess ? (
          <>
            <div className="pay-header">
              <h2>Amount payable is</h2>
              <h1 className="pay-amount">₹{amount}</h1>
              <div className="pay-divider"></div>
            </div>

            <div className="pay-content">
              <div className="payment-method-section">
                <h3>Select a payment method</h3>

                <div className="payment-method-option selected">
                  <div className="payment-method-icon credit-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#0066FF">
                      <rect x="2" y="5" width="20" height="14" rx="2" stroke="#0066FF" strokeWidth="2" fill="none" />
                      <line x1="2" y1="10" x2="22" y2="10" stroke="#0066FF" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="payment-method-details">
                    <div className="payment-method-title">Credit/Debit Card</div>
                    <div className="payment-method-subtitle">Visa, Mastercard, Maestro, RuPay</div>
                  </div>
                </div>
              </div>

              <div className="payment-form-section">
                <h3>Pay with Credit/Debit Card</h3>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="0000 0000 0000 0000"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="password"
                      id="cvv"
                      value={cvv}
                      onChange={handleCvvChange}
                      placeholder="•••"
                      required
                      maxLength="4"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardholderName">Cardholder's Name</label>
                    <input
                      type="text"
                      id="cardholderName"
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                      placeholder="Name as on card"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="pay-now-button"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "PROCESSING..." : "PAY NOW"}
                  </button>
                </form>

                <div className="powered-by">
                  Powered by <img src={razor || "/placeholder.svg"} alt="Razorpay" className="razorpay-logo" />
                </div>
              </div>
            </div>

            <div className="payment-footer">
              <div className="payment-cards">
                <img src={c || "/placeholder.svg"} alt="Razorpay" className="razorpay-logo" />
              </div>
              <div className="payment-disclaimer">
                Accept, process and disburse digital payments for your business.
                <a href="#" className="know-more">Know more.</a>
              </div>
              <div className="payment-processor">
                <img src={razor || "/placeholder.svg"} alt="Razorpay" className="razorpay-logo" />
                
              </div>
            </div>
          </>
        ) : (
          <div className="success-section">
            <div className="success-animation">
              <DotLottieReact
                src="https://lottie.host/342d99f7-fbd3-48b6-87e8-e42c0ff0ce2b/auqmXYJvPQ.lottie"
                loop
                autoplay
              />
            </div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your donation.</p>
            <p><strong>Transaction ID:</strong> {transactionId}</p>
            <p><strong>Amount Paid:</strong> ₹{amount}</p>
            <button 
              onClick={() => window.location.href = "/"} 
              className="pay-now-button" 
              style={{ marginTop: "20px", maxWidth: "200px" }}
            >
              Return Home
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Pay;