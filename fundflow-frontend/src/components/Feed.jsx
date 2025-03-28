import React, { useState } from 'react';
import './Feed.css';
import { Header } from './Header';
import { Footer } from './Footer';
export default function Feedback() {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { type: feedbackType, text: feedbackText });
    // Here you would typically send the data to your backend
    alert('Thank you for your feedback!');
    setFeedbackText('');
    setFeedbackType('');
  };

  return (
    <>
    <Header/>
    <div className="feedback-container">
      <div className="feedback-card">
        <h2 className="feedback-title">Send us some feedback!</h2>
        <p className="feedback-description">
          Do you have a suggestion or found some bug? Let us know in the field below.
        </p>
        
        <form onSubmit={handleSubmit}>
          <textarea
            className="feedback-textarea"
            placeholder="Describe your issue or idea..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            required
          />
          
          <div className="feedback-options">
            <label className="feedback-option">
              <input
                type="radio"
                name="feedbackType"
                value="Bug"
                checked={feedbackType === 'Bug'}
                onChange={() => setFeedbackType('Bug')}
                required
              />
              <span className="radio-custom"></span>
              Bug
            </label>
            
            <label className="feedback-option">
              <input
                type="radio"
                name="feedbackType"
                value="Comment"
                checked={feedbackType === 'Comment'}
                onChange={() => setFeedbackType('Comment')}
              />
              <span className="radio-custom"></span>
              Comment
            </label>
            
            <label className="feedback-option">
              <input
                type="radio"
                name="feedbackType"
                value="Other"
                checked={feedbackType === 'Other'}
                onChange={() => setFeedbackType('Other')}
              />
              <span className="radio-custom"></span>
              Other
            </label>
          </div>
          
          <button type="submit" className="feedback-submit">
            Send Feedback
          </button>
        </form>
      </div>
     
    </div>
    <Footer/>
    </>
  );
}