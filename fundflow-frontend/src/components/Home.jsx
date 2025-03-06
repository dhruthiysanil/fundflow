"use client"
import { useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import "./Home.css"
import i1 from "../components/i1.jpg"
import i2 from "../components/i2.jpg"
import i from "../components/i.jpg"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [showMoreCategories, setShowMoreCategories] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0) // Moved useState call here
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()


  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile")
    } else {
      setShowDropdown(!showDropdown)
    }
  }


  const handleLogin = () => {
    navigate("/login")
  }

  const handleRegister = () => {
    navigate("/Reg")
  }


  const [isLoggedIn, setIsLoggedIn] = useState(false)


  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const confirmLogout = () => {
    logout();
    setShowDialog(false); // Show the custom dialog box

  };

  const handleLogout = () => {
    setShowDialog(true); // Show the custom dialog box
  };

  // const handleLogout = () => {
  //   // Clear authentication (Example: localStorage or state management)
  //   localStorage.removeItem("userToken"); 
  //   window.location.href = "/Home"; // Redirect to login page after logout
  // };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const dropdownRef = useRef(null);
  const othersCardRef = useRef(null);

  const mainCategories = [
    { id: 1, name: 'Medical', icon: '🏥' },
    { id: 2, name: 'Memorials', icon: '🕯️' },
    { id: 3, name: 'Non-profits', icon: '❤️' },
    { id: 4, name: '18 others', icon: '⋯' }
  ];

  const dropdownCategories = [
    { id: 5, name: 'Education', icon: '👨‍🎓' },
    { id: 6, name: 'Emergencies', icon: '🚑' },
    { id: 7, name: 'Children', icon: '👶' },
    { id: 8, name: 'Animals', icon: '🐾' },
    { id: 9, name: 'Sports', icon: '⚽' },
    { id: 10, name: 'Community', icon: '👥' },
    { id: 11, name: 'Elderly', icon: '👴' },
    { id: 12, name: 'Arts & Media', icon: '📺' },
    { id: 13, name: 'Women', icon: '👩' },
    { id: 14, name: 'Technology', icon: '💻' }
  ];

  useEffect(() => {
    if (isDropdownOpen && othersCardRef.current && dropdownRef.current) {
      const cardRect = othersCardRef.current.getBoundingClientRect();
      dropdownRef.current.style.top = `${cardRect.bottom + window.scrollY}px`;
      dropdownRef.current.style.left = `${cardRect.left}px`;
    }
  }, [isDropdownOpen]);

  const handleOthersClick = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        !othersCardRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);





  const blogPosts = [
    {
      category: "CHARITY",
      date: "03 MAY",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-22%20111756-znCnjQDY7Ujt9PwqRTYIsUA8H3cADq.png",
      title: "A Day In The Life Of A Volunteer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
    {
      category: "CHARITY",
      date: "03 MAY",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-22%20111756-znCnjQDY7Ujt9PwqRTYIsUA8H3cADq.png",
      title: "How Volunteering Can Transform Your Life",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
    {
      category: "CHARITY",
      date: "03 MAY",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-22%20111756-znCnjQDY7Ujt9PwqRTYIsUA8H3cADq.png",
      title: "Building Stronger Communities",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },

    {
      category: "UNCATEGORIZED",
      date: "03 MAY",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-22%20111756-znCnjQDY7Ujt9PwqRTYIsUA8H3cADq.png",
      title: "How Small Acts Of Kindness Make A Big Impact",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
  ]

  const donationCards = [
    {
      title: "EDUCATE RURAL KENYA",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-22%20112553-qQGDtB9xma4eIvZohTwyZihAOk9usu.png",
      date: "20 Jan 2024",
      category: "Education",
      raised: 45000,
      goal: 80000,
    },
    {
      title: "HOMES FOR HOMELESS",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-22%20112553-qQGDtB9xma4eIvZohTwyZihAOk9usu.png",
      date: "20 Jan 2024",
      category: "Shelter",
      raised: 35000,
      goal: 60000,
    },
    {
      title: "GIVE SHELTER HOMES",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-22%20112553-qQGDtB9xma4eIvZohTwyZihAOk9usu.png",
      date: "20 Jan 2024",
      category: "Shelter",
      raised: 55000,
      goal: 90000,
    },
    {
      title: "NURTURE LOW RESOURCE",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-22%20112553-qQGDtB9xma4eIvZohTwyZihAOk9usu.png",
      date: "20 Jan 2024",
      category: "Resources",
      raised: 25000,
      goal: 50000,
    },
    {
      title: "EPIC WILDLIFE FUND",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-22%20112553-qQGDtB9xma4eIvZohTwyZihAOk9usu.png",
      date: "20 Jan 2024",
      category: "Wildlife",
      raised: 65000,
      goal: 100000,
    },
    {
      title: "HEALTHCARE SUPPORT",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-22%20112553-qQGDtB9xma4eIvZohTwyZihAOk9usu.png",
      date: "20 Jan 2024",
      category: "Healthcare",
      raised: 40000,
      goal: 75000,
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Riddhi K Shah",
      username: "@Riddhi K Shah",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20111828-cCskWoMxTfj1m1cqU4T9kaLQJYrpsg.png",
      text: "I've had an incredible experience with FundFlow as a first-time fund-raiser. They have been patient, competent and efficient. And that led me to leave them a tip-amount that someone else would have had to set up a small fundraiser. I believe in this move and I think it's brilliant.",
    },
    {
      id: 2,
      name: "Priya Mehta",
      username: "@PriyaMehta",
      image: "/placeholder.svg",
      text: "FundFlow made it incredibly easy to raise funds for my mother's medical treatment. Their support team was available 24/7 and helped me optimize my campaign. Forever grateful for this platform!",
    },
    {
      id: 3,
      name: "Rahul Sharma",
      username: "@RahulSharma",
      image: "/placeholder.svg",
      text: "What sets FundFlow apart is their transparency and efficiency. The platform is user-friendly, and the zero-fee policy means more funds reach those in need. Highly recommend for any fundraising needs.",
    },
    {
      id: 4,
      name: "Anita Desai",
      username: "@AnitaDesai",
      image: "/placeholder.svg",
      text: "Started a campaign for my NGO on FundFlow, and the response was overwhelming. The social sharing features helped us reach a wider audience, and we exceeded our fundraising goal within weeks!",
    },
  ]

  const handleTestimonialNavigation = (direction) => {
    if (direction === "next") {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    } else {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  return (
    <>
      {showDialog && (
        <div className="dialog-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <div className="dialog-box" style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            textAlign: 'center',
            minWidth: '300px'
          }}>
            <p>Are you sure you want to log out?</p>
            <button onClick={confirmLogout} style={{
              margin: '10px',
              padding: '8px 16px',
              background: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>Yes</button>
            <button onClick={() => setShowDialog(false)} style={{
              margin: '10px',
              padding: '8px 16px',
              background: 'gray',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>Cancel</button>
          </div>
        </div>
      )}



      <header className="header">


        <nav className="main-nav">
          <div className="logo">
            <h1></h1>
          </div>

          <ul className="nav-links">
            <li>
              <a href="Home" >
                Home
              </a>
            </li>
            <li>
              <a href="Browser">Donate</a>
            </li>
            <li>
              <a href="News">News</a>
            </li>
            <li>
              <a href="#">How It Works</a>
            </li>
            <li>
              <a href="Contact">Contact</a>
            </li>


          </ul>

          <button className="donate-btn">DONATE NOW</button>
          {isAuthenticated ?
            <>

              <div className="profile-section" style={{ position: 'relative' }}>
                <div
                  className="profile-icon"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={i || "/placeholder.svg"} alt="User profile" />
                </div>

                {showDropdown && (
                  <div className="profile-dropdown"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      backgroundColor: 'white',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                      borderRadius: '4px',
                      padding: '8px 0',
                      minWidth: '150px',
                      zIndex: 1000
                    }}>
                    <button
                      onClick={handleProfileClick}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '8px 16px',
                        textAlign: 'left',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer'
                      }}>
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '8px 16px',
                        textAlign: 'left',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer'
                      }}>
                      Logout
                    </button>
                  </div>
                )}
              </div>




            </> : <button className="donate-btn" onClick={() => navigate("/login")}>
              SIGN IN
            </button>}
          {/* <button className="donate-btn"   href="Login">SIGN IN</button> */}

          {/* <div className="profile-section" style={{ position: 'relative' }}>
            <div className="profile-icon" onClick={handleProfileClick}>
              <img src={i || "/placeholder.svg"} alt="User profile" />
            </div>
            {showDropdown && (
              <div className="profile-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: 'white',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  borderRadius: '4px',
                  padding: '8px 0',
                  minWidth: '150px',
                  zIndex: 1000
                }}>
                <button
                  onClick={handleLogin}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 16px',
                    textAlign: 'left',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer'
                  }}>
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 16px',
                    textAlign: 'left',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer'
                  }}>
                  Registration
                </button>

              </div>
            )}
          </div>

          <button className="logout-btn" onClick={logout}>Logout</button>  */}

        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="welcome-text">WELCOME TO FundFlow</span>
          <h2>
            Lend the helping hand
            <br />
            get involved
          </h2>
          <button className="discover-btn">DISCOVER MORE</button>
        </div>
        <div className="hero-image">
          <img src={i1 || "/placeholder.svg"} alt="Happy children showing peace signs" className="hero-img" />
        </div>
      </section>
      <div className="fees-banner">
        <div className="banner-content">
          <span className="megaphone-icon">📢</span>
          Our crowdfunding platform charges NO fees
          <span className="percentage">0%</span>
        </div>
      </div>
      <section className="search-section">
        <div className="search-container">
          <h2>Thousands are fundraising online on FundFlow</h2>
          <div className="decorative-divider">
            <span className="diamond">♦</span>
            <span className="diamond large">♦</span>
            <span className="diamond">♦</span>
          </div>

        </div>
      </section>
      <div className="search-wrapper">
        <div className="search-container">

          <input
            type="text"
            className="search-input"
            placeholder="Search by fundraiser name, title, location, cause or other keywords"
          />
        </div>
      </div>




      <div className="categories-grid">
        {mainCategories.map(category => (
          <div
            key={category.id}
            ref={category.name === '18 others' ? othersCardRef : null}
            className={`category-card ${category.name === 'Medical' ? 'medical' : ''}`}
            onClick={category.name === '18 others' ? handleOthersClick : undefined}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>

      {isDropdownOpen && (
        <div className="dropdown-menu" ref={dropdownRef}>
          {dropdownCategories.map(category => (
            <div key={category.id} className="dropdown-item">
              <span className="dropdown-icon">{category.icon}</span>
              <span className="dropdown-text">{category.name}</span>
            </div>
          ))}
        </div>
      )}






      <section className="support-section">
        <div className="support-grid">
          <div className="support-item">
            <span className="heart-icon">♥</span>
            <h3>
              Every Donation Counts,
              <br />
              Every Life Matters
            </h3>
          </div>
          <div className="support-item">
            <img src={i2 || "/placeholder.svg"} alt="Children being supported" className="support-img" />
          </div>
          <div className="support-item">
            <h3>We are here to support you every step of the way.</h3>
            <p>Watch us how we take care of everyone!</p>
          </div>
        </div>
      </section>

      <section className="donations-section">
        <div className="donations-grid">
          {donationCards.map((card, index) => (
            <div key={index} className="donation-card">
              <div className="donation-image">
                <img src={card.image || "/placeholder.svg"} alt={card.title} />
                <div className="donation-overlay">
                  <button className="donate-now-btn">Donate Now</button>
                </div>
              </div>
              <div className="donation-content">
                <div className="donation-meta">
                  <span className="donation-date">{card.date}</span>
                  <span className="donation-category">{card.category}</span>
                </div>
                <h3>{card.title}</h3>
                <div className="donation-progress">
                  <div className="progress-bar" style={{ width: `${(card.raised / card.goal) * 100}%` }}></div>
                </div>
                <div className="donation-stats">
                  <span>Raised: ${card.raised.toLocaleString()}</span>
                  <span>Goal: ${card.goal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2>What people are saying about FundFlow</h2>

          <div className="testimonial-content">
            <button
              className="nav-button prev"
              onClick={() => handleTestimonialNavigation("prev")}
              aria-label="Previous testimonial"
            >
              ← Prev
            </button>

            <div className="testimonial-card">
              <div className="testimonial-image">
                <img
                  src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                />
              </div>
              <div className="testimonial-info">
                <h3>{testimonials[currentTestimonial].name}</h3>
                <div className="social-handle">
                  <i className="social-icon">f</i>
                  {testimonials[currentTestimonial].username}
                </div>
                <p>{testimonials[currentTestimonial].text}</p>
              </div>
            </div>

            <button
              className="nav-button next"
              onClick={() => handleTestimonialNavigation("next")}
              aria-label="Next testimonial"
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h2 className="footer-logo">SOCIN VOLUNTEER</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="About">About Us</a>
              </li>
              <li>
                <a href="Team">Our Team</a>
              </li>
              <li>
                <a href="#">Our Events</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Urgent Charity</h3>
            <ul>
              <li>
                <a href="#">Help Africa</a>
              </li>
              <li>
                <a href="#">Old People</a>
              </li>
              <li>
                <a href="#">Our Children</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Subscribe Our Newsletter</h3>
            <p>Get our latest updates & news right in your inbox.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Email" />
              <button type="submit">SUBSCRIBE</button>
            </form>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                f
              </a>
              <a href="#" aria-label="Twitter">
                𝕏
              </a>
              <a href="#" aria-label="Instagram">
                📷
              </a>
              <a href="#" aria-label="YouTube">
                ▶
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home

