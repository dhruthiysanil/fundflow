import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h2 className="footer-logo">FUND FLOW</h2>
          <p>Together, We Make a Difference!.</p>
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
              <a href="Contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Urgent Charity</h3>
          <ul>
            <li>
              <a href="Career">Career</a>
            </li>
            <li>
              <a href="News">News</a>
            </li>
            <li>
              <a href="Feed">Feed Back</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Donate Today, Change Tomorrow!</h3>
          <p>Raise Hope, Fund Change</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Email" />
            <button type="submit">ENQUIRY</button>
          </form>

        </div>
      </div>
    </footer>
  );
};

export { Footer };