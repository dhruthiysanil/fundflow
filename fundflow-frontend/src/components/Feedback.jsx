import React, { useState, useEffect } from 'react'
import API from '../utils/axiosConfig';
import defaultProfileImg from "./i.jpg"; // Default profile image

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    

    const fetchFeedback = async () => {
      try {
        const response = await API.get("/api/feedback");
        // console.log(response.data)
        setTestimonials(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();

  }, [])

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials])

  if (testimonials.length === 0) return <p>Loading testimonials...</p>

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2>What people are saying about FundFlow</h2>

        <div className="testimonial-content">
          <button
            className="nav-button prev"
            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
          >
            ← Prev
          </button>

          <div className="testimonial-card">
            <div className="testimonial-image">
              <img

// const profileImageUrl = user?.profile_pic ? `http://localhost:5000${user.profile_pic}` : defaultProfileImg;

                src={testimonials[currentTestimonial].profile_pic ? `http://localhost:5000${testimonials[currentTestimonial].profile_pic}` : defaultProfileImg}
                // src={testimonials[currentTestimonial]}
                alt={testimonials[currentTestimonial].name}
              />
            </div>
            <div className="testimonial-info">
              <h3>{testimonials[currentTestimonial].name} {testimonials[currentTestimonial].last_name}</h3>
              
              <p>{testimonials[currentTestimonial].text}</p>
            </div>
          </div>

          <button
            className="nav-button next"
            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
            aria-label="Next testimonial"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
