"use client"

import { useState } from "react"
import "./About.css"

const About = () => {
  const [openFaq, setOpenFaq] = useState(null)

  const aboutCards = [
    {
      id: 1,
      title: "Culture",
      image: "/culture.jpg",
      link: "/culture",
    },
    {
      id: 2,
      title: "In the news!",
      image: "/news.jpg",
      link: "/news",
    },
    {
      id: 3,
      title: "Careers",
      image: "/careers.jpg",
      link: "/careers",
    },
  ]

  const faqItems = [
    { question: "Is Milaap safe to use?", answer: "Yes, Milaap is completely safe to use. We employ industry-standard security measures to protect your information and transactions." },
    { question: "How much percentage does Milaap take?", answer: "Milaap operates on a voluntary contribution model. You can choose to contribute to support our platform operations." },
    { question: "How do I know if the money I donated reaches the beneficiary?", answer: "We provide complete transparency through regular updates and tracking of fund disbursement to beneficiaries." },
    { question: "Is my donation eligible for 80G tax exemption?", answer: "Yes, donations made to eligible campaigns on Milaap qualify for 80G tax exemption under Indian tax laws." },
    { question: "How do I get in touch with Milaap?", answer: "You can reach us through our support email, phone, or by filling out the contact form on our website." },
  ]

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Corrected image paths
  const missionImages = [
    "/images/i1.jpg",
    "/images/i2.jpg",
    "/images/i3.jpg",
    "/images/i3.jpg",
    "/images/i1.jpg",
    "/images/i1.jpg",
    "/images/i1.jpg",
  ]
  const betterCards = [
    {
      icon: "💡",
      title: "We pioneer tech innovations that aid human effort and intent",
      description:
        "Through our first-of-its-kind fundraising app and never-done-before storytelling tools, we are making fundraising easy, effortless and accessible to those who need it the most.",
    },
    {
      icon: "🤝",
      title: "We forge partnerships to multiply impact",
      description:
        "We have partnered with hospitals like Apollo, Fortis to reach every patient and brands like Grofers, PhonePe, Yatra etc to help fund those impacted by the pandemic.",
    },
    {
      icon: "0️⃣",
      title: "We responded to the pandemic with 0% platform fee",
      description:
        "Like each one, we did a bit more to help those fighting for their loved one's health during this time, by bringing down our fee to zero.",
    },
  ]

  return (
    <div className="about-container">
      <h2 className="about-title">Explore more about us</h2>
      <div className="about-grid">
        {aboutCards.map((card) => (
          <div key={card.id} className="about-card">
            <a href={card.link} className="card-link">
              <div className="image-container">
                <img src={card.image} alt={card.title} className="card-image" />
              </div>
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
              </div>
            </a>
          </div>
        ))}
      </div>

      <div className="mission-section">
        <h2 className="mission-title">Our Mission</h2>
        <h3 className="mission-heading">
          Make Healthcare Affordable To Save Lives Today, While Securing Families For A Better Tomorrow.
        </h3>
        <p className="mission-text">
          We are creating innovative technology and finance solutions to empower people to raise funds for medical
          emergencies and critical illnesses. Our platform has helped thousands change lives through timely contributions.
        </p>
      </div>

      <div className="image-scroll-container">
        <div className="image-scroll-track">
          {[...missionImages, ...missionImages].map((image, index) => (
            <div key={index} className="scroll-image-wrapper">
              <img src={image} alt={`Mission image ${index + 1}`} className="scroll-image" />
            </div>
          ))}
        </div>
      </div>

      <div className="faq-section">
        {faqItems.map((item, index) => (
          <div key={index} className="faq-item" onClick={() => toggleFaq(index)}>
            <div className="faq-question">
              {item.question}
              <span className="faq-icon">{openFaq === index ? "−" : "+"}</span>
            </div>
            {openFaq === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>

      <div className="quotes-section">
        <h2 className="quotes-title">Quotes from Founders</h2>
        <div className="quote-container">
          <blockquote className="quote-text">
            "Milaap prioritizes user success and security to make online fundraising easier, faster, and more trusted."
          </blockquote>
          <div className="quote-author">
            <div className="author-name">Mayukh Choudhary</div>
            <div className="author-title">Co-Founder & CEO</div>
          </div>
        </div>
      </div>
      <div className="better-section">
        <h2 className="better-title">What We Do Better</h2>
        <div className="better-grid">
          <div className="better-card">
            <div className="icon-wrapper">
              <svg width="80" height="80" viewBox="0 0 80 80" className="mint-icon">
                <defs>
                  <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4fd1c5" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4fd1c5" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  d="M40 10C23.4 10 10 23.4 10 40s13.4 30 30 30 30-13.4 30-30S56.6 10 40 10zm0 54c-13.2 0-24-10.8-24-24s10.8-24 24-24 24 10.8 24 24-10.8 24-24 24zm12-24c0 6.6-5.4 12-12 12s-12-5.4-12-12 5.4-12 12-12 12 5.4 12 12z"
                  fill="url(#iconGradient)"
                />
                <path d="M44 36l-8 8m0-8l8 8" stroke="#4fd1c5" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="better-card-title">We pioneer tech innovations that aid human effort and intent</h3>
            <p className="better-card-text">
              Through our first-of-its-kind fundraising app and never-done-before storytelling tools, we are making
              fundraising easy, effortless and accessible to those who need it the most.
            </p>
          </div>

          <div className="better-card">
            <div className="icon-wrapper">
              <svg width="80" height="80" viewBox="0 0 80 80" className="mint-icon">
                <defs>
                  <linearGradient id="handshakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4fd1c5" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4fd1c5" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  d="M60 35c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm-40 0c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm20 0c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"
                  fill="url(#handshakeGradient)"
                />
              </svg>
            </div>
            <h3 className="better-card-title">We forge partnerships to multiply impact</h3>
            <p className="better-card-text">
              We have partnered with hospitals like Apollo, Fortis to reach every patient and brands like Grofers,
              PhonePe, Yatra etc to help fund those impacted by the pandemic.
            </p>
          </div>

          <div className="better-card">
            <div className="icon-wrapper">
              <svg width="80" height="80" viewBox="0 0 80 80" className="mint-icon">
                <defs>
                  <linearGradient id="zeroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4fd1c5" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4fd1c5" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <text
                  x="50%"
                  y="50%"
                  fontSize="40"
                  fill="url(#zeroGradient)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  0%
                </text>
              </svg>
            </div>
            <h3 className="better-card-title">We responded to the pandemic with 0% platform fee</h3>
            <p className="better-card-text">
              Like each one, we did a bit more to help those fighting for their loved one's health during this time, by
              bringing down our fee to zero.
            </p>
          </div>
        </div>
      </div>
    </div>
    



  )
}

export default About
