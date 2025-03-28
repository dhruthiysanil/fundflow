"use client"

import { useState } from "react"
import "./How.css"
import { Footer } from "./Footer"
import { Header } from "./Header"
import a from "../components/a.jpg"


function CrowdfundingPage() {
  // Add state for FAQ accordion
  const [openFaq, setOpenFaq] = useState(null)

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "How do I raise funds?",
      answer:
        "You can start raising funds by clicking the 'Start Now' button and following our simple setup process. We'll guide you through creating your fundraiser page, setting your goal, and sharing your cause.",
    },
    {
      id: 2,
      question: "Can I raise funds for a friend as well?",
      answer:
        "Yes, you can absolutely raise funds on behalf of a friend. You'll need to provide some basic information about them and explain your relationship to ensure transparency for donors.",
    },
    {
      id: 3,
      question: "Does the raised amount reach the individual directly?",
      answer:
        "Yes, the raised amount is transferred directly to the beneficiary's bank account after deducting the platform's processing fees. We ensure complete transparency in the transfer process.",
    },
    {
      id: 4,
      question: "Is it safe?",
      answer:
        "Yes, our platform implements industry-standard security measures to protect all transactions and personal information. We use secure payment gateways and verify all fundraisers.",
    },
    {
      id: 5,
      question: "What if I don't reach my goal?",
      answer:
        "You can still withdraw the funds you've raised even if you don't reach your goal. There's no penalty, and you'll receive all donations minus the standard processing fees.",
    },
    {
      id: 6,
      question: "I have more questions, who do I write to?",
      answer:
        "You can reach our 24/7 support team through email, phone, or chat. We're always here to help you with any questions or concerns you may have about your fundraiser.",
    },
  ]

  // Toggle FAQ function
  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <>
    <Header/>
    <div className="crowdfunding-container">
      <div className="header-section">
        <h1>What is Crowdfunding?</h1>
        <p className="intro-text">
          In its simplest form, Crowdfunding is a practice of giving monetary funds to overcome specific social,
          cultural, or economic hurdles individuals face in their daily lives.
        </p>
      </div>

      <div className="content-section">
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/placeholder-video-id"
            title="What is Crowdfunding? | Ketto"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="explanation-container">
          <h2>So how does Crowdfunding work On FundFlow?</h2>
          <p className="explanation-text">
            Let us assume an individual, unfortunately, meets with an accident on the road. His medical expenses and
            hospital bills start piling up. Now he needs ₹5 Lakh to pay his expensive medical bills. Fortunately, his
            best friend signed up on FundFlow crowdfunding platform, completed the process of submitting valid documents
            needed for verification. In a few minutes, he created a crowdfunding campaign to raise funds for his
            friend's medical expenses. Now, this campaign can be shared with all his near and dear ones through
            WhatsApp, Instagram, Twitter, Facebook and E-mail. In a matter of few minutes, funds start coming in to
            support the financial needs of the injured friend.
          </p>
        </div>
      </div>

      <div className="cta-section">
        <p className="cta-text">Start a fund raiser with simple start</p>
        <button className="cta-button">Start Now</button>
      </div>

      {/* Process steps section - added based on the image */}
      <div className="process-section">
        <div className="process-step">
          <div className="process-icon-container">
            <img src="/placeholder.svg?height=60&width=60" alt="Start icon" className="process-icon" />
          </div>
          <div className="process-content">
            <h3 className="process-title">Start your fundraiser</h3>
            <p className="process-description">
              It'll take only 2 minutes. Just tell us a few details about you and the ones you are raising funds for.
            </p>
          </div>
          <div className="process-line"></div>
        </div>

        <div className="process-step">
          <div className="process-icon-container">
            <img src="/placeholder.svg?height=60&width=60" alt="Share icon" className="process-icon" />
          </div>
          <div className="process-content">
            <h3 className="process-title">Share your fundraiser</h3>
            <p className="process-description">
              All you need to do is share the fundraiser with your friends and family. In no time, support will start
              pouring in.
            </p>
            <p className="process-note">Share your fundraiser directly from dashboard on social media.</p>
          </div>
          <div className="process-line"></div>
        </div>

        <div className="process-step">
          <div className="process-icon-container">
           
          </div>
          <div className="process-content">
            <h3 className="process-title">Withdraw Funds</h3>
            <p className="process-description">
              The funds raised can be withdrawn without any hassle directly to your bank account.
            </p>
            <p className="process-note">It takes only 5 minutes to withdraw funds on ketto.</p>
          </div>
        </div>
      </div>
      {/* Features section - added based on the image */}
      <div className="features-section">
        <h2 className="features-heading">We provide everything you need</h2>

        <div className="features-grid">
          {/* Row 1 */}
          <div className="feature-item">
            <div className="feature-icon">
             
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Payout</h3>
              <p className="feature-description">
                This is your money, you can withdraw it at any point during the course of your fundraiser
              </p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              
            </div>
            <div className="feature-content">
              <h3 className="feature-title">International payment support</h3>
              <p className="feature-description">
                We accept donations in multiple currencies from anywhere in the world
              </p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
          
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Multiple people - Same Fundraiser</h3>
              <p className="feature-description">Multiple people manage and fundraise for your cause</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="feature-item">
            <div className="feature-icon">
             
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Personalized Web App</h3>
              <p className="feature-description">
                Get instant updates on your fundraiser's progress via instant alerts, email and track everything
                realtime on Ketto's web app
              </p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
            
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Dedicated Fundraiser expert</h3>
              <p className="feature-description">A dedicated fundraiser expert guides you through your fundraising</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
            
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Keep the raised amount</h3>
              <p className="feature-description">
                You will receive all the raised amount after the transactional, processing fee.
              </p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="feature-item">
          <div className="feature-icon">
              
            </div>
            
            
            <div className="feature-content">
              <h3 className="feature-title">24/7 support</h3>
              <p className="feature-description">
                We offer you 24*7 assistance via call, WhatsApp, Email, SMS and our Instant Chatting Interface
              </p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Advertising support</h3>
              <p className="feature-description">We provide marketing and promotional support for your fundraiser</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
             
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Fundraising Marketing tool</h3>
              <p className="feature-description">
                A highly intelligent marketing tool, which provides all insights on your fundraiser
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add FAQ section */}
      <div className="faq-section">
        <h2 className="faq-heading">FAQs</h2>
        <div className="faq-list">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <button
                className={`faq-question ${openFaq === faq.id ? "active" : ""}`}
                onClick={() => toggleFaq(faq.id)}
              >
                {faq.question}
                <span className={`faq-icon ${openFaq === faq.id ? "open" : ""}`}>▼</span>
              </button>
              <div className={`faq-answer ${openFaq === faq.id ? "open" : ""}`}>{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
    <Footer/>
      </>
  )
}

export default CrowdfundingPage

